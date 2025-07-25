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
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "../../store/admin/products-slice";
import { toast } from "react-toastify";
import AdminProductTile from "../../components/admin/product-tile";


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
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentedEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setOpenCreateProductSheet(false);
            setFormData(initialFormData);
            toast.success(data?.payload?.message);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setImageFile(null);
            setOpenCreateProductSheet(false);
            setFormData(initialFormData);
            toast.success(data?.payload?.message);
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
        dispatch(fetchAllProduct())
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  console.log(productList, "productList");
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

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.map((product, index) => (
          <AdminProductTile
            setFormData={setFormData}
            setOpenCreateProductSheet={setOpenCreateProductSheet}
            setCurrentedEditedId={setCurrentedEditedId}
            key={index}
            product={product}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <Sheet
        open={openCreateProductSheet}
        onOpenChange={() => {
          setOpenCreateProductSheet(false);
          setCurrentedEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-6">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            currentEditedId={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isButtonDisable={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
