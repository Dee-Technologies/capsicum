import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import '../assets/scss/capsule-viewer.scss';

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
            particleOpacity: 0.4,
            isParticleOpen: false,
            particleColor: "#FFF"
        }

        this.maxSize = 3;
        this.minSize = 2;

        this.maxSpeed = 0.008;
        this.minSpeed = 0.003;

        this.validColors = ["#FFF587", "#FF8C64", "#FF665A", "#7D6B7D", "#A3A1A8"]
    }

    componentDidMount() {
        const size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
        const initialX = Math.floor(Math.random() * window.innerWidth);
        const initialY = Math.floor(Math.random() * window.innerHeight);
        const particleColor = this.validColors[Math.floor(Math.random() * this.validColors.length)];
        let speedX =  Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed;
        let speedY =  Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed;

        const isNegative = Math.floor(Math.random() * 2);

        if (isNegative === 1) {
            speedX = speedX * -1;
            speedY = speedY * -1;
        }

        console.log("Image: " + this.props.image)

        this.setState({
            top: initialY,
            left: initialX,
            initialY: initialY,
            initialX: initialX,
            speedX: speedX,
            speedY: speedY,
            particleColor: particleColor,
            size: size.toString() + "vh"
        }, () => {
            this.motionInterval = setInterval(() => {

                if (((this.state.top > window.innerHeight) && (this.state.left > window.innerWidth))
                    || ((this.state.top < 0) && (this.state.left < 0))) {
                    // We need to reset particle position
                    const initialX = Math.floor(Math.random() * window.innerWidth);
                    
                    if (this.state.speedY < 0) {
                        this.setState({
                            top: window.innerHeight + 50,
                            left: initialX,
                        })   
                    } else {
                        this.setState({
                            top: -50,
                            left: initialX,
                        })
                    }
                } else {
                    this.setState({
                        top: this.state.top + this.state.speedX,
                        left: this.state.left + this.state.speedY,
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
    
    render() {
        return (
            <div>
                <div style={{position: "absolute", top: this.state.top, left: this.state.left, opacity: this.state.particleOpacity}}>
                    <div alt="" className="particle" style={{width: this.state.size, height: this.state.size, borderRadius: "50%", borderColor: this.state.particleColor, backgroundColor: this.state.particleColor}} ref="particle" />
                </div>
            </div>
        )
    }
}

export default Particle;