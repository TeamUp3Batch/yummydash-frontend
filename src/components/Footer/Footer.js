import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import './Footer.css';
const Footer = () => {
  return (
    <footer>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/become-a-courier">Become A Courier</Link>
              </li>
              <li>
                <Link to="/gift-cards">Gift Cards</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/skip-for-business">Skip For Business</Link>
              </li>
              <li>
                <Link to="/rewards">Rewards</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ul>
              <li>
                <Link to="/media-and-community">Media & Community</Link>
              </li>
              <li>
                <Link to="/partner-success-guide">Partner Success Guide</Link>
              </li>
              <li>
                <Link to="/browse-by-city">Browse by City</Link>
              </li>
              <li>
                <Link to="/food-wiki">Food Wiki</Link>
              </li>
              <li>
                <Link to="/responsible-business">Responsible Business</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ul>
              <li>
            <Link to="/media-and-community">Invite Friends,Get $5</Link>
            </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
