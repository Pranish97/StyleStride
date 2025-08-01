import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../store/shop/address-slice";
import { toast } from "react-toastify";
import AddressCard from "./addressCard";

const initialData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddres);

  function handleManageAddress(e) {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast.success(data?.payload?.message);
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialData);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast.success(data?.payload?.message);
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialData);
          }
        });
  }

  function handleDelete(getCurrentAddress) {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getCurrentAddress?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast.success(data?.payload?.message);
      }
    });
  }

  function handleEdit(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    console.log(getCurrentAddress)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                addressInfo={address}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId === null ? "Add New Address" : "Edit Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formData={formData}
          formControls={addressFormControls}
          setFormData={setFormData}
          buttonText={currentEditedId === null ? "Add" : "Update"}
          onSubmit={handleManageAddress}
          isButtonDisable={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
