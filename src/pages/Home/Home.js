import React from 'react';
import Header from '../Header';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import { useAuth0 } from "@auth0/auth0-react";
import './Home.css';
import { Typography } from '@mui/material';
import Footer from '../../components/Footer/Footer';



const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div>
    <div className='background-pic'>
      {isAuthenticated ?
    (  <div><Header />
   
    </div>):(<div><SimpleHeader/></div>)
}
<div className='skip-mainpage'>
   
    </div>
    
    </div>
    <Footer/>
    </div>
  );
};

export default Home;