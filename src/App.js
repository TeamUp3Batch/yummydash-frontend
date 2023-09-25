import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import SignUp from "./pages/SignUp/SignUp";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login/Login";


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
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
