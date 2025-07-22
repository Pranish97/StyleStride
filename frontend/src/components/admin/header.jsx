import { useDispatch } from "react-redux";
import {Button} from "../ui/button";
import { LogOut, Menu } from 'lucide-react';
import { logoutUser } from "../../store/authSlice";
import { toast } from "react-toastify";

function AdminHeader({ setOpen}) {
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logoutUser()).then(data=>{
            if(data?.payload?.success){
                toast.success(data?.payload?.message)
            }
        })
    }
    
    return(
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button onClick={() =>setOpen(true)} className="lg:hidden sm-block">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
            </Button>

            <div className="flex flex-1 justify-end">
                <Button onClick={handleLogout} className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium shadow rounded-s-sm cursor-pointer">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default AdminHeader