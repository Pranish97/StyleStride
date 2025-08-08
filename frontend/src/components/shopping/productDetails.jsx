import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "react-toastify";
import { setProductDetails } from "../../store/shop/products-slice";
import { useEffect } from "react";
import StarRating from "../common/star-rating";
import { useState } from "react";
import {
  addProductReview,
  getProductReview,
} from "../../store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviewData } = useSelector((state) => state.shopReview);
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems?.items || [];

    const currentItem = getCartItems.find(
      (item) => item.productId === getCurrentProductId
    );

    const currentQuantity = currentItem ? currentItem.quantity : 0;
    const newQuantity = currentQuantity + 1;

    if (newQuantity > getTotalStock) {
      toast.error("Out of Stock");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setReviewMessage("");
    setRating(0);
  }

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.name,
        reviewMessage: reviewMessage,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setReviewMessage("")
        setRating(0);
        dispatch(getProductReview(productDetails?._id));
        toast.success(data.payload?.message);
      } else {
        toast.error(data.payload?.message);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null)
      dispatch(getProductReview(productDetails?._id));
  }, [productDetails]);


   const averageReview = reviewData && reviewData.length > 0 ?
      reviewData.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviewData.length : 0;

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
                <StarRating rating={averageReview}/>
              </div>
              <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
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
              disabled={productDetails?.totalStock === 0}
              onClick={() =>
                handleAddToCart(productDetails._id, productDetails?.totalStock)
              }
            >
              {productDetails?.totalStock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviewData && reviewData.length > 0 ? (
                reviewData.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="bg-black w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="capitalize font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Review</h1>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a Review</Label>
              <div className="flex">
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                placeholder="Write a Review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMessage.trim() === ""}
                className="cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
