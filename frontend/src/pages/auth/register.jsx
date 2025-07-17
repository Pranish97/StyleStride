import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { toast } from "react-toastify";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload.success) {
        navigate("/auth/login");
        toast.success(data.payload.message);
      } else if (data?.payload?.error) {
        toast.error(data?.payload.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Register"}
      />

      <div className="text-center">
        <p className="mt-2">
          Already have an Account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
