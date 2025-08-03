import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  console.log(orderDetails)
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payement Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-2 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems.map((cartItem) => (
                <li className="flex items-center justify-between">
                  <span>Title: {cartItem?.title}</span>
                  <spa>Quantity: {cartItem?.quantity}</spa>
                  <span>Price: ${cartItem?.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.name}</span>
              <span>{orderDetails?.addressInfo.address}</span>
              <span>{orderDetails?.addressInfo.city}</span>
              <span>{orderDetails?.addressInfo.pincode}</span>
              <span>{orderDetails?.addressInfo.phone}</span>
              <span>{orderDetails?.addressInfo.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
