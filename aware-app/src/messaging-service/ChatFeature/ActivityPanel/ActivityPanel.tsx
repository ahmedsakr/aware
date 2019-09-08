import React from 'react';
import './ActivityPanel.scss'
import ProfilePicture from '../Profile/ProfilePicture';

type ActivityPanelProps = {
    active: boolean
};
type ActivityPanelState = { };

export default class ActivityPanel extends React.Component<ActivityPanelProps, ActivityPanelState> {

    render(): JSX.Element {
        if (this.props.active) {
            return(
                <div className="col-sm-12" id="activity-panel">
                    <ProfilePicture instance="activity" activity="online"  picture="ahmed-pic.jpg"/>
                    <ProfilePicture instance="activity" activity="online" picture="josh-pic.jpg"/>
                    <ProfilePicture instance="activity" activity="online" picture="louis-ck-pic.JPG"/>
                    <ProfilePicture instance="activity" activity="online" picture="mia-khalifa-pic.jpg"/>
                    <ProfilePicture instance="activity" activity="offline" picture="bill-gates-pic.jpg"/>
                    <ProfilePicture instance="activity" activity="offline" picture="megan-fox-pic.jpg"/>
                </div>
            );
        } else {
            return (
                <>
                </>
            )
        }
    }
}
