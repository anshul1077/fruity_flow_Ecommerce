
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, ArrowLeft, ArrowRight, CreditCard, Truck, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CheckoutSteps = {
  SHIPPING: 0,
  PAYMENT: 1,
  REVIEW: 2,
  CONFIRMATION: 3
};

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(CheckoutSteps.SHIPPING);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: user?.name || '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit-card'
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate total with tax and shipping
  const TAX_RATE = 0.07;
  const SHIPPING_COST = subtotal > 50 ? 0 : 5.99;
  const taxAmount = subtotal * TAX_RATE;
  const totalAmount = subtotal + taxAmount + SHIPPING_COST;
  
  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with checkout",
        variant: "destructive"
      });
      navigate('/login?redirect=checkout');
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some products before checkout.",
      });
      navigate('/shop');
    }
  }, [isAuthenticated, items.length, navigate, toast]);
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutSteps.PAYMENT);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutSteps.REVIEW);
    window.scrollTo(0, 0);
  };
  
  const handleOrderSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock order creation
    const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
    
    setIsProcessing(false);
    setCurrentStep(CheckoutSteps.CONFIRMATION);
    clearCart();
    window.scrollTo(0, 0);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, formState: any, setFormState: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 animate-fade-in">
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Checkout Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {['Shipping', 'Payment', 'Review', 'Confirmation'].map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index < currentStep 
                        ? 'bg-fruity-green text-white scale-110' 
                        : index === currentStep 
                          ? 'bg-fruity-lightGreen text-white animate-pulse' 
                          : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span 
                    className={`mt-2 text-sm ${
                      index <= currentStep ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
              <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-fruity-green transition-all duration-500" 
                style={{ width: `${(currentStep / (Object.keys(CheckoutSteps).length / 2 - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Checkout Forms */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Step 1: Shipping Information */}
            {currentStep === CheckoutSteps.SHIPPING && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Truck className="mr-2 h-6 w-6 text-fruity-green" />
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="col-span-full">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={(e) => handleInputChange(e, shippingInfo, setShippingInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/shop')}
                      className="btn-bounce"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                    <Button type="submit" className="btn-bounce bg-gradient-to-r from-fruity-green to-fruity-lightGreen">
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 2: Payment Information */}
            {currentStep === CheckoutSteps.PAYMENT && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <CreditCard className="mr-2 h-6 w-6 text-fruity-green" />
                  Payment Information
                </h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-6">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <RadioGroup 
                      id="paymentMethod" 
                      value={paymentInfo.paymentMethod} 
                      onValueChange={(value) => setPaymentInfo({...paymentInfo, paymentMethod: value})}
                      className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2"
                    >
                      <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-fruity-green cursor-pointer">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="cursor-pointer">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-fruity-green cursor-pointer">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-fruity-green cursor-pointer">
                        <RadioGroupItem value="apple-pay" id="apple-pay" />
                        <Label htmlFor="apple-pay" className="cursor-pointer">Apple Pay</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-full">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange(e, paymentInfo, setPaymentInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="col-span-full">
                      <Label htmlFor="cardHolder">Cardholder Name</Label>
                      <Input
                        id="cardHolder"
                        name="cardHolder"
                        value={paymentInfo.cardHolder}
                        onChange={(e) => handleInputChange(e, paymentInfo, setPaymentInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handleInputChange(e, paymentInfo, setPaymentInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">Security Code (CVV)</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handleInputChange(e, paymentInfo, setPaymentInfo)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                    <Textarea
                      id="orderNotes"
                      placeholder="Special instructions for delivery"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(CheckoutSteps.SHIPPING)}
                      className="btn-bounce"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shipping
                    </Button>
                    <Button type="submit" className="btn-bounce bg-gradient-to-r from-fruity-green to-fruity-lightGreen">
                      Review Order
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 3: Review Order */}
            {currentStep === CheckoutSteps.REVIEW && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Package className="mr-2 h-6 w-6 text-fruity-green" />
                  Review Your Order
                </h2>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p>{shippingInfo.fullName}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
                  <p>{shippingInfo.country}</p>
                  <p>{shippingInfo.phone}</p>
                </div>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center">
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="capitalize">{paymentInfo.paymentMethod.replace('-', ' ')}</p>
                  {paymentInfo.paymentMethod === 'credit-card' && (
                    <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between py-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Shipping</span>
                    <span>{SHIPPING_COST === 0 ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-4 text-lg font-bold border-t mt-2">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(CheckoutSteps.PAYMENT)}
                    className="btn-bounce"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Payment
                  </Button>
                  <Button 
                    onClick={handleOrderSubmit}
                    disabled={isProcessing}
                    className="btn-bounce bg-gradient-to-r from-fruity-green to-fruity-lightGreen"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-pulse">Processing...</span>
                      </>
                    ) : (
                      <>
                        Place Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === CheckoutSteps.CONFIRMATION && (
              <div className="text-center py-10 animate-fade-in">
                <div className="h-20 w-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10 text-fruity-green animate-scale" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Your order has been placed successfully. We'll send you a confirmation email with the order details.
                </p>
                <Button 
                  onClick={() => navigate('/shop')}
                  className="btn-bounce bg-gradient-to-r from-fruity-green to-fruity-lightGreen"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
          
          {/* Order Summary (shown in the first 3 steps) */}
          {currentStep < CheckoutSteps.CONFIRMATION && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{SHIPPING_COST === 0 ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
