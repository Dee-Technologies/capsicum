import React from 'react';
import { Modal } from 'reactstrap';
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
            isParticleOpen: false
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
    
    particleClicked() {
        this.setState({
            isParticleOpen: true
        })
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
            <div>
                <div style={{position: "absolute", top: this.state.top, left: this.state.left, opacity: this.state.particleOpacity}} onClick={() => this.particleClicked()} onMouseEnter={() => this.particleEnterHover()} onMouseLeave={() => this.particleExitHover()}>
                    <img alt="" className="particle" style={{width: this.state.size, height: this.state.size, backgroundSize: "contain", borderRadius: "50%"}} ref="particle" src={this.props.image.src}/>
                </div>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)"}}>
                    <Modal isOpen={this.state.isParticleOpen} toggle={() => this.setState({isParticleOpen: false})}  style={{width: "100%", height: "60vh"}} size={"lg"} centered={true}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <img alt="" src={this.props.image.src} style={{maxWidth: "100vh", maxHeight: "90vh", borderRadius: "10px"}}></img>
                            </div>
                            <div style={{padding: "5vh"}}>
                                <h1 className="imageName">{this.props.image.name}</h1>
                                <br></br>
                                <p className="imageDescription">{this.props.image.description}</p>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Particle;