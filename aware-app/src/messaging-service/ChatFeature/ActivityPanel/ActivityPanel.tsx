import React from 'react';
import './ActivityPanel.scss'
import ProfilePicture from '../Profile/ProfilePicture';
import { Status, UserStatus } from '../../api/Messaging';

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

    //Should Update when user switches room, also if emit happends and active users change
    shouldComponentUpdate(nextProps: ActivityPanelProps, nextState: ActivityPanelState): boolean {
        return (this.state.activityPanelUsers !== nextState.activityPanelUsers) ||
            (this.props.activeRoom !== nextProps.activeRoom);
    }

    /**
     * Map is being called twice here to ensure the active users always appear first in the Activity Panel
     */
    render(): JSX.Element {
        return (
            <div className="col-sm-12" id="activity-panel">
                {
                    this.state.activityPanelUsers.filter((user:UserStatus) => user.status === Status.ONLINE).map((user:UserStatus) => {
                        return (
                            <ProfilePicture instance="activity" activity='online' picture={user.username + "-pic.jpg"} />
                        )
                    })
                }
                {
                    this.state.activityPanelUsers.filter((user:UserStatus) => user.status === Status.OFFLINE).map((user:UserStatus) => {
                        return (
                            <ProfilePicture instance="activity" activity='offline' picture={user.username + "-pic.jpg"} />
                        )
                    })
                }
            </div>
        );
    }
}
