import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import SignUp from "./pages/SignUp/SignUp";
import Landing from "./pages/LandingPage";
import GiftCards from "./pages/GiftCards/GiftCards";
import FAQ from "./pages/FAQ/FAQ";
import BecomeACourier from "./pages/BecomeACourier/BecomeACourier";
import Partners from "./pages/Partners/Partners";
import AboutUs from "./pages/AboutUs/AboutUs";
import Careers from "./pages/Careers/Careers";
import PartnerSuccessGuide from "./pages/PartnerSuccessGuide/PartnerSuccessGuide";
import BrowseByCity from "./pages/BrowseByCity/BrowseByCity";
import FoodWiki from "./pages/FoodWiki/FoodWiki";
import SkipForBusiness from "./pages/SkipForBusiness/SkipForBusiness";
import MediaAndCommunity from "./pages/MediaAndCommunity/MediaAndCommunity";
import Rewards from "./pages/Rewards/Rewards";
import ResponsibleBusiness from "./pages/ResponsibleBusiness/ResponsibleBussiness";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about-us" element={<AboutUs/>} />

        <Route path="/partners" element={<Partners/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/become-a-courier" element={<BecomeACourier/>} />
        <Route path="/gift-cards" element={<GiftCards/>} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/skip-for-business" element={<SkipForBusiness/>} />
        <Route path="/rewards" element={Rewards} />
        <Route path="/media-and-community" element={<MediaAndCommunity/>} />
        <Route path="/partner-success-guide" element={<PartnerSuccessGuide/>} />
        <Route path="/browse-by-city" element={<BrowseByCity/>} />
        <Route path="/food-wiki" element={<FoodWiki/>} />
        <Route path="/responsible-business" element={<ResponsibleBusiness/>} />
    </Routes>
  );
}

export default App;
