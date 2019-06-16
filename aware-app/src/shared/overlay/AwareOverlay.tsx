import React from 'react'
import 'bootstrap'
import './AwareOverlay.css'

type AwareOverlayProps = {
    debug: boolean,
    name: string,
    title: string,
    content: JSX.Element,
    footer: JSX.Element
};

type AwareOverlayState = {};

export default class AwareOverlay extends React.Component<AwareOverlayProps, AwareOverlayState> {

    render(): JSX.Element {
        const { name, title, content, footer } = this.props;

        return (
            <div className="overlay-container">
                <div className="modal fade" id={name} role="dialog" aria-labelledby={name + "Label"} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title">{title}</div>
                                <button type="button" className="close" id="custom-overlay-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {content}
                            </div>
                            <div className="modal-footer">
                                <div className="overlay-footer">
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
