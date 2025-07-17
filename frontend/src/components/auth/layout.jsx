import {Outlet} from "react-router-dom"
import backgroundImg from "../../assets/background.png"


function AuthLayout() {
    return(
        <div className="flex min-h-screen w-full">
            <div className="hidden h-full lg:flex items-center justify-center bg-black w-1/2 ">
            <div className="w-full h-screen  text-center text-primary-foreground">
                <img src={backgroundImg} alt="Background"/> 
            </div>
            </div>

            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-4 lg:px-8">
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout