import React from 'react';
import Particles from 'react-tsparticles';
import iconLogo from "assets/capsicumlogo.svg";

import '../assets/scss/capsule-maker.scss';

import { Button, Input } from 'reactstrap';

class Share extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const capsicumID = this.props.match.params.capsicumID;
        console.log(capsicumID);
    }
    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{padding: "3vh", width: "50%", height: "100vh", zIndex: "10", backgroundColor: "#fafafa", borderRight: "0.5px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div>
                        <h1 className="capsicumName" style={{textAlign: "center"}} >Thanks for Using Capsicum</h1>
                        <p className="capsicumName" style={{textAlign: "center"}} className="dragAndDropText">Share your timeless creation with the world</p>
                        <Input type="text" style={{textAlign: "center"}} value={"https://capsicum.com/viewer/" + this.props.match.params.capsicumID}>https://capsicum.com/</Input>
                        <br></br>
                        <div style={{textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Button>View Capsicum</Button>  
                            <Button style={{color: "#fafafa", backgroundColor: "#f84c1b", borderColor: "#f84c1b" }}>
                            <span className="btn-inner--icon mr-1">
                                <i className="ni ni-single-copy-04" />
                            </span>
                            <span className="btn-inner--text">Copy to Clipboard</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div style={{padding: "3vh", width: "50%"}}>
                    <Particles 
                            style={{padding: "3vh", width: "50%"}}
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
                            top: "0"
                        }}
                        /> 
                </div>
            </div>
        )
    }
}

export default Share