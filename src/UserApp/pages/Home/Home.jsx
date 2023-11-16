
import React from "react";
import SimpleHeader from "../SimpleHeader/SimpleHeader";
import style from "./home.module.scss";
import Header from "../Header/Header";

const Home = () => {
  const isAuthenticated = false;

  return (
    <div>
      <div className={style.backgroundPic}>
        {isAuthenticated ? (
          <div>
            <Header />
          </div>
        ) : (
          <div>
            <SimpleHeader />
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
