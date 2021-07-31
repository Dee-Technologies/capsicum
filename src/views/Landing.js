import React from 'react';
import Hero from './IndexSections/Hero.js';
import LandingNavbar from "components/Navbars/LandingNavbar.js";

class Landing extends React.Component {
    render() {
        return (
            <div>
                <LandingNavbar></LandingNavbar>
                <Hero></Hero>
            </div>
        )
    }
}

export default Landing;