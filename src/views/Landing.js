import React from 'react';
import Hero from './IndexSections/Hero.js';
import LandingNavbar from "components/Navbars/LandingNavbar.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../assets/scss/landing.scss';

import uploadVideo from "assets/uploadClip.mov";
import descriptionVideo from "assets/descriptionVideo.mov";
import immersiveVideo from "assets/immersiveClip.mov";

class Landing extends React.Component {
    render() {
        return (
            <div>
                <LandingNavbar></LandingNavbar>
                <Hero></Hero>
                <br></br>
                <div>
                    <Carousel>
                        <div>
                            <div style={{backgroundColor: "#ffd7b3", width: "100%", height: "50vh", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div style={{flexDirection: "column", display: "flex", marginRight: "5vh"}}>
                                    <h1>Upload your photos</h1>
                                </div>
                                <div style={{flexDirection: "column", display: "flex"}}>
                                    <div style={{width: "90vh", borderRadius: "10px"}}>
                                        <video style={{width: "75vh", borderRadius: "10px"}} src={uploadVideo} loop autoPlay muted></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{backgroundColor: "#ffd7b3", width: "100%", height: "50vh", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div style={{flexDirection: "column", display: "flex", marginRight: "5vh"}}>
                                    <h1>Add Descriptions</h1>
                                </div>
                                <div style={{flexDirection: "column", display: "flex"}}>
                                    <div style={{width: "90vh", borderRadius: "10px"}}>
                                        <video style={{width: "75vh", borderRadius: "10px"}} src={descriptionVideo} loop autoPlay muted></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{backgroundColor: "#ffd7b3", width: "100%", height: "50vh", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div style={{flexDirection: "column", display: "flex", marginRight: "5vh"}}>
                                    <h1>Share with friends and family</h1>
                                </div>
                                <div style={{flexDirection: "column", display: "flex"}}>
                                    <div style={{width: "90vh", borderRadius: "10px"}}>
                                        <video style={{width: "75vh", borderRadius: "10px"}} src={immersiveVideo} loop autoPlay muted></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default Landing;