import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Landing.scss'

import Login from './login/Login'
import Register from './register/Register'
import Swiper from 'swiper';
import './LandingSlider.scss'
import '../../node_modules/swiper/dist/css/swiper.css'

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
            <div id="test" className="simple-slider login-clean">
                { this.displayCurrentForm() }
                <LandingSlider />
            </div>
        );
    }
}

type SimpleSliderProps = {};

const LandingSlider: React.FC<SimpleSliderProps> = (props: SimpleSliderProps) => {
    return (
        <div id="test-slider" className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide" id="slide-1"></div>
                <div className="swiper-slide" id="slide-2"></div>
                <div className="swiper-slide" id="slide-3"></div>
            </div>
        </div>
    );
}

window.onload = function () {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: true
    });
}