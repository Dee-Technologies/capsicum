import React from 'react';
import { Link }  from 'react-router-dom';
import { Button } from 'reactstrap';
import Particles from 'react-tsparticles';
import iconLogo from "assets/capsicumlogo.svg";

class LandingMobile extends React.Component {
    render() {
        return (
            <div>
                <div style={{paddingTop: "5vh", textAlign: "center", transform: "translate(-50%, -50%)", top: "50%", left: "50%", position: "absolute"}}>
                    <img
                        alt="..."
                        className="img-fluid"
                        src={require("assets/capsicum-text-logo.svg")}
                        style={{ width: "20vh"}}
                    />
                    <p className="lead" style={{color: "#000000", width: "50vh", fontSize: "1em"}}>
                        Create immersive memory capsules in seconds
                    </p>
                    <Link to="capsule-maker" style={{textDecoration: "none", padding: "0.5vh"}}>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0"
                          color="#do1717"
                          size="lg"
                        >
                          <span className="btn-inner--text" style={{color: "#do1717 !important"}}>Get started</span>
                        </Button>
                      </Link>
                </div>
                <Particles 
                            options={{
                            fpsLimit: 60,
                            backgroundMode: {
                            enable: true,
                            zIndex: -3
                            },
                            particles: {
                            number: {
                                value: 80,
                                density: {
                                enable: true,
                                area: 800
                                }
                            },
                            color: {
                                value: "#ff0000",
                            },
                            shape: {
                                type: [
                                    "image"
                                ],
                                images: [
                                    {
                                        src: iconLogo,
                                    },
                                ]
                            },
                            stroke: {
                                width: 0
                            },
                            opacity: {
                                value: 1,
                                random: false,
                                animation: {
                                    enable: false,
                                    speed: 3,
                                    minimumValue: 0.1,
                                    sync: false
                                }
                            },
                            size: {
                                value: 20,
                                random: true,
                                animation: {
                                    enable: false,
                                    speed: 20,
                                    minimumValue: 0.1,
                                    sync: true
                                }
                            },
                            move: {
                                attract: { enable: false, rotateX: 600, rotateY: 1200 },
                                bounce: false,
                                direction: "none",
                                enable: true,
                                out_mode: "out",
                                random: false,
                                speed: 5,
                                straight: false
                              },
                              rotate: {
                                animation: {
                                  enable: true,
                                  speed: 10,
                                  sync: false
                                }
                            }
                            },
                            interactivity: {
                            detectsOn: "canvas",
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push"
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse"
                                },
                                resize: true
                            },
                            modes: {
                                grab: {
                                distance: 400,
                                links: {
                                    opacity: 1
                                }
                                },
                                bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 0.8
                                },
                                repulse: {
                                distance: 200
                                },
                                push: {
                                quantity: 4
                                },
                                remove: {
                                quantity: 2
                                }
                            }
                            },
                            detectRetina: true,
                        }}

                        style={{
                            position: "absolute",
                            left: "0",
                            top: "0",
                            opacity: 0.1
                        }}
                        /> 
            </div>
        )
    }
}

export default LandingMobile;