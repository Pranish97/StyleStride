import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account.png";
import Address from "../../components/shopping/address";
import UserCartContent from "../../components/shopping/cartContent";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { createNewOrder } from "../../store/shop/order-slice";
import { toast } from "react-toastify";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPayementStart, setIsPayementStart] = useState(false);
  const dispatch = useDispatch();

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

  function handleInitiatePaypalPayement() {
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (currentSelectedAddress === null) {
      toast.error("Please Select One Address");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((cart) => ({
        productId: cart?.productId,
        title: cart?.title,
        image: cart?.image,
        price: cart.salePrice > 0 ? cart.salePrice : cart.price,
        quantity: cart?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPayementStart(true);
      } else {
        setIsPayementStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-center object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

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
            <Button disabled={isPayementStart} onClick={handleInitiatePaypalPayement} className="w-full">
              {
                isPayementStart ? "Processing Paypal Payement..." : "Checkout With paypal"
            }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
