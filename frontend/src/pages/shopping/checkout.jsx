import { useSelector } from "react-redux";
import img from "../../assets/account.png";
import Address from "../../components/shopping/address";
import UserCartContent from "../../components/shopping/cartContent";
import { Button } from "../../components/ui/button";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmount =
    cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-center object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />

        <div className="flex flex-col gap-4 mt-16">
          {cartItems?.items?.length > 0
            ? cartItems.items.map((cartItem) => (
                <UserCartContent key={cartItem._id} cartItem={cartItem} />
              ))
            : null}

          <div className="mt-8 px-4 w-full">
            <div className="flex justify-between w-full">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button className=" w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
