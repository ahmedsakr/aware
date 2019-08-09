import React from 'react';
import './ActivityPanel.scss'
import ProfilePicture from '../Profile/ProfilePicture';

type ActivityPanelProps = {
    socket: SocketIOClient.Socket,
    activeRoom: string
};

type ActivityPanelState = {
    activityPanelUsers: []
};

export default class ActivityPanel extends React.Component<ActivityPanelProps, ActivityPanelState> {
    constructor(props: ActivityPanelProps) {
        super(props);

        this.state = {
            activityPanelUsers: []
        }
    }

    componentWillMount() {
        if (this.props.socket) {
            this.props.socket.on('active users', (users: []) => {
                this.setState({
                    activityPanelUsers: users
                })
            })
        }
    }

    componentDidUpdate() {
        if (this.props.socket) {
            this.props.socket.emit('active users', this.props.activeRoom);
        }
    }

    shouldComponentUpdate(nextProps: ActivityPanelProps, nextState: ActivityPanelState): boolean {
        return this.props.activeRoom !== nextProps.activeRoom;
    }

    render(): JSX.Element {
        return (
            <div className="col-sm-12" id="activity-panel">
                {
                    this.state.activityPanelUsers.map((user: any) => {
                        return (
                            <ProfilePicture instance="activity" activity="online" picture={user.username + "-pic.jpg"} />
                        )
                    })
                }
            </div>
        );
    }
}
