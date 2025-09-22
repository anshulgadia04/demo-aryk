import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ShopifyCustomerAPI } from '@/lib/shopifyCustomerAPI';

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  defaultAddress?: any;
  addresses?: any;
}

interface UseCustomerAuthReturn {
  customer: Customer | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export const useCustomerAuth = (): UseCustomerAuthReturn => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    
    try {
      const isAuthenticated = ShopifyCustomerAPI.isLoggedIn();
      setIsLoggedIn(isAuthenticated);
      
      if (isAuthenticated) {
        const result = await ShopifyCustomerAPI.getProfile();
        if (result.success && result.customer) {
          setCustomer(result.customer);
        } else {
          // Token might be expired, try to renew
          const renewResult = await ShopifyCustomerAPI.renewToken();
          if (renewResult.success) {
            const profileResult = await ShopifyCustomerAPI.getProfile();
            if (profileResult.success && profileResult.customer) {
              setCustomer(profileResult.customer);
            } else {
              // Still can't get profile, logout
              await logout();
            }
          } else {
            // Can't renew token, logout
            await logout();
          }
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const result = await ShopifyCustomerAPI.login(email, password);
      
      if (result.success && result.customer) {
        setCustomer(result.customer);
        setIsLoggedIn(true);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.customer.firstName || result.customer.email}!`,
        });
        
        return { success: true };
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid email or password",
          variant: "destructive",
        });
        
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during login';
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const signup = useCallback(async (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }) => {
    setLoading(true);
    
    try {
      const result = await ShopifyCustomerAPI.signup(data);
      
      if (result.success) {
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
        
        // Auto-login after successful signup
        const loginResult = await ShopifyCustomerAPI.login(data.email, data.password);
        if (loginResult.success && loginResult.customer) {
          setCustomer(loginResult.customer);
          setIsLoggedIn(true);
          
          toast({
            title: "Welcome!",
            description: "Your account has been created and you're now logged in.",
          });
        }
        
        return { success: true };
      } else {
        toast({
          title: "Signup failed",
          description: result.error || "Failed to create account",
          variant: "destructive",
        });
        
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during signup';
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      await ShopifyCustomerAPI.logout();
      setCustomer(null);
      setIsLoggedIn(false);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local state
      setCustomer(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateProfile = useCallback(async (updates: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }) => {
    if (!isLoggedIn) {
      return { success: false, error: 'Not logged in' };
    }
    
    setLoading(true);
    
    try {
      const result = await ShopifyCustomerAPI.updateProfile(updates);
      
      if (result.success && result.customer) {
        setCustomer(result.customer);
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        
        return { success: true };
      } else {
        toast({
          title: "Update failed",
          description: result.error || "Failed to update profile",
          variant: "destructive",
        });
        
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while updating profile';
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, toast]);

  const refreshProfile = useCallback(async () => {
    if (!isLoggedIn) return;
    
    try {
      const result = await ShopifyCustomerAPI.getProfile();
      if (result.success && result.customer) {
        setCustomer(result.customer);
      }
    } catch (error) {
      console.error('Profile refresh error:', error);
    }
  }, [isLoggedIn]);

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      const result = await ShopifyCustomerAPI.requestPasswordReset(email);
      
      if (result.success) {
        toast({
          title: "Password reset email sent",
          description: "Please check your email for reset instructions.",
        });
        
        return { success: true };
      } else {
        toast({
          title: "Reset failed",
          description: result.error || "Failed to send reset email",
          variant: "destructive",
        });
        
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while requesting password reset';
      toast({
        title: "Reset failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    }
  }, [toast]);

  return {
    customer,
    loading,
    isLoggedIn,
    login,
    signup,
    logout,
    updateProfile,
    refreshProfile,
    requestPasswordReset,
  };
};
