import React from 'react';
import Particles from 'react-tsparticles';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class MemoryParticles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            particleImageData: [],
            particleVisiblity: "visible"
        }
    }


    // Get capsicum data from URL Param
    componentDidMount() {
        const capsicumID = this.props.capsicumID;
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

        for (var i in media) {
            console.log("fef", media[i])

            var imgObject = {
                src: media[i].img,
                fileNum: i,
                name: media[i].name,
                description: media[i].description
            }

            particleImageData.push(imgObject);
            // var carouselImageObject = this.getCarouselSlide(media[i].img)
            // carouselImages.push(carouselImageObject);
        }

        this.setState({
            particleImageData: particleImageData,
        }, () => {
            this.forceUpdate();
        })
    }

    particlesLoaded(container) {
        container.addClickHandler((event, particles) => this.canvasClicked(event, particles))
    }

    canvasClicked(event, particles) {
        console.log("fdcx")
        if (particles.length > 0) {
            console.log(particles[0].shapeData.fileNum);
            this.setState({
                isParticleOpen: true,
                openImage: particles[0].shapeData.src,
                openImageName: particles[0].shapeData.name,
                openImageDescription: particles[0].shapeData.description
            }, () => {
                console.log("fef")
            })
        }
    }

    particlesInit(main) {
        console.log(main)
    }

    render() {
        return (
            <div>
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
                                minimumValue: 5
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
                            speed: 1,
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
            </div>
        )
    }
}

export default MemoryParticles;