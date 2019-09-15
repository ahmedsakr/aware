import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Landing.scss'

import Login from './login/Login'
import Register from './register/Register'

import Slider, {Settings}from 'react-slick'
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './LandingSlider.scss'

type LandingProps = {
    loadMessenger: (username: string) => void;
    socket: SocketIOClient.Socket
};

type LandingState = {
    component: string,
    username: string | null
};

export default class Landing extends React.Component<LandingProps, LandingState> {
    constructor(props: LandingProps) {
        super(props)

        this.state = {
            component: "login",
            username: null
        }

        this.setUsername.bind(this);
    }

    componentDidMount(): void {
        if (this.props.socket) {
            this.props.socket.on('login-request', (result: boolean) => {
                if (result) {
                    this.props.loadMessenger(this.state.username as string);
                } else {
                    alert("Invalid username or password.");
                }
            })

            this.props.socket.on('register-request', (result: boolean) => {
                if (result) {
                    alert("Registration successful!");
                    this.switchView();
                } else {
                    alert("Registration failure");
                }
            });
        }
    }

    displayCurrentForm = () => {
        if (this.state.component === "login") {

            return (
                <Login
                    socket={this.props.socket}
                    switch={this.switchView}
                    setUsername={this.setUsername} />
            );

        } else {

            return (
                <Register
                    socket={this.props.socket}
                    switch={this.switchView}
                    setUsername={this.setUsername} />
            );

        }
    }

    switchView = () => {
        let nextForm = this.state.component === "login" ? "register" : "login";
        this.setState({ component: nextForm });
    }

    setUsername = (username: string) => {
        this.setState({
            username: username
        });
    }

    render() {
        return (
            <div className="container-fluid aware-container">
                <div id="landing-canvas">
                    <LandingSlider/>
                    <div id='landing-form' className="col-3 offset-3">
                        {this.displayCurrentForm()}
                    </div>
                </div>
            </div>
        );
    }
}

type LandingSliderProps = {};

const LandingSlider: React.FC<LandingSliderProps> = (props: LandingSliderProps) => {
    let settings: Settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        speed: 1000,
        lazyLoad: 'ondemand'
    };
    return (
        <div>
            <Slider {...settings}>
                <div><img className='slide-item' src={process.env.PUBLIC_URL + "/shrek.jpg"} alt="Shrek" /></div>
                <div><img className='slide-item' src={process.env.PUBLIC_URL + "/test1.jpg"} alt="Image 1" /></div>
                <div><img className='slide-item' src={process.env.PUBLIC_URL + "/test2.jpg"} alt="Image 2" /></div>
                <div><img className='slide-item' src={process.env.PUBLIC_URL + "/test3.jpg"} alt="Image 3" /></div>
                <div><img className='slide-item' src={process.env.PUBLIC_URL + "/test4.jpg"} alt="Image 4" /></div>
            </Slider>
        </div>
    );
}