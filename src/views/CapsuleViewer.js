import React from 'react';
// import Button from './IndexSections/Buttons.js';
import { Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Particles from 'react-particles-js';

import '../assets/scss/capsule-viewer.scss';
import Container from 'reactstrap/lib/Container';

import testPhotoOne from "assets/testphotoone.JPG"
import testPhotoTwo from "assets/testphototwo.JPG"

class CapsuleViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            capsuleOpened: false,
            particleVisiblity: "hidden"
        }
    }

    openCapsule() {
        this.setState({
            capsuleOpened: true,
            particleVisiblity: "visible"
        }, () => {
            this.refs.capsi.style.display = "none";
            // console.log(this.refs.capsicumParticles.props.style);
            console.log(this.refs.capsicumParticles.style.display);
        })
    }

    clickeri() {
        alert('hot')
    }

    render() {
        return (
            <div style={{maxWidth: "100%", overflow: "hidden"}}>  
                <div ref="capsicumParticles"  style={{overflow: "hidden"}}>
                    <Container style={{}}>
                    <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 8,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "line_linked": {
                                "enable": false
                            },
                            "move": {
                                "speed": 1,
                                "out_mode": "out"
                            },
                            "shape": {
                                "type": [
                                    "image",
                                ],
                                "images": [
                                    {
                                        "src": testPhotoOne,
                                        "height": 10,
                                        "width": 10
                                    },
                                    {
                                        "src": testPhotoTwo,
                                        "height": 10,
                                        "width": 10
                                    }
                                ]
                            },
                            "color": {
                                "value": "#CCC"
                            },
                            "size": {
                                "value": 30,
                                "random": false,
                                "anim": {
                                    "enable": true,
                                    "speed": 4,
                                    "size_min": 10,
                                    "sync": false
                                }
                            }
                        },
                        "retina_detect": false
                    }} 

                    options={{
                        interactivity: {
                          detectsOn: "canvas",
                          events: {
                            onClick: {
                              enable: true,
                            }
                          }
                        }
                    }}

                    style={{
                        visibility: this.state.particleVisiblity,
                        position: "absolute",
                        left: "0",
                        top: "0"
                    }}

                    onClick={() => {console.log("click")}}
                    />
                     <Particles
                            params={{
                                "particles": {
                                    "number": {
                                        "value": 160,
                                        "density": {
                                            "enable": false
                                        }
                                    },
                                    "size": {
                                        "value": 3,
                                        "random": true,
                                        "anim": {
                                            "speed": 4,
                                            "size_min": 0.3
                                        }
                                    },
                                    "line_linked": {
                                        "enable": false
                                    },
                                    "move": {
                                        "random": true,
                                        "speed": 1,
                                        "direction": "top",
                                        "out_mode": "out"
                                    },
                                    "color": {
                                        "value": "#d01717"
                                    }
                                },
                                "interactivity": {
                                    "events": {
                                        "onhover": {
                                            "enable": true,
                                            "mode": "bubble"
                                        },
                                        "onclick": {
                                            "enable": true,
                                            "mode": "repulse"
                                        }
                                    },
                                    "modes": {
                                        "bubble": {
                                            "distance": 250,
                                            "duration": 2,
                                            "size": 0,
                                            "opacity": 0
                                        },
                                        "repulse": {
                                            "distance": 400,
                                            "duration": 4
                                        }
                                    }
                                }
                        }} 

                        style={{
                            visibility: this.state.particleVisiblity,
                            position: "absolute",
                            left: "0",
                            top: "0"
                        }}

                    />
                    </Container>
                </div>
                <div ref="capsi" style={{display: "visible"}}>
                    <Container onClick={() => this.openCapsule()}>
                        <div class="capsicumPosition" ref="capsicum">
                            <div className="bg capsicumLockedAnim flex" ref="capsicumInner">
                                <div className="c" ref="capsicumOuter"></div>   
                            </div>
                        </div>
                        <br></br>
                        <h1 className="capsicumName">MFHS Graduation 2020</h1>
                        <p className="tapToExpand">Tap to expand</p>
                    </Container> 
                </div>
            </div>
        )
    }
}

export default CapsuleViewer;