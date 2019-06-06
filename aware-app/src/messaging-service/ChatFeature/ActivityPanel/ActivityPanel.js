import React, { Component } from 'react';
import './ActivityPanel.css'
import ProfilePicture from '../Profile/ProfilePicture';

class ActivityPanel extends Component {

    render() {
        return(
            <div class="col-sm-12" id="activity-panel">
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

export default ActivityPanel;
