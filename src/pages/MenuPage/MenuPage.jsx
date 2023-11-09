import React from "react";
import Header from '../Header/Header';
//import Footer from '../../components/Footer/Footer';
import Menu from "../../components/Menu/Menu";
import { useParams } from 'react-router-dom';
import { useFetchMenu } from "./hooks/useFetchMenu";

const MenuPage = () => {
  const { restaurantId } = useParams();
  const { restaurantDetails, isLoading, isError } = useFetchMenu({
    restaurantId,
  });

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        Please try again error occured
      </div>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <Menu restaurantDetails={restaurantDetails} />
    </React.Fragment>
  );
};

export default MenuPage;
