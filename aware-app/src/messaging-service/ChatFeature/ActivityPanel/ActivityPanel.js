import React, { Component } from 'react';
import './ActivityPanel.css'
import ProfilePicture from '../Profile/ProfilePicture';

class ActivityPanel extends Component {

    render() {
        return(
            <div class="col-sm-12" id="activity-panel">
                <ProfilePicture activity="online"  picture="ahmed-pic.jpg"/>
                <ProfilePicture activity="online" picture="josh-pic.jpg"/>
                <ProfilePicture activity="online" picture="arsalan-pic.jpg"/>
                <ProfilePicture activity="online" picture="louis-ck-pic.JPG"/>
                <ProfilePicture activity="online" picture="mia-khalifa-pic.jpg"/>
                <ProfilePicture activity="offline" picture="bill-gates-pic.jpg"/>
                <ProfilePicture activity="offline" picture="megan-fox-pic.jpg"/>
            </div>
        );
    }
}

export default ActivityPanel;
