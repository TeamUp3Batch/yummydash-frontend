import React from "react";
import { Container, Typography } from "@mui/material";
import "./Footer.css";



const Footer = () => {
  return (
    <footer>
      <Container>
       <Typography  align="center" gutterBottom className="textColor"> 
       &copy;{new Date().getFullYear()} Yummy Dash 
        </Typography>
        </Container>
    </footer>
  );
};

export default Footer;
