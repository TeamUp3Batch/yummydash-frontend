import React from "react";
import { Typography, Link, Container, Paper } from "@mui/material";
import HeaderWhite from "../HeaderWhite/HeaderWhite";

const NeedHelpPage = () => {
  const containerStyle = {
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const paperStyle = {
    padding: "32px",
    textAlign: "center",
    maxWidth: "600px",
  };
  const highlightStyle = {
    fontWeight: 'bold',
    color: 'red',
  };

  return (
    <React.Fragment>
      <HeaderWhite />
      <Container style={containerStyle}>
        <Paper style={paperStyle}>
          <Typography variant="h4" gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you need any assistance or have questions about your order, we're
            here to help! Contact our  <span style={highlightStyle}>YUMMYDASH</span> support team at{" "}
            <Link href="mailto:teamupcomit@gmail.com">
              teamupcomit@gmail.com
            </Link>{" "}
            for prompt assistance. Your satisfaction is our priority, and we're
            dedicated to ensuring your food ordering experience is seamless and
            enjoyable. Feel free to reach out for any help you may need!
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default NeedHelpPage;
