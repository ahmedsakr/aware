import React, {Component} from 'react'
import AwareOverlay from '../AwareOverlay'
import 'bootstrap'
import './NewsletterOverlay.css'

class NewsletterOverlay extends Component {
    
    render() {
        return (
            <AwareOverlay
                name={this.name()}
                title={this.title()}
                content={this.content()}
                footer={this.footer()}
            />
        )
    }

    name() {
        return "newsletter-overlay"
    }

    title() {
        return "Subscribe to our Newsletter"
    }

    content() {
        return (
            <div class="content-layer">
                <div id="subscribe-blurb">
                    Once you are subscribed to the Aware newsletter, you will receive weekly e-mails
                    on the latest development updates we are pushing to Aware. We are actively working
                    on enhancing the product that you love.
                </div>
                
                <div id="developer-pictures">
                    <div class="developer">
                        <p>Ahmed Sakr</p>
                        <img alt="ahmed" src={process.env.PUBLIC_URL + "/ahmed-pic.jpg"} />
                    </div>

                    <div class="developer">
                        <p>Josh Campitelli</p>
                        <img alt="josh" src={process.env.PUBLIC_URL + "/josh-pic.jpg"} />
                    </div>
                </div>

                <div id="subscribe-data">
                    <p>You can unsubscribe at any time!</p>
                    <input type="email" class="form-control" placeholder="john@example.com"/>
                </div>
            </div>
        )
    }

    footer() {
        return (
            <div id="footer-layer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">I've changed my mind</button>
                <button type="button" class="btn btn-primary">Subscribe</button>
            </div>
        )
    }
}

export default NewsletterOverlay;