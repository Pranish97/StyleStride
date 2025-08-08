import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDelete,
  handleEdit,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={() => setCurrentSelectedAddress(addressInfo)}
      className={` ${
        selectedId?._id === addressInfo._id ? "border-black bg-blue-500" : ""
      } cursor-pointer `}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>Pincode: {addressInfo.pincode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
      </CardContent>
      <CardFooter className="p-0 flex gap-3 mx-auto">
        <Button onClick={() => handleEdit(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDelete(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
