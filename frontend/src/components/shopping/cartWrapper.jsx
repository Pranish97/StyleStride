
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContent from "./cartContent";

function UserCartWrapper({ cartItems }) {
  const totalCartAmount = cartItems && cartItems.length > 0 ?
  cartItems.reduce((sum , currentItem) => sum + (
    currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
  ) * currentItem?.quantity, 0): 0
  return (
    <SheetContent className="sm:max-w-md px-4 overflow-scroll">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartContent cartItem={item} />)
          : null}
      </div>

      <div className="mt-8 px-4 w-full">
        <div className="flex justify-between w-full">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>

      <Button className="w-full mt-6 cursor-pointer">Checkout</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
