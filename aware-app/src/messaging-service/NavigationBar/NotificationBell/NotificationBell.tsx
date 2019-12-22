import React from 'react';
import '../NavBarLink/NavBarLink.scss';

type NotificationBellProps = {
    className: string,
    icon: string
};

type NotificationBellState = {};

export default class NotificationBell extends React.Component<NotificationBellProps, NotificationBellState> {
    render(): JSX.Element {
        const { className, icon } = this.props;

        return (
            <div 
                onClick={() => {alert('Hello')}}
                className={className + " navigation-menu-link"}>
                    
                
                <span className={icon} aria-hidden="true"></span>
                <span className="badge">3</span>
            </div>
        );
    }
}