import { useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin/image-upload";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImage } from "../../store/common";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState();
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeature() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(getFeatureImage());
        setImageFile(null);
      }
    });
  }

  console.log(featureImageList);

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCostomStyling={true}
        // currentEditedId={currentEditedId !== null}
      />

      <Button
        disabled={!imageFile}
        onClick={handleUploadFeature}
        className="mt-5 w-full"
      >
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureItem) => <div className="relative">
                <img 
                src={featureItem?.image} alt="Features"
                className="w-full h-[300px] object-cover rounded-t-lg"
                />
            </div>)
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
