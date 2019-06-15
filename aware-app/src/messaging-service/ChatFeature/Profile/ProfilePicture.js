import React, { Component } from 'react';
import './ProfilePicture.scss'

class ProfilePicture extends Component {
    render() {
        const instance = "profile-picture-" + this.props.instance + "-size";

        return(
            <div class={"profile-picture-canvas " + instance + " profile-picture-activity-" + this.props.activity}>
                <img alt={this.props.picture} src={process.env.PUBLIC_URL + this.props.picture}/>
            </div>
        );
    }
}

export default ProfilePicture;
