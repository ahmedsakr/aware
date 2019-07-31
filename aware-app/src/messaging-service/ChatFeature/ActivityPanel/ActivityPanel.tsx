import React from 'react';
import './ActivityPanel.scss'
import ProfilePicture from '../Profile/ProfilePicture';

type ActivityPanelProps = { 
    socket: SocketIOClient.Socket,
    activeRoom: string
};

type ActivityPanelState = { 
    activeUsers: String
};

export default class ActivityPanel extends React.Component<ActivityPanelProps, ActivityPanelState> {

    componentDidUpdate(prevProps: ActivityPanelProps, prevState: ActivityPanelState): void {
        console.log('socket', this.props.socket)
        if (this.props.socket) {
            this.props.socket.emit('active users');
            this.props.socket.on('active users', (users: String) => {
                console.log('Active Users: ', users)
            })
        }
    }


    render(): JSX.Element {
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
