import React from "react";
import { Container, Typography } from "@mui/material";
import "./footer.module.scss";

const Footer = () => {
  const typographyStyles = {
    padding: "10px",
    textAlign: "center",
    color: "white",
    fontSize: "1rem",
  };

  return (
    <footer>
      <Container>
        <Typography style={typographyStyles}>
          &copy;{new Date().getFullYear()}
          Yummy Dash
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
