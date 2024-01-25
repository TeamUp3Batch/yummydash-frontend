import SignUp from "./UserApp/pages/SignUp/SignUp";
import Landing from "./UserApp/pages/LandingPage/LandingPage";
import Main from "./UserApp/pages/Main/Main";
import Profile from "./UserApp/pages/Profile/Profile";
import MenuPage from "./UserApp/pages/MenuPage/MenuPage";
import PlaceOrder from "./UserApp/pages/PlaceOrder/PlaceOrder";
import DeliveryPage from "./UserApp/pages/DeliveryPage/DeliveryPage";
import RestaurantDashboard from "./RestaurantApp/pages/RestaurantDashboard";
import DriverDashboard from "./DriverApp/pages/DriverDashboard";
import { Routes, Route } from "react-router-dom";
import RestaurantSignUp from "./RestaurantApp/pages/RestaurantSignUp/RestaurantSignUp";
import DriverSignUp from "./DriverApp/pages/DriverSignUp/DriverSignUp";
import AdminDashboard from "./AdminApp/pages/AdminDashboard";
import OrderHistory from "./UserApp/pages/OrderHistory/OrderHistory";
import AdminLogin from "./AdminApp/pages/AdminLogin/AdminLogin";
import NeedHelpPage from "./UserApp/pages/NeedHelpPage/NeedHelpPage";
import { useSelector } from "react-redux";




function App() {
  const { isLoggedIn } = useSelector((state) => state.admin);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/restaurantDashboard" element={< RestaurantDashboard/>} />
      <Route path="/restaurantSignup" element={< RestaurantSignUp/>} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/needHelp" element={<NeedHelpPage/>}/>
      <Route path="/menu/:restaurantId" element={<MenuPage />} />
      <Route path="/order" element={<PlaceOrder />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/driverDashBoard" element={<DriverDashboard/>}/>
      <Route path="/driverSignup" element={<DriverSignUp/>}/>
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      {isLoggedIn ? (
        <Route path="/admin" element={<AdminDashboard />} />
      ) : (
       <Route path="/adminLogin" element={<AdminLogin/>}/>
      )}
      <Route path="/viewHistory" element={<OrderHistory />} />
    </Routes>
  );
}


export default App;
