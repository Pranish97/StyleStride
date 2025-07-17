import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./components/admin/layout"
import AdminDashboard from "./pages/admin/dashboard"
import AdminFeatures from "./pages/admin/features"
import AdminOrders from "./pages/admin/orders"
import AdminProducts from "./pages/admin/products"
import ShoppingLayout from "./components/shopping/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping/home"
import ShoppingListing from "./pages/shopping/listing"
import ShoppingCheckout from "./pages/shopping/checkout"
import ShoppingAccount from "./pages/shopping/account"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/authSlice"


function App() {

  const {isAuthenticated, user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])

  console.log(user)
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth user={user} isAuthenticated={isAuthenticated}>
            <AuthLayout/>
          </CheckAuth>
        }>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        </Route>

        <Route path="/admin" element={
          <CheckAuth  user={user} isAuthenticated={isAuthenticated}>
            <AdminLayout/>
          </CheckAuth>
        }>
        <Route path="dashboard" element={<AdminDashboard/>}/>
        <Route path="features" element={<AdminFeatures/>}/>
        <Route path="orders" element={<AdminOrders/>}/>
        <Route path="products" element={<AdminProducts/>}/>
        </Route>

        <Route path="/shop" element={
          <CheckAuth  user={user} isAuthenticated={isAuthenticated}>
            <ShoppingLayout />
          </CheckAuth>
        }>
        <Route path="home" element={<ShoppingHome/>} />
        <Route path="listing" element={<ShoppingListing/>}/>
        <Route path="checkout" element={<ShoppingCheckout/>} />
        <Route path="account" element={<ShoppingAccount/>} />
        </Route>
        <Route path="*" element={<NotFound/>} /> 
        <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
