import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { createCustomer, authenticateCustomer, convertToLocalUser } from "@/lib/shopifyCustomer";
import { migrateUserData } from "@/lib/userData";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, isSignup: boolean) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      let user;

      if (isSignup) {
        // Validate name input
        if (!name || name.trim().length === 0) {
          throw new Error('Please enter your full name');
        }

        // Create new customer in Shopify using Storefront API
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ').trim() || 'Customer';

        const result = await createCustomer({
          input: {
            firstName,
            lastName,
            email,
            password,
            acceptsMarketing: true,
          }
        });

        user = convertToLocalUser(result.customer);
        
        toast({
          title: "Account created!",
          description: "Your account has been created successfully. You can now shop and track your orders.",
        });
      } else {
        // Authenticate existing customer using Storefront API
        const result = await authenticateCustomer(email, password);
        user = convertToLocalUser(result.customer);
        
        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully. Your account is synced with Shopify.",
        });
      }

      // Session is managed via httpOnly cookie by backend. Do not store tokens locally.
      
      // Migrate existing cart/wishlist data to user-specific storage
      migrateUserData(user.id);
      
      onLogin(user);
      onClose();
      
      // Navigate to profile page after successful login
      navigate('/profile');

    } catch (error) {
      console.error('Auth error:', error);
      
      // Fallback to local authentication if Shopify fails
      const user = {
        id: Date.now().toString(),
        email,
        name: isSignup ? name : email.split('@')[0],
        isShopifyCustomer: false,
      };
      // Fallback only: not persisted as authenticated session
      
      // Migrate existing cart/wishlist data to user-specific storage
      migrateUserData(user.id);
      
      onLogin(user);
      onClose();
      
      // Navigate to profile page after fallback login
      navigate('/profile');

      toast({
        title: isSignup ? "Account created locally!" : "Welcome back!",
        description: isSignup ? "Your account has been created locally. Some features may be limited." : "You've been logged in successfully.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif">Welcome to ARYK</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <Button type="button" variant="link" className="w-full text-sm">
                Forgot your password?
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your first and last name"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Please enter both your first and last name
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;