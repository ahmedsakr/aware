import React from 'react';
import './ActivityPanel.css'
import ProfilePicture from '../Profile/ProfilePicture';

type ActivityPanelProps = { };
type ActivityPanelState = { };

export default class ActivityPanel extends React.Component<ActivityPanelProps, ActivityPanelState> {

    render() {
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
    }
}