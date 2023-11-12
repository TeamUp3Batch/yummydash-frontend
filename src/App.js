import SignUp from "../src/pages/SignUp/SignUp";
import Landing from "../src/pages/LandingPage/LandingPage";
import Main from "../src/pages/Main/Main";
import Profile from "./pages/ViewAccount/Profile";
import MenuPage from "./pages/MenuPage/MenuPage";
import PlaceOrder from "../src/pages/PlaceOrder/PlaceOrder";
import DeliveryPage from "../src/pages/DeliveryPage/DeliveryPage";
import RestaurantHomePage from "./RestaurantApp/pages/RestaurantDashboard";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/restaurantHomePage" element={< RestaurantHomePage/>} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/menu/:restaurantId" element={<MenuPage />} />
      <Route path="/order" element={<PlaceOrder />} />
      <Route path="/delivery" element={<DeliveryPage />} />
    </Routes>
  );
}

export default App;
