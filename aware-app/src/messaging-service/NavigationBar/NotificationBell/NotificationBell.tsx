import React from 'react';
import '../NavBarLink/NavBarLink.scss';

type NotificationBellProps = {
    className: string,
    icon: string,
    name: string
};

type NotificationBellState = {};

export default class NotificationBell extends React.Component<NotificationBellProps, NotificationBellState> {
    render(): JSX.Element {
        const { className, icon, name } = this.props;

        return (
            <div 
                onClick={() => {alert('Hello')}}
                className={className + " navigation-menu-link"}>
                    
                
                <span className={icon} aria-hidden="true"></span>
                <p>{name}</p>
            </div>
        );
    }
}