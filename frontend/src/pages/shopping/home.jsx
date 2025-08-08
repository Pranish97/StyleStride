import { Button } from "../../components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Footprints,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping/product-tile";
import ProductDetailsDialog from "../../components/shopping/productDetails";
import  nike  from "../../assets/nike.png";
import  adidas  from "../../assets/adidas.jpg";
import puma from "../../assets/puma.png";
import  levis  from "../../assets/levis.png";
import  zara  from "../../assets/zara.png";
import hm  from "../../assets/hm.jpg";
import {useNavigate} from "react-router-dom"
import { getFeatureImage } from "../../store/common";

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brand = [
  { id: "nike", label: "Nike", image: nike },
  { id: "adidas", label: "Adidas", image: adidas },
  { id: "puma", label: "Puma", image: puma },
  { id: "levis", label: "Levi's", image: levis },
  { id: "zara", label: "Zara", image: zara },
  { id: "h&m", label: "H&M", image: hm },
];

function ShoppingHome() {
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {featureImageList} = useSelector(state => state.commonFeature)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function handleProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }


  function handleNavigateToListing(getCurrentItem, section){
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, []);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  useEffect(() =>{
    dispatch(getFeatureImage())
  },[dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList.map((featureItem, index) => (
          <img
            src={featureItem?.image}
            key={index}
            className={` ${
              index === currentSlide ? "opactity-100 " : "opactiy-0"
            }absolute top-0 left-0 w-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList?.length)}
          className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((item) => (
              <Card onClick={() => handleNavigateToListing(item, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item?.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>

          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-6">
            {
              brand.map((brand) => 
              <Card onClick={() => handleNavigateToListing(brand, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={brand?.image} className="w-16 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brand?.label}</span>
                </CardContent>
              </Card>
              )
            }
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Features Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleProductDetails={() =>
                      handleProductDetails(productItem?._id)
                    }
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      

      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
