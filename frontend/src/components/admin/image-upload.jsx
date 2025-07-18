import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {

    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(){
    setImageFile(null)
    if(inputRef.current){
        inputRef.current.value = ""
    }
  }

  async function uploadImageToCloudinary(){
    const data = new FormData();
    data.append('my_file', imageFile)
    const response = await Axis3DIcon.post('http://localhost:5000/api/admin/products/upload-image',data)

    if(response)setUploadedImageUrl(response.data)
  } 

  useEffect(() => {
    if(imageFile !== null) uploadImageToCloudinary()
  },[imageFile])

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block mt-4">
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          onChange={handleImageFileChange}
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button variant="ghost" size="icon" onClick={handleRemoveImage} className="text-muted-foreground cursor-pointer hover:text-foreground">
                <XIcon className="w-4 h-4"/>
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
