import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogOut, Menu, ShoppingCart, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shoppingHeaderMenuItems } from "../../config";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { logoutUser } from "../../store/authSlice";
import { toast } from "react-toastify";

function MenuItems() {
  return (
    <nav className="flex flex-col  lg:mt-0 lg:ml-0 lg:items-center gap-6 lg:flex-row ml-8 mt-9">
      {shoppingHeaderMenuItems.map((menuItems) => (
        <Link
          className="text-sm font-medium"
          key={menuItems.id}
          to={menuItems.path}
        >
          {menuItems?.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
      }
    });
  }

  return (
    <div className="flex lg:ml-0 lg:mt-0 lg:items-center lg:flex-row flex-col gap-4 ml-8 mt-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">User Cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.name ? user.name[0].toUpperCase() : "P"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex mt-2 cursor-pointer items-center gap-1"
            onClick={() => navigate("/shop/account")}
          >
            <UserRound className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex mt-2 cursor-pointer gap-1 items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 ">
          <img src={logo} alt="Logo" width={180} height={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toogle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
        
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
