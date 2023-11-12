import SignUp from "../src/UserApp/pages/SignUp/SignUp";
import Landing from "../src/UserApp/pages/LandingPage/LandingPage";
import Main from "../src/UserApp/pages/Main/Main";
import Profile from "../src/UserApp/pages/Profile/Profile";
import MenuPage from "../src/UserApp/pages/MenuPage/MenuPage";
import PlaceOrder from "../src/UserApp/pages/PlaceOrder/PlaceOrder";
import DeliveryPage from "../src/UserApp/pages/DeliveryPage/DeliveryPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/menu/:restaurantId" element={<MenuPage />} />
      <Route path="/order" element={<PlaceOrder />} />
      <Route path="/delivery" element={<DeliveryPage />} />
    </Routes>
  );
}

export default App;
