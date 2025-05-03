
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Package, CreditCard, Settings, Heart, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock order history data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2023-05-01',
    status: 'Delivered',
    total: 24.99,
    items: [
      { name: 'Fresh Apples', quantity: 2, price: 2.99 },
      { name: 'Organic Bananas', quantity: 1, price: 1.99 },
      { name: 'Fresh Broccoli', quantity: 3, price: 2.49 },
      { name: 'Juicy Oranges', quantity: 4, price: 3.29 },
    ]
  },
  {
    id: 'ORD-002',
    date: '2023-04-25',
    status: 'Delivered',
    total: 18.75,
    items: [
      { name: 'Fresh Spinach', quantity: 1, price: 3.49 },
      { name: 'Sweet Grapes', quantity: 2, price: 3.99 },
      { name: 'Bell Peppers', quantity: 3, price: 1.99 },
      { name: 'Ripe Avocados', quantity: 2, price: 2.99 },
    ]
  },
  {
    id: 'ORD-003',
    date: '2023-04-18',
    status: 'Delivered',
    total: 32.45,
    items: [
      { name: 'Fresh Blueberries', quantity: 2, price: 4.99 },
      { name: 'Ripe Strawberries', quantity: 3, price: 4.99 },
      { name: 'Fresh Carrots', quantity: 1, price: 1.79 },
      { name: 'Juicy Oranges', quantity: 2, price: 3.29 },
    ]
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">Please log in to view your dashboard</p>
          <Button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-fruity-green to-fruity-lightGreen"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6 animate-fade-in">
                {/* User Profile */}
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4 animate-scale">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                
                {/* Navigation */}
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'profile' ? 'bg-fruity-green text-white hover:bg-fruity-lightGreen hover:text-white' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-5 w-5" />
                    My Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'orders' ? 'bg-fruity-green text-white hover:bg-fruity-lightGreen hover:text-white' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="mr-2 h-5 w-5" />
                    My Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'payment' ? 'bg-fruity-green text-white hover:bg-fruity-lightGreen hover:text-white' : ''}`}
                    onClick={() => setActiveTab('payment')}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Methods
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'wishlist' ? 'bg-fruity-green text-white hover:bg-fruity-lightGreen hover:text-white' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    My Wishlist
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === 'settings' ? 'bg-fruity-green text-white hover:bg-fruity-lightGreen hover:text-white' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Account Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-1 animate-fade-in">
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          defaultValue={user.name}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          defaultValue={user.email}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        rows={3}
                        placeholder="Enter your delivery address"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button className="bg-fruity-green hover:bg-fruity-lightGreen btn-bounce">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'orders' && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div 
                          key={order.id}
                          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 animate-fade-in"
                        >
                          <div className="flex flex-wrap justify-between mb-4">
                            <div className="mb-2 md:mb-0">
                              <h4 className="font-semibold">{order.id}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(order.date).toLocaleDateString(undefined, { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 mb-1">
                                {order.status}
                              </span>
                              <p className="font-semibold">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                            <h5 className="font-medium mb-2">Order Items</h5>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span>
                                    {item.quantity} × {item.name}
                                  </span>
                                  <span className="text-gray-600 dark:text-gray-400">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="mr-2"
                            >
                              View Details
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-fruity-green hover:bg-fruity-lightGreen"
                            >
                              Reorder
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'payment' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-14 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold mr-4">
                          VISA
                        </div>
                        <div>
                          <h4 className="font-medium">Visa ending in 4242</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mr-2">
                          Default
                        </span>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Remove
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-14 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold mr-4">
                          MC
                        </div>
                        <div>
                          <h4 className="font-medium">MasterCard ending in 5555</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Expires 08/24</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          Remove
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full border-dashed bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                      + Add new payment method
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'wishlist' && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-10">
                      <Heart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" strokeWidth={1} />
                      <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Browse our products and add your favorites to your wishlist
                      </p>
                      <Link to="/shop">
                        <Button className="bg-fruity-green hover:bg-fruity-lightGreen btn-bounce">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'settings' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-orders"
                            defaultChecked
                            className="h-4 w-4 mr-2 text-fruity-green focus:ring-fruity-green"
                          />
                          <label htmlFor="notify-orders">Order updates</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-promos"
                            defaultChecked
                            className="h-4 w-4 mr-2 text-fruity-green focus:ring-fruity-green"
                          />
                          <label htmlFor="notify-promos">Promotions and discounts</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-newsletter"
                            defaultChecked
                            className="h-4 w-4 mr-2 text-fruity-green focus:ring-fruity-green"
                          />
                          <label htmlFor="notify-newsletter">Weekly newsletter</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium mb-3">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1">Current Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <Button className="bg-fruity-green hover:bg-fruity-lightGreen btn-bounce">
                          Update Password
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium text-red-600 dark:text-red-500 mb-3">Danger Zone</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
