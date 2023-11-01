import SignUp from "../src/pages/SignUp/SignUp";
import Landing from "../src/pages/LandingPage/LandingPage";
import Main from "../src/pages/Main/Main";
import Profile from "./pages/ViewAccount/Profile";
import PlaceOrder from "../src/pages/PlaceOrder/PlaceOrder"
import MenuPage from "./pages/MenuPage/MenuPage";

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order" element={<PlaceOrder/>}/>
      <Route path="/menu/:restaurantId" element={<MenuPage/>} />

    </Routes>
  );
}

export default App;
// es-lint differnt rules to setup
//
