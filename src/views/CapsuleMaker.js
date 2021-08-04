import React from 'react';
// import Button from './IndexSections/Buttons.js';
import { Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';

import '../assets/scss/capsule-maker.scss';
import Container from 'reactstrap/lib/Container';

class CapsuleMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount() {
        // For testing purposes
        localStorage.clear();
    }
    
    selectFiles() {
        // this.refs.fileSelector;
    }

    openFileExplorer() {
        this.refs.fileBrowser.checked = true;
    }

    addFiles(e) {
        e.preventDefault();
        console.log(e.dataTransfer.items);

        var currentFiles = this.state.files;
        // Iterate over dropped in files and add them to state
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
              var file = e.dataTransfer.items[i].getAsFile();
              currentFiles.push(file);

              this.setState({
                  files: currentFiles
              })
            }
        }

        this.refs.filesSelected.innerHTML = this.state.files.length + " file(s) uploaded";
    }

    // Build capsicum will send 
    buildCapsicum() {
        // For now, send stuff to local storage
        localStorage.setItem('files', this.state.files);
        window.location = "/capsule-viewer";
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <Container style={{border: "1px solid #707070", width: "100%", height: "80vh", borderRadius: "10px"}} >
                    <div 
                        onDrop={(e) => this.addFiles(e)}
                        onDragOver={(e) => { e.preventDefault();}}
                        onDragEnter={(e) => { e.preventDefault();}}
                        onDragLeave={(e) => { e.preventDefault();}}
                    >
                        <h1 className="capsicumName">Untitled Capsicum</h1>
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
                                <Button className="btn-1 ml-1" color="success" type="button" onClick={() => this.buildCapsicum()}>Build Capsicum</Button>
                        </div>
                    </div>
                </Container> 
            </div>
        )
    }
}

export default CapsuleMaker;