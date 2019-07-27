import React from 'react'
import AwareOverlay from '../../../shared/overlay/AwareOverlay'
import 'bootstrap'
import './UserFinderOverlay.scss'

type UserFinderOverlayProps = {};

type UserFinderOverlayState = {};

export default class UserFinderOverlay extends React.Component<UserFinderOverlayProps, UserFinderOverlayState> {

    name(): string {
        return "user-finder-overlay"
    }

    title(): string {
        return "Start a direct message"
    }

    content(): JSX.Element {
        return (
            <div id="user-finder-content">
                <div>
                    <input id="user-finder-filter" type="textfield" placeholder="John Doe" />
                </div>

                <hr className="user-finder-line-break" />

                <div className="user-finder-record">
                    <div className="user-finder-record-select">
                        <span className="fa fa-plus" aria-hidden="true"></span>
                    </div>

                    <div className="user-finder-record-info">
                        <img alt="ahmed" src={process.env.PUBLIC_URL + "/ahmed-pic.jpg"} />
                        <div className="user-finder-record-name">
                            Ahmed Sakr
                        </div>
                    </div>
                </div>
                <div className="user-finder-record">
                    <div className="user-finder-record-select">
                        <span className="fa fa-plus" aria-hidden="true"></span>
                    </div>

                    <div className="user-finder-record-info">
                        <img alt="josh" src={process.env.PUBLIC_URL + "/josh-pic.jpg"} />
                        <div className="user-finder-record-name">
                            Josh Campitelli
                        </div>
                    </div>
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
