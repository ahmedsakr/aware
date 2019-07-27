import React from 'react'
import AwareOverlay from '../../../shared/overlay/AwareOverlay'
import 'bootstrap'
import './UserFinderOverlay.scss'

type UserFinderOverlayProps = {};

type UserFinderOverlayState = {
    selected: boolean
};

export default class UserFinderOverlay extends React.Component<UserFinderOverlayProps, UserFinderOverlayState> {

    constructor(props: UserFinderOverlayProps) {
        super(props);

        this.state = {
            selected: false
        };
    }

    name(): string {
        return "user-finder-overlay"
    }

    title(): string {
        return "Start a direct message"
    }

    content(): JSX.Element {

        return (
            <div id="user-finder-content">
                <div id="user-finder-filter">
                    <input type="textfield" placeholder="John Doe" />
                </div>

                <hr className="user-finder-line-break" />

                <div id="user-finder-records">
                    <UserFinderRecord
                        name="Ahmed Sakr"
                        avatar="ahmed-pic.jpg"
                        selected={true}/>
                    <UserFinderRecord
                        name="Josh Campitelli"
                        avatar="josh-pic.jpg"
                        selected={false}/>
                    <UserFinderRecord
                        name="Ahmed Sakr"
                        avatar="ahmed-pic.jpg"
                        selected={false}/>
                    <UserFinderRecord
                        name="Josh Campitelli"
                        avatar="josh-pic.jpg"
                        selected={false}/>
                    <UserFinderRecord
                        name="Ahmed Sakr"
                        avatar="ahmed-pic.jpg"
                        selected={false}/>
                </div>
            </div>
        )
    }

    footer(): JSX.Element {
        return (
            <div id="footer-layer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Nevermind</button>
                <button type="button" className="btn btn-primary">Go</button>
            </div>
        )
    }

    render(): JSX.Element {
        return (
            <AwareOverlay
                name={this.name()}
                title={this.title()}
                content={this.content()}
                footer={this.footer()}
            />
        )
    }
}

type UserFinderRecordProps = {
    name: string,
    avatar: string,
    selected: boolean
};

type UserFinderRecordState = {};
class UserFinderRecord extends React.Component<UserFinderRecordProps, UserFinderRecordState> {

    render(): JSX.Element {
        return (
            <div className="user-finder-record">
                <div className="user-finder-record-select">
                    <span className="fa fa-plus" aria-hidden="true"></span>
                </div>

                <div className="user-finder-record-info">
                    <img alt="ahmed" src={process.env.PUBLIC_URL + this.props.avatar} />
                    <div className="user-finder-record-name">
                        {this.props.name}
                    </div>
                </div>

                <div className={this.props.selected ?
                    "user-finder-record-status-selected" :
                    "user-finder-record-status-deselected"}>
                    <span className="fa fa-check" aria-hidden="true"></span>
                </div>
            </div>
        )
    }
}