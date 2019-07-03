import React from 'react';
import './ProfilePicture.scss'

type ProfilePictureProps = {
    picture: string,
    activity: string,
    instance: string
};

type ProfilePictureState = { };

export default class ProfilePicture extends React.Component<ProfilePictureProps, ProfilePictureState> {
    render(): JSX.Element {
        const instance = "profile-picture-" + this.props.instance + "-size";

        return(
            <div className={"profile-picture-canvas " + instance + " profile-picture-activity-" + this.props.activity}>
                <img alt={this.props.picture} src={process.env.PUBLIC_URL + this.props.picture}/>
            </div>
        );
    }
}
