import { useState, useEffect } from "react";
import { 
  User, 
  Package, 
  CreditCard, 
  Settings, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  ArrowRight,
  Calendar,
  Phone,
  Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

interface BalanceTransaction {
  id: string;
  type: 'add' | 'deduct';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    total: 89.97,
    status: "delivered",
    items: [
      { name: "Premium Cotton T-Shirt", image: "https://picsum.photos/100/100?random=50", quantity: 2, price: 29.99 },
      { name: "Classic Polo Shirt", image: "https://picsum.photos/100/100?random=51", quantity: 1, price: 29.99 }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    total: 159.99,
    status: "shipped",
    items: [
      { name: "Designer Denim Jacket", image: "https://picsum.photos/100/100?random=52", quantity: 1, price: 159.99 }
    ]
  },
  {
    id: "ORD-003",
    date: "2024-01-22",
    total: 45.98,
    status: "processing",
    items: [
      { name: "Summer Tank Top", image: "https://picsum.photos/100/100?random=53", quantity: 2, price: 22.99 }
    ]
  }
];

const mockTransactions: BalanceTransaction[] = [
  { id: "TXN-001", type: "add", amount: 500.00, description: "Balance Added via Bank Transfer", date: "2024-01-10", status: "completed" },
  { id: "TXN-002", type: "deduct", amount: 89.97, description: "Order #ORD-001", date: "2024-01-15", status: "completed" },
  { id: "TXN-003", type: "add", amount: 1000.00, description: "Balance Added via Credit Card", date: "2024-01-18", status: "completed" },
  { id: "TXN-004", type: "deduct", amount: 159.99, description: "Order #ORD-002", date: "2024-01-20", status: "completed" },
  { id: "TXN-005", type: "add", amount: 250.00, description: "Balance Added via PayPal", date: "2024-01-25", status: "pending" }
];

const UserDashboard = () => {
  const { toast } = useToast();
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://picsum.photos/150/150?random=100"
  });
  const [balance] = useState(1250.00);
  const [orders] = useState(mockOrders);
  const [transactions] = useState(mockTransactions);
  const [showAddBalanceDialog, setShowAddBalanceDialog] = useState(false);
  const [addBalanceForm, setAddBalanceForm] = useState({
    amount: "",
    transactionId: "",
    phoneNumber: "",
    transferTime: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'shipped':
      case 'processing':
        return 'bg-primary text-primary-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleAddBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!addBalanceForm.amount || !addBalanceForm.transactionId || !addBalanceForm.phoneNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Balance request submitted",
      description: "Your balance addition request has been submitted for verification. You'll be notified once approved."
    });

    setShowAddBalanceDialog(false);
    setAddBalanceForm({ amount: "", transactionId: "", phoneNumber: "", transferTime: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userBalance={balance} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your orders, balance, and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
                <div className="bg-gradient-primary text-white p-4 rounded-lg mb-4">
                  <p className="text-sm opacity-90">Current Balance</p>
                  <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
                </div>
                <Button 
                  className="w-full btn-gradient"
                  onClick={() => setShowAddBalanceDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Balance
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">My Orders</TabsTrigger>
                <TabsTrigger value="balance">Balance History</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      Track your recent orders and view order details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                        <Button asChild>
                          <a href="/products">
                            Start Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order.id} className="border">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="font-semibold">Order {order.id}</h4>
                                  <p className="text-sm text-muted-foreground">{order.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                                  <Badge className={getStatusColor(order.status)}>
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1 capitalize">{order.status}</span>
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Quantity: {item.quantity} × ${item.price}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                {order.status === 'delivered' && (
                                  <Button variant="outline" size="sm">
                                    Reorder
                                  </Button>
                                )}
                                {(order.status === 'pending' || order.status === 'processing') && (
                                  <Button variant="destructive" size="sm">
                                    Cancel Order
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Balance Tab */}
              <TabsContent value="balance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Balance History</CardTitle>
                    <CardDescription>
                      View your balance transactions and add funds to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'add' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                            }`}>
                              {transaction.type === 'add' ? <Plus className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.type === 'add' ? 'text-success' : 'text-destructive'
                            }`}>
                              {transaction.type === 'add' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </p>
                            <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.name} />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue={user.phone} />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea 
                            id="address" 
                            placeholder="Enter your shipping address"
                            className="min-h-[100px]"
                          />
                        </div>
                        <Button type="submit" className="btn-gradient">
                          Save Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password & Security</CardTitle>
                      <CardDescription>
                        Manage your password and security settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          Two-Factor Authentication
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          Login Activity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add Balance Dialog */}
      <Dialog open={showAddBalanceDialog} onOpenChange={setShowAddBalanceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Balance to Your Account</DialogTitle>
            <DialogDescription>
              Add funds to your account balance for faster checkout. Please provide transaction details for verification.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddBalance} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="1"
                placeholder="Enter amount"
                value={addBalanceForm.amount}
                onChange={(e) => setAddBalanceForm(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="transactionId"
                  placeholder="Enter transaction ID"
                  value={addBalanceForm.transactionId}
                  onChange={(e) => setAddBalanceForm(prev => ({ ...prev, transactionId: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={addBalanceForm.phoneNumber}
                  onChange={(e) => setAddBalanceForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="transferTime">Transfer Time (Optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="transferTime"
                  type="datetime-local"
                  value={addBalanceForm.transferTime}
                  onChange={(e) => setAddBalanceForm(prev => ({ ...prev, transferTime: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Payment Instructions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Transfer funds to our bank account</li>
                <li>• Include the transaction ID from your bank</li>
                <li>• Verification typically takes 1-2 business days</li>
                <li>• You'll be notified once the balance is added</li>
              </ul>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddBalanceDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-gradient">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;