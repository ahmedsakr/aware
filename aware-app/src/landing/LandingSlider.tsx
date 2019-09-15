import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './LandingSlider.scss'

import Slider, {Settings}from 'react-slick'
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type LandingSliderProps = {};
type LandingSliderState = {};

export default class LandingSlider extends React.Component<LandingSliderProps, LandingSliderState>{
    render(): JSX.Element {
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
}
