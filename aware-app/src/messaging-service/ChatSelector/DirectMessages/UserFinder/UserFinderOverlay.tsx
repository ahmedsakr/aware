import React from 'react'
import AwareOverlay from '../../../../shared/overlay/AwareOverlay'
import 'bootstrap'

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
            <div className="content-layer">
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
