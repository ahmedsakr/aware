import React from 'react';
import './ActivityPanel.scss'
import ProfilePicture from '../Profile/ProfilePicture';

type ActivityPanelProps = {
    socket: SocketIOClient.Socket,
    activeRoom: string
};

type ActivityPanelState = {
    activeUsers: [],
    inactiveUsers: []
};

export default class ActivityPanel extends React.Component<ActivityPanelProps, ActivityPanelState> {
    constructor(props: ActivityPanelProps) {
        super(props);

        this.state = {
            activeUsers: []
        }
    }

    componentDidUpdate(prevProps: ActivityPanelProps, prevState: ActivityPanelState): void {
        console.log('socket', this.props.socket)
        if (this.props.socket) {
            this.props.socket.emit('active users', this.props.activeRoom);
            this.props.socket.on('active users', (users: []) => {
                if (this.state.activeUsers !== users) {
                    this.setState({
                        activeUsers: users
                    })
                }
            })
        }
    }


    render(): JSX.Element {
        return (
            <div className="col-sm-12" id="activity-panel">
                {
                    this.state.activeUsers.map((user: any) => {
                        return (
                            <ProfilePicture instance="activity" activity="online" picture={user.username + "-pic.jpg"} />
                        )
                    })
                }
            </div>
        );
    }
}
