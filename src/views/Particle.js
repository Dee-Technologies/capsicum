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
            initialY: 0,
            particleOpacity: 0.4
        }

        this.maxSize = 8;
        this.minSize = 3;

        this.maxSpeed = 0.5;
        this.minSpeed = 0.4;
    }

    componentDidMount() {
        const size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
        const initialX = Math.floor(Math.random() * window.innerWidth);
        const initialY = Math.floor(Math.random() * window.innerHeight);
        let speed =  Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed;

        const isNegative = Math.floor(Math.random() * 2);

        if (isNegative === 1) {
            speed = speed * -1
        }

        console.log("Image: " + this.props.image)

        this.setState({
            top: initialY,
            left: initialX,
            initialY: initialY,
            initialX: initialX,
            speed: speed,
            size: size.toString() + "vh"
        }, () => {
            this.motionInterval = setInterval(() => {

                if ((this.state.top > window.innerHeight) || (this.state.left > window.innerWidth)
                || (this.state.top < 0) || (this.state.left < 0)) {
                    // We need to reset particle position
                    const initialX = Math.floor(Math.random() * window.innerWidth);
                    const initialY = Math.floor(Math.random() * window.innerHeight); 

                    this.setState({
                        top: initialY,
                        left: initialX,
                    })
                } else {
                    this.setState({
                        top: this.state.top + this.state.speed,
                        left: this.state.left + this.state.speed,
                    }, () => {   
                        
                    })  
                }
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

    particleEnterHover() {
        console.log("yo")
        this.setState({
            particleOpacity: 1
        })
    }

    particleExitHover() {
        this.setState({
            particleOpacity: 0.4
        })
    }

    render() {
        return (
            <div style={{position: "absolute", top: this.state.top, left: this.state.left, opacity: this.state.particleOpacity}} onClick={() => this.particleClicked()} onMouseEnter={() => this.particleEnterHover()} onMouseLeave={() => this.particleExitHover()}>
                <img alt="" style={{width: this.state.size, height: this.state.size, backgroundSize: "contain", borderRadius: "50%"}} ref="particle" src={this.props.image}/>
            </div>
        )
    }
}

export default Particle;