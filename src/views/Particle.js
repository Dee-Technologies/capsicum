import React from 'react';
import iconLogo from "assets/capsicumlogo.svg";

class Particle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0.5,
            top: 50,
            left: 50,
            size: 1,
            initialX: 0,
            initialY: 0
        }

        this.maxSize = 8;
        this.minSize = 1;

        this.maxSpeed = 1;
    }

    componentDidMount() {
        const size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
        const initialX = Math.floor(Math.random() * window.innerWidth);
        const initialY = Math.floor(Math.random() * window.innerHeight);
        const speed = Math.random() * this.maxSpeed;

        this.setState({
            top: initialY,
            left: initialX,
            initialY: initialY,
            initialX: initialX,
            speed: speed,
            size: size.toString() + "vh"
        }, () => {
            this.motionInterval = setInterval(() => {
                this.setState({
                    top: this.state.top + this.state.speed,
                    left: this.state.left + this.state.speed,
                }, () => {   
                    console.log(this.state.top, this.state.left)
                })
            }, 10);
        })
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
                <img alt="" style={{width: this.state.size}} ref="particle" src={iconLogo}/>
            </div>
        )
    }
}

export default Particle;