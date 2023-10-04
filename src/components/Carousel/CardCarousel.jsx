// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import Card from 'react-bootstrap/Card';

// import "./carousel.module.scss"; // Use the SCSS file you created

// const recipes = [0, 1, 2, 3];

// const CardCarousel = ({ images }) => {
//   const reduceRecipes = (acc, cur, index) => {
//     const groupIndex = Math.floor(index / 3);
//     if (!acc[groupIndex]) acc[groupIndex] = [];
//     acc[groupIndex].push(cur);
//     console.log(acc);
//     return acc;
//   };

//   return (
//     <Carousel>
//     {recipes.reduce(reduceRecipes, []).map((item, index) => (
//       <Carousel.Item key={index}>
//         <div className="d-flex justify-content-center">
//           {item.map((item, index) => {
//             return (
//               <Card key={index} style={{ width: '18rem' }}>
//                 <Card.Img
//                   variant="top"
//                   src={`https://picsum.photos/200?random=${item + 1}`}
//                 />
//               </Card>
//             );
//           })}
//         </div>
//       </Carousel.Item>
//     ))}
//   </Carousel>
//   );
// };

// export default CardCarousel;
