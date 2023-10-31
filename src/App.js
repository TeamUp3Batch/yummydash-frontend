import SignUp from "../src/pages/SignUp/SignUp";
import Landing from "../src/pages/LandingPage/LandingPage";
import Main from "../src/pages/Main/Main";
import Profile from "./pages/ViewAccount/Profile";


import { Routes, Route } from 'react-router-dom';
import menuPage from './pages/Menu/menu';
import MenuPage from './pages/Menu/menu';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
// es-lint differnt rules to setup
//
