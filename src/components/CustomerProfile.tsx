import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Calendar,
  Edit3,
  Save,
  X,
  LogOut,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ShopifyCustomerAPI } from '@/lib/shopifyCustomerAPI';

interface CustomerProfileProps {
  onLogout?: () => void;
  onOrdersClick?: () => void;
  onWishlistClick?: () => void;
}

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  defaultAddress?: {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  };
  addresses?: {
    edges: Array<{
      node: {
        id: string;
        firstName: string;
        lastName: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        province: string;
        country: string;
        zip: string;
        phone?: string;
      };
    }>;
  };
}

interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  fulfillmentStatus: string;
  financialStatus: string;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          title: string;
          image: {
            url: string;
            altText: string;
          };
        };
      };
    }>;
  };
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({ 
  onLogout, 
  onOrdersClick, 
  onWishlistClick 
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Form state for editing
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    acceptsMarketing: false
  });

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load customer profile
      const profileResult = await ShopifyCustomerAPI.getProfile();
      if (profileResult.success && profileResult.customer) {
        setCustomer(profileResult.customer);
        setEditData({
          firstName: profileResult.customer.firstName || '',
          lastName: profileResult.customer.lastName || '',
          phone: profileResult.customer.phone || '',
          acceptsMarketing: profileResult.customer.acceptsMarketing || false
        });
      } else {
        setError(profileResult.error || 'Failed to load profile');
      }

      // Load customer orders
      const ordersResult = await ShopifyCustomerAPI.getOrders();
      if (ordersResult.success) {
        setOrders(ordersResult.orders);
      }
    } catch (err) {
      setError('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);

    try {
      const result = await ShopifyCustomerAPI.updateProfile(editData);
      
      if (result.success && result.customer) {
        setCustomer(result.customer);
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await ShopifyCustomerAPI.logout();
      onLogout?.();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(parseFloat(amount));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!customer) {
    return (
      <Alert>
        <AlertDescription>No customer data found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {customer.firstName && customer.lastName 
                    ? `${customer.firstName} ${customer.lastName}`
                    : customer.email
                  }
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {customer.email}
                </CardDescription>
                <Badge variant="secondary" className="mt-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  Member since {formatDate(customer.createdAt)}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={saving}>
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </>
              )}
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editData.firstName}
                      onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.firstName || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editData.lastName}
                      onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.lastName || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2 p-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                    <Badge variant="outline" className="text-xs">Primary</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Preferences</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptsMarketing"
                    checked={isEditing ? editData.acceptsMarketing : customer.acceptsMarketing}
                    onCheckedChange={(checked) => 
                      isEditing && setEditData(prev => ({ ...prev, acceptsMarketing: checked as boolean }))
                    }
                    disabled={!isEditing}
                  />
                  <Label htmlFor="acceptsMarketing">
                    I want to receive marketing emails and updates
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order History
              </CardTitle>
              <CardDescription>
                View your recent orders and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                  </p>
                  <Button onClick={onOrdersClick}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Order #{order.orderNumber}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.processedAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {order.financialStatus}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {order.fulfillmentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {order.lineItems.edges.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              {item.node.variant.image ? (
                                <img 
                                  src={item.node.variant.image.url} 
                                  alt={item.node.variant.image.altText}
                                  className="w-full h-full object-cover rounded"
                                />
                              ) : (
                                <Package className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.node.title}</p>
                              <p className="text-muted-foreground">
                                {item.node.variant.title} • Qty: {item.node.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Addresses
              </CardTitle>
              <CardDescription>
                Manage your shipping and billing addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer.defaultAddress ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Default Address</h4>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        {customer.defaultAddress.firstName} {customer.defaultAddress.lastName}
                      </p>
                      {customer.defaultAddress.company && (
                        <p>{customer.defaultAddress.company}</p>
                      )}
                      <p>{customer.defaultAddress.address1}</p>
                      {customer.defaultAddress.address2 && (
                        <p>{customer.defaultAddress.address2}</p>
                      )}
                      <p>
                        {customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}
                      </p>
                      <p>{customer.defaultAddress.country}</p>
                      {customer.defaultAddress.phone && (
                        <p className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {customer.defaultAddress.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {customer.addresses && customer.addresses.edges.length > 1 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Other Addresses</h4>
                      {customer.addresses.edges
                        .filter(edge => edge.node.id !== customer.defaultAddress?.id)
                        .map((edge) => (
                          <div key={edge.node.id} className="border rounded-lg p-4">
                            <div className="text-sm space-y-1">
                              <p>
                                {edge.node.firstName} {edge.node.lastName}
                              </p>
                              {edge.node.company && (
                                <p>{edge.node.company}</p>
                              )}
                              <p>{edge.node.address1}</p>
                              {edge.node.address2 && (
                                <p>{edge.node.address2}</p>
                              )}
                              <p>
                                {edge.node.city}, {edge.node.province} {edge.node.zip}
                              </p>
                              <p>{edge.node.country}</p>
                              {edge.node.phone && (
                                <p className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {edge.node.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
                  <p className="text-muted-foreground mb-4">
                    Add an address to make checkout faster and easier.
                  </p>
                  <Button>
                    Add Address
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
