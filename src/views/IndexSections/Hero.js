/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import bannerImage from "assets/bg-banner.png"
import { Link } from 'react-router-dom';
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative" style={{backgroundImage: `url(${bannerImage})`, backgroundSize: "contain"}}>
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/capsicum-text-logo.svg")}
                      style={{ width: "200px" }}
                    />
                    <p className="lead" style={{color: "#000000"}}>
                      Create immersive memory capsules in seconds
                    </p>
                    <div className="btn-wrapper mt-5">

                      <Link to="capsule-maker" style={{textDecoration: "none", padding: "1vh"}}>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0"
                          color="#do1717"
                          size="lg"
                        >
                          {/* <span className="btn-inner--icon mr-1">
                            <i className="ni ni-right" />
                          </span> */}
                          <span className="btn-inner--text" style={{color: "#do1717 !important"}}>Get started</span>
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
