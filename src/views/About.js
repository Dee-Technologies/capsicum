import React from 'react';
import Hero from './IndexSections/Hero.js';
import LandingNavbar from "components/Navbars/LandingNavbar.js";

class About extends React.Component {
    render() {
        return (
            <div>
                <LandingNavbar></LandingNavbar>
                <h1>Capsicum</h1>
            </div>
        )
    }
}

export default About;