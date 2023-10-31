import SignUp from "../src/pages/SignUp/SignUp";
import Landing from "../src/pages/LandingPage/LandingPage";
import Main from "../src/pages/Main/Main";
import Success from "../src/pages/Success";
import Cancel from "../src/pages/Cancel";
import PlaceOrder from "../src/pages/PlaceOrder/PlaceOrder"


import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/success" element={<Success/>} />
      <Route path="/order" element={<PlaceOrder/>}/>
    </Routes>
  );
}

export default App;