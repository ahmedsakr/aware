import React from 'react';
import './NavBarLink.css';

type NavBarLinkProps = {
    className: string,
    icon: string,
    name: string
};

type NavBarLinkState = {};

export default class NavBarLink extends React.Component<NavBarLinkProps, NavBarLinkState> {
    render(): JSX.Element {
        const { className, icon, name } = this.props;

        return (
            <div className={className + " navigation-menu-link"}>
                <span className={icon} aria-hidden="true"></span>
                <p>{name}</p>
            </div>
        );
    }
}

type NavBarLogoProps = {
    className: string
};

type NavBarLogoState = {};

export class NavBarLogo extends React.Component<NavBarLogoProps, NavBarLogoState> {
    render(): JSX.Element {
        const { className } = this.props;

        return (
            <div className={className + " navigation-menu-logo"}>
                <p>AWARE</p>
            </div>
        );
    }
}

type NavBarTitleProps = {
    className: string,
    title: string
};

type NavBarTitleState = {};

export class NavBarTitle extends React.Component<NavBarTitleProps, NavBarTitleState> {
    render(): JSX.Element {

        const { className, title } = this.props;

        return (
            <div className={className + " navigation-menu-title"}>
                <p>{title}</p>
            </div>
        );
    }
}
