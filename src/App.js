import SignUp from "../src/pages/SignUp/SignUp";
import Landing from "../src/pages/LandingPage/LandingPage";
import Main from "../src/pages/Main/Main";


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
    </Routes>
  );
}

export default App;
