import React, { Component } from 'react';
import './ProfilePicture.css'

class ProfilePicture extends Component {

    render() {
        return(
            <div class={"profile-picture-canvas profile-picture-activity-" + this.props.activity}>
                <img alt={this.props.picture} src={process.env.PUBLIC_URL + this.props.picture}/>
            </div>
        );
    }
}

export default ProfilePicture;
