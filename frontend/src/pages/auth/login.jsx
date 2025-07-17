import { useState } from "react";
import CommonForm from "../../components/common/form";
import { loginFormControls } from "../../config/loginForm";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { toast } from "react-toastify";


const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault()

    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast.success(data.payload.message);
       }
        else if(data?.payload?.error){
        toast.error(data.payload.message)
      }
      
    })
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login to StyleStride
        </h1>
      </div>

      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Login"}
      />

      <div className="text-center">
        <p className="mt-2">
          Don't have Account?
          <Link 
          to='/auth/register'
          className="font-medium ml-2 text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
