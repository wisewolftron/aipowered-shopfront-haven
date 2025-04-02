
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Account = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleSave = () => {
    toast({
      title: "Changes saved successfully",
      description: "Your profile information has been updated.",
    });
  };
  
  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Account</h1>
      <p className="text-muted-foreground mb-8">
        Manage your profile, orders and preferences
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation on Large Screens */}
        <div className="hidden lg:block">
          <div className="space-y-1">
            <Button 
              variant={activeTab === "profile" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </Button>
            <Button 
              variant={activeTab === "orders" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </Button>
            <Button 
              variant={activeTab === "addresses" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </Button>
            <Button 
              variant={activeTab === "payment" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("payment")}
            >
              Payment Methods
            </Button>
            <Button 
              variant={activeTab === "preferences" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        
        {/* Mobile Tabs */}
        <div className="lg:hidden w-full">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and manage your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                  <Button asChild>
                    <a href="/products">Start Shopping</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <Card>
              <CardHeader>
                <CardTitle>My Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't added any addresses yet.</p>
                  <Button>Add New Address</Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't added any payment methods yet.</p>
                  <Button>Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive emails about your orders and account activity</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">On</Button>
                      <Button variant="ghost" size="sm">Off</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-muted-foreground">Receive emails about promotions, sales, and new products</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">On</Button>
                      <Button variant="outline" size="sm">Off</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
