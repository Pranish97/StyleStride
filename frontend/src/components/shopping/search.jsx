import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchResults,
  searchProducts,
} from "../../store/shop/search-slice";
import ShoppingProductTile from "./product-tile";
import { fetchProductDetails } from "../../store/shop/products-slice";
import ProductDetailsDialog from "./productDetails";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchData } = useSelector((state) => state.shopSearch);
  const dispatch = useDispatch();
  const {productDetails} = useSelector((state) => state.shopProducts)
  const[open, setOpen] = useState(false)
  
    function handleProductDetails(getCurrentProductId) {
      dispatch(fetchProductDetails(getCurrentProductId));
    }

  useEffect(() => {
    const trimmedKeyword = keyword?.trim();

    if (trimmedKeyword && trimmedKeyword.length > 0) {
      const delay = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
        dispatch(searchProducts(trimmedKeyword));
      }, 500);

      return () => clearTimeout(delay);
    } else {
      setSearchParams(new URLSearchParams());
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch, setSearchParams]);

  useEffect(() =>{
    if(productDetails !== null) setOpen(true)
  },[productDetails])

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Products"
          />
        </div>
      </div>

      {!searchData.length ? (
        <h1 className="text-5xl font-extrabold">No Results Found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchData.map((item) => (
          <ShoppingProductTile product={item} handleProductDetails={handleProductDetails} />
        ))}
      </div>
      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
