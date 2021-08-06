import React from 'react';
// import Button from './IndexSections/Buttons.js';
import { Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Particles from 'react-tsparticles';

import '../assets/scss/capsule-maker.scss';
import Container from 'reactstrap/lib/Container';

class CapsuleMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [], // Array storing all the user input files
            fileUploadActive: "block", // The css display status for the file upload section
            currentFileIdx: 0, // Stores the index of the current file being observed in the builder
            mediaData: [], // Stores the media data per object,
            mediaEditorActive: "none" // The css display status for the media editor section
        }
    }

    componentDidMount() {
        // For testing purposes
        localStorage.clear();
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
            this.setState({
                files: items
            }, () => {
                console.log(this.state.files)
                this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
            })
        })
    }

    // Build capsicum will send 
    buildCapsicum() {
        // For now, send stuff to local storage
        localStorage.setItem('files', this.state.files);
        window.location = "/capsule-viewer";
    }

    // Verifies and completes the file upload step.
    // Will then allow user to proceed to adding title and descriptions
    // for each image
    completeFileUpload() {
        // Set file upload to be none
        this.setState({
            fileUploadActive: "none",
            mediaEditorActive: "block"
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <Container style={{border: "1px solid #707070", width: "100%", height: "80vh", borderRadius: "10px", backgroundColor: "#fafafa"}} >
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
                    
                    <div style={{display: this.state.mediaEditorActive}}>
                        <img src={this.state.files[this.state.currentFileIdx]}></img>
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
                        top: "0"
                    }}
                    /> 
                </Container> 
            </div>
        )
    }
}

export default CapsuleMaker;