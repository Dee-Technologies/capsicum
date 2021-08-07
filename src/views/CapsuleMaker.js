import React from 'react';
// import Button from './IndexSections/Buttons.js';
import { Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Particles from 'react-tsparticles';
import Inputs from './IndexSections/Inputs.js';
import '../assets/scss/capsule-maker.scss';
import Container from 'reactstrap/lib/Container';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import uuid from 'react-uuid'

import PacmanLoader from "react-spinners/PacmanLoader";

class CapsuleMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            capsicumName: "Untitled Capsicum", // Capsicum Name
            files: [], // Array storing all the user input files
            fileUploadActive: "block", // The css display status for the file upload section
            currentFileIdx: 0, // Stores the index of the current file being observed in the builder
            mediaData: [], // Stores the media data per object,
            mediaEditorActive: "none", // The css display status for the media editor section,
            imageTitle: "Untitled Image", // Currently inputted image title
            imageDescription: "", // Currently inputted image description,
            nextButtonActive: "none", // The css display status for the button to add media data for next image
            buildCapsicumButtonActive: "none", // The css display status for building a capsicum
            loadingStatus: false, // Loading status
            pageOpacity: 1 // Page opacity. Changes on loading operations
        }
    }

    componentDidMount() {
        // For testing purposes
        localStorage.clear();

        // Firebase setup
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
    }

    openFileExplorer() {
        this.refs.fileBrowser.checked = true;
    }

    // Returns file blob
    fileToBlob(file) {
        return new Promise((resolve) => {
            // Read and return file blob
            const reader = new FileReader();
            reader.onload = () => { resolve(reader.result) }
            reader.readAsDataURL(file);
        }) 
    }

    addFiles(e) {
        e.preventDefault();
        console.log(e.dataTransfer.items);

        var ps = [];

        // Iterate over dropped in files and add them to state
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
              var file = e.dataTransfer.items[i].getAsFile();
              ps.push(this.fileToBlob(file));              
            }
        }
        
        Promise.all(ps).then(items => {
            if (items.length === 1) {
                this.setState({
                    files: items,
                    buildCapsicumButtonActive: "block"
                }, () => {
                    console.log(this.state.files)
                    this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
                })   
            } else {
                this.setState({
                    files: items,
                    nextButtonActive: "block"
                }, () => {
                    console.log(this.state.files)
                    this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
                })   
            }
        })
    }

    // Verifies and completes the file upload step.
    // Will then allow user to proceed to adding title and descriptions
    // for each image
    completeFileUpload() {
        // Set file upload to be none
        this.setState({
            fileUploadActive: "none",
            mediaEditorActive: "flex"
        })
    }

    // Pushes data captured from input fields for current piece of displayed
    // media and sets the next one to the display
    nextImage() {
        // Creating and appending collectedData to mediaData array
        var collectedData = {
            name: this.refs.imageName.innerText,
            description: this.state.imageDescription,
            img: this.state.files[this.state.currentFileIdx]
        }

        var currentMediaData = this.state.mediaData;
        currentMediaData.push(collectedData);

        this.setState({
            mediaData: currentMediaData
        }, () => {
            // For debugging purposes
            console.log(this.state.mediaData);
        })

        // Setting the next image to display
        var numFiles = this.state.files.length
        // If we are on the second last image, we want to show the
        // build capsicum button not the next button
        if (this.state.currentFileIdx === numFiles - 2) {
            this.setState({
                imageTitle: "Untitled Image",
                imageDescription: "",
                currentFileIdx: this.state.currentFileIdx + 1,
                nextButtonActive: "none",
                buildCapsicumButtonActive: "block"
            })

            this.refs.imageName.innerText = "Untitled Image";
            this.refs.imageDescription.innerText = "";
        }
        else {
            this.setState({
                imageTitle: "Untitled Image",
                imageDescription: "",
                currentFileIdx: this.state.currentFileIdx + 1
            })

            this.refs.imageName.innerText = "Untitled Image";
            this.refs.imageDescription.innerText = "";
        }
    }

    // Builds Capsicum object and sends to database
    buildCapsicum() {
        // Adding final collectedData to overall mediaData array
        var collectedData = {
            name: this.refs.imageName.innerText,
            description: this.state.imageDescription,
            img: this.state.files[this.state.currentFileIdx]
        }

        var currentMediaData = this.state.mediaData;
        currentMediaData.push(collectedData);

        this.setState({
            mediaData: currentMediaData,
            loadingStatus: true,
            pageOpacity: 0.1
        }, () => {
            const capsicumID = uuid();

            var capsicum = {
                capsicumName: this.state.capsicumName,
                capsicumID: capsicumID,
                media: this.state.mediaData
            }

            var firebaseDB = firebase.database();

            firebase.auth().signInAnonymously()
            .then(() => {
                firebaseDB.ref('capsicums/' + capsicumID).set(capsicum)
                .then(() => {
                    this.setState({
                        loadingStatus: false,
                        pageOpacity: 1
                    })

                    window.location = "share/" + capsicumID; 
                })  
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        })
    }

    render() {
        return (
            <div>
                <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "1"}}>
                    <PacmanLoader loading={this.state.loadingStatus} color={"#d01717"} />
                </div> 
                <div style={{opacity: this.state.pageOpacity}}>
                    <Container style={{border: "1px solid #707070", width: "200vh", height: "80vh", borderRadius: "10px", backgroundColor: "#fafafa", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} >
                        <div 
                            onDrop={(e) => this.addFiles(e)}
                            onDragOver={(e) => { e.preventDefault();}}
                            onDragEnter={(e) => { e.preventDefault();}}
                            onDragLeave={(e) => { e.preventDefault();}}
                            ref="fileUploadStep" 
                            style={{display: this.state.fileUploadActive}}
                        >
                            <h1 className="capsicumName" contentEditable>Untitled Capsicum</h1>
                            <h2 className="dragAndDropText">Drag and drop your images here</h2>
                            <div className="fileInput">
                                <Button className="btn-1" color="primary" size="sm" outline type="button" onClick={() => this.openFileExplorer()}>
                                    Upload Files
                                    <input type="file" ref="fileBrowser" onChange={(e) => {console.log(e)}} hidden/>
                                </Button>
                            </div>
                            <div>
                                <p ref="filesSelected" className="filesSelected"></p>
                            </div>
                            <div className="buildCapsicumBtn">
                                    <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.completeFileUpload()}>Next</Button>
                            </div> 
                        </div>
                        
                        <div style={{display: this.state.mediaEditorActive, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly", height: "100%", width: "100%", alignItems: "center"}}>
                            <div style={{flexDirection: "column"}}>
                                <img src={this.state.files[this.state.currentFileIdx]} style={{objectFit: "cover", height: "60vh", width: "60vh", borderRadius: "10px"}}></img>
                            </div>
                            <div style={{flexDirection: "column", width: "100vh"}}>
                                <h1 className="capsicumName"  ref="imageName" style={{textAlign: "left", marginLeft: "5vh"}}
                                onChange={(e) => {this.setState({imageTitle: e.target.value})}} contentEditable>
                                    {this.state.imageTitle} 
                                </h1>
                                <textarea style={{width: "90vh", height: "20vh", backgroundColor: "#fafafa", marginLeft: "5vh", borderRadius: "10px", resize: "none"}} 
                                onChange={(e) => {this.setState({imageDescription: e.target.value})}} placeholder="Tell us something about this photo..." ref="imageDescription">
                                    {this.state.imageDescription}
                                </textarea>
                                <div className="buildCapsicumBtn" style={{display: this.state.nextButtonActive}}>
                                    <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.nextImage()}>Next</Button>
                                </div> 
                                <div className="buildCapsicumBtn" style={{display: this.state.buildCapsicumButtonActive}}>
                                    <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.buildCapsicum()}>Build Capsicum</Button>
                                </div> 
                            </div>  
                        </div>
                    </Container> 
                    <Particles 
                            options={{
                            fpsLimit: 60,
                            backgroundMode: {
                            enable: true,
                            zIndex: -3
                            },
                            particles: {
                            number: {
                                value: 120,
                                density: {
                                enable: true,
                                area: 800
                                }
                            },
                            color: {
                                value: "#ff0000",
                                animation: {
                                enable: true,
                                speed: 20,
                                sync: true
                                }
                            },
                            shape: {
                                type: [
                                    "circle"
                                ],
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
                                value: 5,
                                random: true,
                                animation: {
                                    enable: false,
                                    speed: 20,
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
                                speed: 6,
                                direction: "none",
                                random: false,
                                straight: false,
                                outMode: "out",
                                attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
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

export default CapsuleMaker;