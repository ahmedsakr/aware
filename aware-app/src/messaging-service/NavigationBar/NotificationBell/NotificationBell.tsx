import React from 'react';
import '../NavBarLink/NavBarLink.scss';
import './NotificationBell.scss';

type NotificationBellProps = {
    className: string,
    icon: string
};

type NotificationBellState = {
    //socket: SocketIOClient.Socket,    // Need socket to recieve notifications from server
    class: string
};

export default class NotificationBell extends React.Component<NotificationBellProps, NotificationBellState> {
    constructor(props: NotificationBellProps) {
        super(props);

        this.state = {
            class: 'hide'
        };
    }

    displayNotifications(): void {
        let value = this.state.class;
        if (value === 'hide') value = 'show';
        else value = 'hide';
        this.setState({
            class: value
        });
    }

    render(): JSX.Element {
        const { className, icon } = this.props;

        return (
            <div 
                onClick={() => {this.displayNotifications()}}
                className={className + " navigation-menu-link"}>
                
                <span className={icon} aria-hidden="true"></span>
                <span className="badge">3</span>
                <div id="notification-panel" className={this.state.class}></div>
            </div>
        );
    }
}