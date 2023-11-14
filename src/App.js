import SignUp from "./UserApp/pages/SignUp/SignUp";
import Landing from "./UserApp/pages/LandingPage/LandingPage";
import Main from "./UserApp/pages/Main/Main";
import Profile from "./UserApp/pages/ViewAccount/Profile";
import MenuPage from "./UserApp/pages/MenuPage/MenuPage";
import PlaceOrder from "./UserApp/pages/PlaceOrder/PlaceOrder";
import DeliveryPage from "./UserApp/pages/DeliveryPage/DeliveryPage";
import RestaurantDashboard from "./RestaurantApp/pages/RestaurantDashboard";
import DriverDashboard from "./DriverApp/pages/DriverDashboard";

import { Routes, Route } from "react-router-dom";
import RestaurantSignUp from "./RestaurantApp/pages/RestaurantSignUp/RestaurantSignUp";
import DriverSignUp from "./DriverApp/pages/DriverSignUp/DriverSignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/restaurantDashboard" element={< RestaurantDashboard/>} />
      <Route path="/restaurantSignup" element={< RestaurantSignUp/>} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/menu/:restaurantId" element={<MenuPage />} />
      <Route path="/order" element={<PlaceOrder />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/driverDashBoard" element={<DriverDashboard/>}/>
      <Route path="/driverSignup" element={<DriverSignUp/>}/>
    </Routes>
  );
}

export default App;
