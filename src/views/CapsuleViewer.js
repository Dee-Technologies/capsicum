import React from 'react';
// import Button from './IndexSections/Buttons.js';
import { Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Modal
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Particles from 'react-tsparticles';

import '../assets/scss/capsule-viewer.scss';
import Container from 'reactstrap/lib/Container';

import testPhotoOne from "assets/testphotoone.JPG"
import testPhotoTwo from "assets/testphototwo.JPG"

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import Slider from "nouislider";
import Nouislider from "nouislider-react";
import PacmanLoader from "react-spinners/PacmanLoader";
import SimpleCarousel from 'simple-react-carousel';

class CapsuleViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            capsuleOpened: false,
            capsicumData: {},
            particleImageData: [],
            particleVisiblity: "hidden",
            optionsVisiblity: "hidden",
            capsicumLockDisplay: "none",
            loadingStatus: true,
            particleSpeed: 2,
            presentationToggle: false,
            openImage: "",
            isParticleOpen: false,
            presentationActive: "hidden", // Display status for presentation mode
            carouselImages: ["https://picsum.photos/200/300"], // Array with carousel images
            openImageDescription: "",
            openImageName: ""
        }
        this.particlesLoaded = this.particlesLoaded.bind(this);
    }

    // Get capsicum data from URL Param
    componentDidMount() {
        const capsicumID = this.props.match.params.capsicumID;
        // Firebase setup
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey:  "AIzaSyAesmqx3YydCmAvT24gTtrNR_V0ccbv-dM",
                authDomain: "capsicum-7b458.firebaseapp.com",
                databaseURL: "https://capsicum-7b458-default-rtdb.asia-southeast1.firebasedatabase.app",
                projectId: "capsicum-7b458",
                storageBucket: "capsicum-7b458.appspot.com",
                messagingSenderId: "720103387844",
                appId: "1:720103387844:web:fec433842c266a94df0f91",
                measurementId: "G-4ZML2Q9T9V"
            });
        } else {
            firebase.app();
        }

        var firebaseDB = firebase.database();
        console.log(capsicumID)
        firebase.auth().signInAnonymously()
        .then(() => {
            var capsicumRef = firebaseDB.ref('capsicums/' + capsicumID);
            capsicumRef.on('value', (snapshot) => {
                const data = snapshot.val();
                this.setState({
                    capsicumData: data,
                }, () => {
                    this.getParticleImageData()
                })
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    getParticleImageData() {
        const media = this.state.capsicumData.media;
        var particleImageData = [];
        var carouselImages = []

        for (var i in media) {
            console.log("fef", media[i])

            var imgObject = {
                src: media[i].img,
                fileNum: i,
                name: media[i].name,
                description: media[i].description
            }

            carouselImages.push(media[i].img)
            console.log(carouselImages)
            particleImageData.push(imgObject);
            // var carouselImageObject = this.getCarouselSlide(media[i].img)
            // carouselImages.push(carouselImageObject);
        }
        console.log(carouselImages)
        this.setState({
            particleImageData: particleImageData,
            carouselImages: carouselImages,
            loadingStatus: false,
            capsicumLockDisplay: "block"
        }, () => {
            this.forceUpdate();
        })
    }

    getCarouselSlide(image) {
        return (
            <img src={image}></img>
        )
    }

    openCapsule() {
        this.setState({
            capsuleOpened: true,
            particleVisiblity: "visible",
            optionsVisiblity: "visible",
            capsicumLockDisplay: "none"
        }, () => {
        })
    }

    particlesLoaded(container) {
        container.addClickHandler((event, particles) => this.canvasClicked(event, particles))
    }

    canvasClicked(event, particles) {
        if (particles.length > 0) {
            console.log(particles[0].shapeData.fileNum);
            this.setState({
                isParticleOpen: true,
                openImage: particles[0].shapeData.src,
                openImageName: particles[0].shapeData.name,
                openImageDescription: particles[0].shapeData.description
            })
        }
    }

    particlesInit(main) {
        console.log(main)
    }

    render() {
        return (
            <div style={{maxWidth: "100%", overflow: "hidden"}}>  
                <div style={{display: this.state.capsicumLockDisplay, zIndex: "50"}}>
                    <Container onClick={() => this.openCapsule()}>
                        <div class="capsicumPosition" ref="capsicum">
                            <div className="bg capsicumLockedAnim flex" ref="capsicumInner">
                                <div className="c" ref="capsicumOuter"></div>   
                            </div>
                        </div>
                        <br></br>
                        <h1 className="capsicumName">{this.state.capsicumData.capsicumName}</h1>
                        <p className="tapToExpand">Tap to expand</p>
                    </Container> 
                </div>
                <div ref="optionsBox" style={{position: "absolute", left: "100%", top: "100%", transform: "translate(-100%, -100%)", zIndex: "10", width: "30vh", backgroundColor: "#fafafa", height: "12vh", 
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderLeft: "0.5px solid #f0f0f0", borderRadius: "10px 0 0 0", borderTop: "0.5px solid #f0f0f0",  visibility: this.state.optionsVisiblity,}}>
                    <div style={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <label className="custom-toggle">
                            <input type="checkbox"  value={this.state.presentationToggle} onChange={() => {
                                this.setState({
                                    presentationToggle: !this.state.presentationToggle,
                                    presentationActive: "visible",
                                    particleVisiblity: "hidden"
                                })
                            }}/>
                            <span className="custom-toggle-slider rounded-circle" />
                        </label>    
                        <small style={{position: "absolute", bottom: "1vh", marginTop: "5vh"}}>Presentation</small>
                    </div>
                    {/* <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Nouislider range={{ min: 0, max: 100 }} start={[this.state.particleSpeed]} style={{width: "15vh"}} 
                        onSlide={(value) => this.setState({particleSpeed: value[0]})} /> 
                        <small style={{position: "absolute", bottom: "1vh", marginTop: "5vh"}}>Speed</small>
                    </div> */}
                </div>
                <div ref="presentationMode" style={{visibility: this.state.presentationActive, zIndex: "-51"}}>
                    <SimpleCarousel>
                        {/* <div>
                            <h2>OMG Text!</h2>
                            <p>You can use text here too!</p>
                        </div> */}
                        {
                            this.state.carouselImages.map((image) => {
                                return(
                                    <div>
                                        <img src={image} />
                                    </div>
                                )
                            })
                        }
                        {/* <div>
                            <h2>Text and Images!?</h2>
                            <div>
                            <p>Here is a pretty image:</p>
                            <img src="https://picsum.photos/200/300" alt="You can use text and images in the same slide" />
                            </div> */}
                        {/* </div> */}
                    </SimpleCarousel>
                </div>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)"}}>
                    <Modal isOpen={this.state.isParticleOpen} toggle={() => this.setState({isParticleOpen: false})}  style={{width: "130vh", height: "60vh"}} size={"lg"}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "5vh"}}>
                            <div style={{}}>
                                <img src={this.state.openImage} style={{maxWidth: "40vh", maxHeight: "25vh", borderRadius: "10px"}}></img>
                            </div>
                            <div>
                                <h1>{this.state.openImageName}</h1>
                                <br></br>
                                <p>{this.state.openImageDescription}</p>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div ref="capsicumParticles"  style={{overflow: "hidden"}}>
                    <Container>
                    <Particles 
                        init={(m) => this.particlesInit(m)} 
                        loaded={(c) => this.particlesLoaded(c)}
                        ref="tsparticles"

                        options={{
                        fpsLimit: 60,
                        backgroundMode: {
                        enable: true,
                        zIndex: 0
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
                                "image",
                            ],
                            images: this.state.particleImageData
                        },
                        stroke: {
                            width: 0
                        },
                        opacity: {
                            value: 0.5,
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
                            random: {
                                enable: true,
                                minimumValue: 10
                            },
                            animation: {
                                enable: false,
                                speed: 10,
                                minimumValue: 0.1,
                                sync: true
                            }
                        },
                        links: {
                            enable: true,
                            distance: 100,
                            color: "#d01717",
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: false,
                            straight: false,
                            outMode: "out",
                            attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                            }
                        }
                        },
                        interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push"
                            },
                            // onHover: {
                            //     enable: true,
                            //     mode: "repulse"
                            // },
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
                        visibility: this.state.particleVisiblity,
                        position: "absolute",
                        left: "0",
                        top: "0"
                    }}
                    /> 
                    </Container>
                </div>
                {/* style={{
                            visibility: this.state.particleVisiblity,
                            position: "absolute",
                            left: "0",
                            top: "0"
                        }} */}
                <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "1"}}>
                    <PacmanLoader loading={this.state.loadingStatus} color={"#d01717"} />
                </div> 
            </div>
        )
    }
}

export default CapsuleViewer;