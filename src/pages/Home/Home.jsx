import React from 'react';
// import Header from '../Header/Header';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import { useAuth0 } from "@auth0/auth0-react";
import style from './home.module.scss';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';



const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  //const isAuthenticated;
  return (
    <div>
    <div className={style.backgroundPic}>
      {isAuthenticated ?
    (  <div><Header />
   
    </div>):(<div><SimpleHeader/></div>)
}
<div className= {style.skipMainpage}>
   
    </div>
    
    </div>
    <Footer />
    </div>
  );
};

export default Home;