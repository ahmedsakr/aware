import React from 'react';
import '../NavBarLink/NavBarLink.scss';
import './NotificationBell.scss';

type NotificationBellProps = {
    className: string,
    icon: string
};

type NotificationBellState = {
    //socket: SocketIOClient.Socket,    // Need socket to recieve notifications from server
    class: string,
    notificationCount: number
};

export default class NotificationBell extends React.Component<NotificationBellProps, NotificationBellState> {
    constructor(props: NotificationBellProps) {
        super(props);

        this.state = {
            class: 'hide',
            notificationCount: 3
        };
    }

    displayNotifications(): void {
        let value = this.state.class;
        if (value === 'hide') {
            value = 'show';
        } else {
            value = 'hide';
        }


        this.setState({
            class: value,
            notificationCount: this.state.notificationCount + 1
        });
    }

    render(): JSX.Element {
        const { className, icon } = this.props;

        return (
            <div 
                onClick={() => {this.displayNotifications()}}
                className={className + " navigation-menu-link"}>
                
                <span className={icon} aria-hidden="true"></span>
                <span className="badge">{this.state.notificationCount}</span>
                <div id="notification-panel" className={this.state.class}>
                    <Notification
                        name="Josh"
                        content="Preview of last message..."
                        avatar="josh-pic.jpg"/>
                    <Notification
                        name="Mia"
                        content="Preview of last message..."
                        avatar="mia-pic.jpg"/>
                    <Notification
                        name="Ahmed"
                        content="Preview of last message..."
                        avatar="ahmed-pic.jpg"/>
                </div>
            </div>
        );
    }
}

type NotificationProps = {
    name: string,
    content: string,
    avatar: string
};

const Notification: React.FC<NotificationProps> = (props) => {
    return (
        <div className="direct-message">
            <div className="direct-message-avatar col-sm-2">
                <img src={props.avatar} alt={props.name} />
            </div>
            <div className="direct-message-content col-10">
                <p className="col-12">{props.name}</p>
                <p className="direct-message-preview">{props.content}</p>
            </div>
        </div>
    )
}