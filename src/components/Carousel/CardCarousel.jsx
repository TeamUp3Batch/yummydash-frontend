import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";

const CardCarousel = () => {
  return (
    <div>
      <Container>
        <Carousel>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100 h-150"
                  src="https://images.pexels.com/photos/333850/pexels-photo-333850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=100"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>This is the first slide!</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Col>
              <Col>
                <img
                  className="d-block w-100 h-150"
                  src="https://images.pexels.com/photos/1480688/pexels-photo-1480688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=100"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col>
                <img
                  className="d-block w-100 h-150"
                  src="https://images.pexels.com/photos/1480687/pexels-photo-1480687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=100"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Col>
              <Col>
                <img
                  className="d-block w-100 h-150"
                  src="https://images.pexels.com/photos/1480689/pexels-photo-1480689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=100"
                  alt="Fourth slide"
                />
                <Carousel.Caption>
                  <h3>Fourth slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default CardCarousel;
