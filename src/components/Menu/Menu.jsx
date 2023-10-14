import React from 'react';
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios';
import { MenuURL } from '../../api/ApiLinks';

const Menu = () => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    axios.get(MenuURL).then((response) => setMenuList(response.data));
  }, []);

  return (
    <div>
      {menuList.map((restaurants) => (
        <div key={restaurants._id}>
          {restaurants.menu.map((type) => (
            <div key={type._id}>
              <p>{type.name}</p>
              <p>{type.description}</p>
              <p>{type.price}</p>
              <p>{type.category}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
