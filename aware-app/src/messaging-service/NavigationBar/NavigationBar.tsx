import React from 'react';
import './NavigationBar.scss';

type NavBarProps = {};
type NavBarState = {};

export default class NavigationBar extends React.Component<NavBarProps, NavBarState> {    
    render(): JSX.Element {
        return (
            <div className="border-danger d-flex border-bottom align-items-center" id="navigation-bar">
                <div className="d-flex flex-grow-1 justify-content-center" id="navigation-logo">
                    <h1 id="navbar-logo">AWARE</h1>
                </div>
                <nav
                    className="navbar navbar-light navbar-expand-md flex-grow-1 navigation-clean-button"
                    id="messenger-navbar">
    
                    <div className="container-fluid" id="navbar-container">
                        <button data-toggle="collapse" className="navbar-toggler" data-target="#aware-navigation-bar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="aware-navigation-bar">
                            <ul className="nav navbar-nav">
                                <NavigationLink
                                    linkName="Home"
                                    active={false} />
                                <NavigationLink
                                    linkName="Messenger"
                                    active={true} />
                                <NavigationLink
                                    linkName="Forums"
                                    active={false}/>
                                <NavigationLink
                                    linkName="Settings"
                                    active={false} />
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


type NavigationLinkProps = {
    linkName: string,
    active: boolean
};

const NavigationLink: React.FC<NavigationLinkProps> = (props: NavigationLinkProps) => {
    return (
        <li
            className="nav-item border rounded border-danger my-2 mx-0 mx-md-2"
            role="presentation">
            <a
                className={props.active ? "nav-link nav-link-hover navbar-link-active" : "nav-link nav-link-hover"}
                href="#">{props.linkName}</a>
        </li>
    )
}