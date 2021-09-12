import React from 'react';
import iconLogo from "assets/capsicumlogo.svg";

class Particle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0.5,
            top: 50,
            left: 50,
            size: 1
        }

        this.maxSize = 15;
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                top: this.state.top + this.state.speed,
                left: this.state.left + this.state.speed
            }, () => {   
                console.log(this.state.top, this.state.left)
            })
        }, 10);
    }

    // moveParticle() {
    //     this.setState({
    //         top: this.state.top + this.state.speed,
    //         bottom: this.state.bottom + this.state.speed
    //     })
    // }
    
    particleClicked() {
        console.log("you")
    }
    render() {
        return (
            <div style={{position: "absolute", top: this.state.top, left: this.state.left}} onClick={this.particleClicked}>
                <img alt="" style={{width: "10vh"}} ref="particle" src={iconLogo}/>
            </div>
        )
    }
}

export default Particle;