import React from 'react';
import Particles from 'react-tsparticles';
import iconLogo from "assets/capsicumlogo.svg";

import '../assets/scss/capsule-maker.scss';

import { UncontrolledAlert, Button, Input } from 'reactstrap';

class ShareMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCopyNotifOn: false
        }
    }

    componentDidMount() {
        const capsicumID = this.props.match.params.capsicumID;
        console.log(capsicumID);
    }

    // Sends users to view capsicum page
    viewCapsicum() {
        this.props.history.push("../viewer/" + this.props.match.params.capsicumID)
    }

    // Copies link for sharing
    copyShareLink() {
        navigator.clipboard.writeText("https://dillondesilva.github.io/capsicum-production/#/viewer/" + this.props.match.params.capsicumID);
        this.setState({
            isCopyNotifOn: true
        })
    }

    render() {
        return (
            <div style={{}}>
                <div style={{padding: "3vh", height: "100vh", zIndex: "10", borderRight: "0.5px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute"}}>
                    <div>
                        <h1 className="capsicumName" style={{textAlign: "center"}} >Thanks for Using Capsicum!</h1>
                        <p style={{textAlign: "center"}} className="dragAndDropText">Share your timeless creation with the world</p>
                        <Input type="text" style={{textAlign: "center"}} value={"https://dillondesilva.github.io/capsicum-production/#/viewer/" + this.props.match.params.capsicumID}></Input>
                        <br></br>
                        <div style={{textAlign: "center"}}>
                            <Button style={{color: "#fafafa", backgroundColor: "#f84c1b", borderColor: "#f84c1b" }}
                            onClick={() => this.copyShareLink()}>
                            <span className="btn-inner--icon mr-1">
                                <i className="ni ni-single-copy-04" />
                            </span>
                            <span className="btn-i  ner--text">Copy</span>
                            </Button>
                            <div style={{paddingTop: "2vh"}}>
                                <Button onClick={() => this.viewCapsicum()}>View Capsicum</Button>    
                            </div>
                        </div>
                    </div>
                    <UncontrolledAlert isOpen={this.state.isCopyNotifOn} color="success" fade={true} toggle={() => this.setState({isCopyNotifOn: false})}style={{width: "80%", bottom: "0", position: "absolute", height: "10vh"}}>
                            <span className="alert-inner--icon">
                                <i className="ni ni-like-2" />
                            </span>
                            <span className="alert-inner--text ml-1">
                                <strong>Copied</strong>!
                            </span>
                    </UncontrolledAlert>
                </div>
                <div>
                    <Particles
                            options={{
                            fpsLimit: 60,
                            backgroundMode: {
                            enable: true,
                            zIndex: -10
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
                            opacity: "0.1"
                        }}
                        /> 
                </div>
            </div>
        )
    }
}

export default ShareMobile