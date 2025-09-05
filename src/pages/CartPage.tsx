import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "قميص قطني فاخر",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://picsum.photos/600/600?random=10",
    color: "أسود",
    size: "M",
    quantity: 2
  },
  {
    id: "2", 
    name: "جاكيت دنيم مصمم",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://picsum.photos/600/600?random=11",
    color: "أزرق",
    size: "L",
    quantity: 1
  },
  {
    id: "3",
    name: "وشاح حريري فاخر",
    price: 45.99,
    image: "https://picsum.photos/600/600?random=12",
    color: "أحمر",
    size: "واحد",
    quantity: 1
  }
];

const CartPage = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [userBalance] = useState(1250.00);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "تم حذف المنتج",
      description: "تم حذف المنتج من عربة التسوق بنجاح"
    });
  };

  const handlePurchase = (item: CartItem) => {
    setSelectedItem(item);
    setShowPurchaseDialog(true);
  };

  const confirmPurchase = () => {
    if (!selectedItem) return;

    const totalPrice = selectedItem.price * selectedItem.quantity;
    const amountToPay = paymentType === 'full' ? totalPrice : totalPrice * 0.5;

    if (amountToPay > userBalance) {
      toast({
        title: "الرصيد غير كافي",
        description: "يرجى إضافة المزيد من الأموال إلى حسابك أو اختيار الدفع الجزئي.",
        variant: "destructive"
      });
      return;
    }

    // Simulate purchase
    toast({
      title: "تم الشراء بنجاح!",
      description: `تم شراء ${selectedItem.name} بنجاح. المبلغ المخصوم: ${amountToPay.toFixed(2)} جنيه`
    });

    // Remove purchased item from cart
    removeItem(selectedItem.id);
    setShowPurchaseDialog(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">عربة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-8">
            لا توجد منتجات في عربة التسوق الخاصة بك حالياً
          </p>
          <Button asChild className="btn-gradient">
            <Link to="/products">
              تصفح المنتجات
              <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">عربة التسوق</h1>
          <p className="text-muted-foreground">
            {totalItems} منتجات - إجمالي القيمة: {totalValue.toFixed(2)} جنيه
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            اللون: {item.color} • المقاس: {item.size}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">
                              {item.price.toFixed(2)} جنيه
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {item.originalPrice.toFixed(2)} جنيه
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          onClick={() => handlePurchase(item)}
                          className="btn-gradient"
                          size="sm"
                        >
                          تأكيد الشراء
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>عدد المنتجات:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{totalValue.toFixed(2)} جنيه</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن:</span>
                  <span className="text-success">مجاني</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي:</span>
                    <span className="text-primary">{totalValue.toFixed(2)} جنيه</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    يجب شراء كل منتج بشكل منفصل باستخدام زر "تأكيد الشراء"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Purchase Confirmation Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>تأكيد الشراء</DialogTitle>
              <DialogDescription>
                اختر طريقة الدفع لمنتج: {selectedItem?.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedItem && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{selectedItem.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      الكمية: {selectedItem.quantity} • السعر: {selectedItem.price.toFixed(2)} جنيه
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="radio"
                      id="full"
                      name="payment"
                      value="full"
                      checked={paymentType === 'full'}
                      onChange={() => setPaymentType('full')}
                      className="w-4 h-4"
                    />
                    <label htmlFor="full" className="text-sm font-medium cursor-pointer">
                      دفع المبلغ كاملاً ({(selectedItem.price * selectedItem.quantity).toFixed(2)} جنيه)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="radio"
                      id="partial"
                      name="payment"
                      value="partial"
                      checked={paymentType === 'partial'}
                      onChange={() => setPaymentType('partial')}
                      className="w-4 h-4"
                    />
                    <label htmlFor="partial" className="text-sm font-medium cursor-pointer">
                      دفع 50% من المبلغ ({((selectedItem.price * selectedItem.quantity) * 0.5).toFixed(2)} جنيه)
                    </label>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded">
                  <p className="text-sm text-muted-foreground">
                    رصيدك الحالي: <span className="font-semibold text-primary">{userBalance.toFixed(2)} جنيه</span>
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={confirmPurchase} className="btn-gradient">
                تأكيد الشراء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CartPage;