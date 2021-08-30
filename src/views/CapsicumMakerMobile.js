/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Input, UncontrolledAlert, Button } from "reactstrap";
import Particles from 'react-tsparticles';
import '../assets/scss/capsule-maker.scss';
import Container from 'reactstrap/lib/Container';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import uuid from 'react-uuid'

import PacmanLoader from "react-spinners/PacmanLoader";

import imageCompression from 'browser-image-compression';

class CapsicumMakerMobile extends React.Component {
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
            pageOpacity: 1, // Page opacity. Changes on loading operations
            isErrorActive: false, // Boolean for if an error alert should be active
            errorMsg: "You need to upload at least one image", // Error message to display 
            presentationActive: "none", // Display status for presentation mode
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
        }
    }

    // When page loads (ie: component mounts)
    componentDidMount() {
        // For testing purposes
        localStorage.clear();

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
    }

    // When the upload file button is clicked,
    // this is triggered
    openFileExplorer() {
        this.refs.fileBrowser.click();
    }

    // Returns file blob
    fileToBlob(file) {
        // options for image compression
        const options = {
            maxSizeMB: 0.4, 
            fileType: "image/jpeg"
        }

        return new Promise((resolve) => {
            // reader will take a file input
            // and output the blob.

            // this is async so hence we return a promise
            const reader = new FileReader();
            reader.onload = () => { 
                resolve(reader.result); 
            }

            // compress the image first and then read for the blob
            imageCompression(file, options)
            .then(resp => {
                console.log("compressed", resp)
                reader.readAsDataURL(resp);
            }).catch(error => {
                // error statement
            })
            // Read and return file blob
            // const reader = new FileReader();
        }) 
    }

    // Adds files from a drop event
    addFilesFromDrop(e) {
        // e.preventDefault() will prevent the default action of
        // the browser opening the file 
        e.preventDefault();

        // Return an error if the user has uploaded the max usage limit
        // per capsicum
        if (this.state.files.length + e.dataTransfer.items.length >= 10) {
            this.setState({
                isErrorActive: true,
                errorMsg: "Capsicums have a 10 photo limit!"
            }) 
            return;    
        }

        // Promise array. This will store all the promises which
        // can then be read when they are all resolved
        var ps = [];

        // Iterate over dropped in files and add them to state
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
            var file = e.dataTransfer.items[i].getAsFile();
            console.log("original file", file);
            if (file.type.includes('image')) {
                ps.push(this.fileToBlob(file));        
            } else {
                // If an uploaded file is not an image, issue an error
                this.setState({
                    isErrorActive: true,
                    errorMsg: "Please only upload .png or .jpg image files"
                }) 
                return; 
            }           
            }
        }
        
        // Once all promises have been resolved within the ps array,
        // we can go through them
        Promise.all(ps).then(items => {
            var currentFiles = this.state.files;
            
            // iterate over the file blobs that were obtained from
            // resolving the software
            for (var i = 0; i < items.length; i++) {
                currentFiles.push(items[i]);
            }
        
            // get the 
            if (currentFiles.length === 1) {
                this.setState({
                    files: currentFiles,
                    nextButtonActive: "none",
                    buildCapsicumButtonActive: "block"
                }, () => {
                    console.log(this.state.files)
                    this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
                })   
            } else {
                this.setState({
                    files: currentFiles,
                    nextButtonActive: "block",
                    buildCapsicumButtonActive: "none"
                }, () => {
                    console.log(this.state.files)
                    this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
                })   
            }
        })
    }

    addFilesFromUpload(e) {
        // Return if the user has uploaded the max usage limit
        // per capsicum
        if (this.state.files.length + e.target.files.length >= 10) {
            this.setState({
                isErrorActive: true,
                errorMsg: "Capsicums have a 10 photo limit!"
            }) 
            return;    
        }

        var ps = [];
        // Iterate over dropped in files and add them to state
        for (var i = 0; i < e.target.files.length; i++) {
            // If dropped items aren't files, reject them
            var file = e.target.files[i];
            ps.push(this.fileToBlob(file));              
        }
        
        Promise.all(ps).then(items => {
            var currentFiles = this.state.files;
            console.log(currentFiles)
            for (var i = 0; i < items.length; i++) {
                currentFiles.push(items[i]);
            }

            if (currentFiles.length === 1) {
                this.setState({
                    files: currentFiles,
                    nextButtonActive: "none",
                    buildCapsicumButtonActive: "block"
                }, () => {
                    console.log(this.state.files)
                    this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
                })   
            } else {
                this.setState({
                    files: currentFiles,
                    nextButtonActive: "block",
                    buildCapsicumButtonActive: "none"
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
        if (this.state.files.length === 0) {
            // Empty files array so we should break and display 
            // the appropriate error message
            this.setState({
                isErrorActive: true
            })

            return;
        } else {
            // Set file upload to be none
            this.setState({
                fileUploadActive: "none",
                mediaEditorActive: "flex"
            })
        }
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

        // Particle canvas (for particle previews) setup
        // console.log(this.refs.particlePreview.getContext('2d'))
        // var canvasContext = this.refs.particlePreview.getContext('2d');
        // const particlePreviewImage = new Image();
        // particlePreviewImage.src = collectedData.img;
        // particlePreviewImage.style["objectFit"] = "cover";
        // particlePreviewImage.style.height = 200;
        // particlePreviewImage.style.width = 200;

        // canvasContext.drawImage(particlePreviewImage, 0, 0, particlePreviewImage.style.width, particlePreviewImage.style.height)

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

    // Returns to the previous image and shows relevant data
    previousImage() {
        // Creating and appending collectedData to mediaData array
        var collectedData = {
            name: this.refs.imageName.innerText,
            description: this.state.imageDescription,
            img: this.state.files[this.state.currentFileIdx]
        }

        var currentMediaData = this.state.mediaData;
        currentMediaData.push(collectedData);

        this.setState({
            mediaData: currentMediaData,
        }, () => {
            // For debugging purposes
            console.log(this.state.mediaData);
        })

        // Setting the previous image to display
        var numFiles = this.state.files.length
        // If we are on the second last image, we want to show the
        // build capsicum button not the next button
        if (this.state.currentFileIdx === 0) {
            this.setState({
                imageTitle: "Untitled Image",
                imageDescription: "",
                currentFileIdx: 0,
                nextButtonActive: "none",
                buildCapsicumButtonActive: "none",
                fileUploadActive: "block",
                mediaEditorActive: "none"
            })
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
                capsicumName: this.refs.capsicumName.innerText,
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

                    this.props.history.push("share/" + capsicumID)
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
            <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
               <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "1"}}>
                    <PacmanLoader loading={this.state.loadingStatus} color={"#d01717"} />
                </div> 
                <div
                    onDrop={(e) => this.addFilesFromDrop(e)}
                    onDragOver={(e) => { e.preventDefault();}}
                    onDragEnter={(e) => { e.preventDefault();}}
                    onDragLeave={(e) => { e.preventDefault();}}
                    ref="fileUploadStep" 
                    style={{display: this.state.fileUploadActive, opacity: this.state.pageOpacity}}
                >
                    <h1 className="capsicumName" ref="capsicumName" style={{width: "40vh"}}contentEditable>Untitled Capsicum</h1>
                    <div className="fileInput">
                        <Button className="btn-1" color="primary" size="sm" outline type="button" onClick={() => this.openFileExplorer()}>
                            Upload Files
                            <input type="file" ref="fileBrowser" onChange={(e) => this.addFilesFromUpload(e)} style={{display: "none"}} 
                            accept="image/png, image/gif, image/jpeg" multiple/>
                        </Button>
                    </div>
                    <div>
                        <p ref="filesSelected" className="filesSelected"></p>
                    </div>
                    <div>   
                    <div className="buildCapsicumBtn">
                        <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.completeFileUpload()}>Next</Button>
                    </div> 
                </div>
                </div>
                <div style={{display: this.state.mediaEditorActive, flexDirection: "column", flexWrap: "nowrap", height: "100%", width: "50vh", alignItems: "center"}}>
                    <div style={{flexDirection: "row", alignItems: "center"}}>
                        <img src={this.state.files[this.state.currentFileIdx]} style={{maxWidth: "35vh", maxHeight: "30vh", borderRadius: "10px"}}></img>
                    </div>
                    <div style={{flexDirection: "row", alignItems: "center"}}>
                        <div style={{flexDirection: "row", display: "flex"}}> 
                            <h1 className="capsicumNameMobile" style={{paddingTop: "1vh"}}ref="imageName" style={{textAlign: "center"}}
                            onChange={(e) => {this.setState({imageTitle: e.target.value})}} contentEditable>
                                {this.state.imageTitle} 
                            </h1>
                        </div>
                        <Input ref="imageDescription" type="textarea" style={{width: "50vh", height: "15vh", backgroundColor: "#fafafa", borderRadius: "10px", resize: "none"}}
                            onChange={(e) => {this.setState({imageDescription: e.target.value})}} value= {this.state.imageDescription} placeholder="Tell us something about this photo..."></Input>
                        <div className="buildCapsicumBtn" style={{display: this.state.nextButtonActive}}>
                            <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.nextImage()}>Next</Button>
                        </div> 
                        <div>
                            <div className="buildCapsicumBtn" style={{display: this.state.buildCapsicumButtonActive}}>
                                <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.buildCapsicum()}>Build Capsicum</Button>
                            </div> 
                        </div>
                    </div>  
                </div>
                <div className="errorAlert" style={{bottom: "1vh", position: "absolute"}}>
                    <UncontrolledAlert isOpen={this.state.isErrorActive} color="danger" fade={true} toggle={() => this.setState({isErrorActive: false})}style={{width: "40vh", bottom: "0", position: "absolute", height: "12vh"}}>
                        <span className="alert-inner--text ml-1">
                            {this.state.errorMsg}
                        </span>
                    </UncontrolledAlert>
                </div>
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
             top: "0",
             opacity: 0.3
         }}
     /> 
     </div>
        )
    }
}

export default CapsicumMakerMobile;