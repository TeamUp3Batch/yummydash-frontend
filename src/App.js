import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "../src/components/Profile/Profile";
import SignUp from "../src/pages/SignUp/SignUp";
import Landing from "../src/pages/LandingPage/LandingPage";


import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
