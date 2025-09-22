import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Package,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { CustomerAuthForms } from '@/components/CustomerAuthForms';
import { CustomerProfile } from '@/components/CustomerProfile';
import { useToast } from '@/hooks/use-toast';

const CustomerAccount: React.FC = () => {
  const { customer, loading, isLoggedIn, logout } = useCustomerAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const { toast } = useToast();

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setActiveSection('profile');
  };

  const handleLogout = async () => {
    await logout();
    setActiveSection('profile');
  };

  const handleOrdersClick = () => {
    setActiveSection('orders');
  };

  const handleWishlistClick = () => {
    setActiveSection('wishlist');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading account...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <User className="w-6 h-6" />
                Customer Account
              </CardTitle>
              <CardDescription>
                Sign in to your account or create a new one to access your profile, orders, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerAuthForms 
                onSuccess={handleAuthSuccess}
                onClose={() => setShowAuthModal(false)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {customer?.firstName && customer?.lastName 
                    ? `${customer.firstName} ${customer.lastName}`
                    : customer?.email
                  }
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{customer?.email}</span>
                  <Badge variant="secondary" className="ml-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    Member since {customer?.createdAt ? new Date(customer.createdAt).getFullYear() : 'N/A'}
                  </Badge>
                </div>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSection('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveSection('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <ShoppingBag className="w-4 h-4 inline mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveSection('wishlist')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'wishlist'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Heart className="w-4 h-4 inline mr-2" />
              Wishlist
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeSection === 'profile' && (
          <CustomerProfile 
            onLogout={handleLogout}
            onOrdersClick={handleOrdersClick}
            onWishlistClick={handleWishlistClick}
          />
        )}

        {activeSection === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order History
              </CardTitle>
              <CardDescription>
                View and track your recent orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Button>
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'wishlist' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Wishlist
              </CardTitle>
              <CardDescription>
                Your saved items and favorites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No items in wishlist</h3>
                <p className="text-muted-foreground mb-4">
                  Save items you love to your wishlist for easy access later.
                </p>
                <Button>
                  Browse Products
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerAccount;
