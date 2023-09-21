import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
// import BecomeACourier from './components/BecomeACourier';
// import BrowserByCity from './components/BrowserByCity';
// import Careers from './components/Careers';
// import Faq from './components/Faq';
// import FoodWiki from './components/FoodWiki';
// import GiftCards from './components/GiftCards';
// import MediaAndCommunity from './components/MediaAndCommunity';
// import ParenterSuccessGuide from './components/ParenterSuccessGuide';
// import Partner from './components/Partners';
// import ResponsibleBusiness from './components/ResponsibleBusiness';
// import Rewards from './components/Rewards';
// import SkipExpressLane from './components/SkipExpressLane';
// import SkipForBusiness from './components/SkipForBusiness';
const App = () => {
  return (
    <div>
      <Router>
        <Route path="" element={<AboutUs />} />
      </Router>
    </div>
  );
};

export default App;
/**
 * <Route path="/" element={<Landing />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/my-messages" element={<MyMessages />} />
        <Route path="/listingget" element={<Listingget />} />
        <Route path="/farmer-detail" element={<FarmerDetail />} />
        <Route path="/coffee-detail" element={<CoffeeDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/sample-cart" element={<SampleShoppingCart />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/cart-summary" element={<CartSummary />} />
 */
