import React from 'react';
import Particle from './Particle';

// Returns a particle with given properties
const DecorativeParticle = () => {
    return (
        <div>
            <div 
            style={{width: "5vh", height: "5vh", backgroundColor: "#000", borderRadius: "50%"}}>
            </div>
        </div>
    )
}

class Quanta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            numParticles: 0
        }
    }

    // Returns a particle with given properties
    ImageParticle() {
        const selectedImage = Math.floor(Math.random() * this.state.images.length);
        return (
            <div>
                <img alt="" src={selectedImage}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Particle></Particle>
                {/* <DecorativeParticle/> */}
            </div>
        )
    }
}

export default Quanta