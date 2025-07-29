import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/shop/cart-slice";
import { toast } from "react-toastify";
import { setProductDetails } from "../../store/shop/products-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log(data)
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
      }
    });
  }

  function handleDialogClose(){
    setOpen(false)
    dispatch(setProductDetails())
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 max-w-[90vw] sm:max-w-[90vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold mb-4">
              {productDetails?.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                <StarIcon className="w-4 h-4 fill-amber-500 stroke-amber-500 " />
                <StarIcon className="w-4 h-4  fill-amber-500 stroke-amber-500" />
                <StarIcon className="w-4 h-4  fill-amber-500 stroke-amber-500" />
                <StarIcon className="w-4 h-4  fill-amber-500 stroke-amber-500" />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="flex justify-between mb-2 mt-3">
              <p className="capitalize text-base lg:text-xl font-bold text-foreground">
                {productDetails?.category}
              </p>
              <p className="capitalize text-base lg:text-xl font-bold text-muted-foreground">
                {productDetails?.brand}
              </p>
            </div>
            <p className="text-muted-foreground lg:text-xl line-clamp-3 text-base mb-5">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-lg font-bold text-primary lg:text-3xl`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-lg font-bold text-muted-foreground lg:text-3xl">
                ${productDetails?.price}
              </p>
            ) : null}
          </div>

          <div className="mt-5 mb-5">
            <Button
              className="w-full cursor-pointer"
              onClick={() => handleAddToCart(productDetails._id)}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="bg-black w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Pranish Shrestha</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4  fill-primary" />
                    <StarIcon className="w-4 h-4  fill-primary" />
                    <StarIcon className="w-4 h-4  fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    The best comfortable shoes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="bg-black w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Pranish Shrestha</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4  fill-primary" />
                    <StarIcon className="w-4 h-4  fill-primary" />
                    <StarIcon className="w-4 h-4  fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    The best comfortable shoes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a Review..." />
              <Button className="cursor-pointer">Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
