import React from 'react'
import AwareOverlay from '../AwareOverlay'
import 'bootstrap'
import './NewsletterOverlay.scss'

type NewsletterOverlayProps = {};

type NewsletterOverlayState = {};

export default class NewsletterOverlay extends React.Component<NewsletterOverlayProps, NewsletterOverlayState> {

    name(): string {
        return "newsletter-overlay"
    }

    title(): string {
        return "Subscribe to our Newsletter"
    }

    content(): JSX.Element {
        return (
            <div className="content-layer">
                <div id="subscribe-blurb">
                    Once you are subscribed to the Aware newsletter, you will receive weekly e-mails
                    on the latest development updates we are pushing to Aware. We are actively working
                    on enhancing the product that you love.
                </div>

                <div id="developer-pictures">
                    <div className="developer">
                        <p>Ahmed Sakr</p>
                        <img alt="ahmed" src={process.env.PUBLIC_URL + "/ahmed-pic.jpg"} />
                    </div>

                    <div className="developer">
                        <p>Josh Campitelli</p>
                        <img alt="josh" src={process.env.PUBLIC_URL + "/josh-pic.jpg"} />
                    </div>
                </div>

                <div id="subscribe-data">
                    <p>You can unsubscribe at any time!</p>
                    <input type="email" className="form-control" placeholder="john@example.com" />
                </div>
            </div>
        )
    }

    footer(): JSX.Element {
        return (
            <div id="footer-layer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">I've changed my mind</button>
                <button type="button" className="btn btn-primary">Subscribe</button>
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
