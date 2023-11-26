import React from "react";
import HeaderWhite from "../HeaderWhite/HeaderWhite"
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
      <HeaderWhite />
      <Menu restaurantDetails={restaurantDetails} />
    </React.Fragment>
  );
};

export default MenuPage;
