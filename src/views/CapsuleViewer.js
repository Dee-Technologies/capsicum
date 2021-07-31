import React from 'react';
// import Button from './IndexSections/Buttons.js';
import { Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';

import '../assets/scss/capsule-viewer.scss';
import Container from 'reactstrap/lib/Container';

class CapsuleViewer extends React.Component {
    render() {
        return (
            <div>
                <Container>
                <div class="capsicumPosition">
                    <div class="bg flex">
                        <div class="c"></div>   
                    </div>
                </div>
                <br></br>
                <h1 className="capsicumName">MFHS Graduation 2020</h1>
                <p className="tapToExpand">Tap to expand</p>
                </Container> 
            </div>
        )
    }
}

export default CapsuleViewer;