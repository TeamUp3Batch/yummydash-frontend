import React from "react";
import { Container, Typography } from "@mui/material";
import  "./footer.module.scss";



const Footer = () => {
  return (
    <footer>
      <Container>
       <Typography  align="center" gutterBottom color={"white"}> 
       &copy;{new Date().getFullYear()} Yummy Dash 
        </Typography>
        </Container>
    </footer>
  );
};

export default Footer;
