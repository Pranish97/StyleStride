import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import accountImg from "../../assets/account.png";
import { Tabs } from "../../components/ui/tabs";
import Address from "../../components/shopping/address";
import ShoppingOrders from "../../components/shopping/order";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-9 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="flex gap-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
                <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
