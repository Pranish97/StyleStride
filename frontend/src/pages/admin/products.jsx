import { Fragment, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "../../components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProduct } from "../../store/admin/products-slice";
import {toast} from "react-toastify"

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductSheet, setOpenCreateProductSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState();
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const {productList} = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()

  function onSubmit(e) {
    e.preventDefault()

    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAllProduct())
        setImageFile(null)
        setOpenCreateProductSheet(false)
        setFormData(initialFormData)
        toast.success(data?.payload?.message)
      }
    })
  }



  useEffect(() => {
    dispatch(fetchAllProduct())
  },[dispatch])

  console.log(productList)
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => setOpenCreateProductSheet(true)}
        >
          <Plus /> Add New Product
        </Button>
      </div>

      <div className="gird gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductSheet}
        onOpenChange={() => setOpenCreateProductSheet(false)}
      >
        <SheetContent side="right" className="overflow-auto px-6">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState = {imageLoadingState}
          />

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
