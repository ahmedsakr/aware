import React from 'react'
import 'bootstrap'
import './AwareOverlay.scss'
import Modal from 'react-bootstrap/Modal'

type AwareOverlayProps = {
    name: string,
    title: string,
    content: JSX.Element,
    footer: JSX.Element
};

type AwareOverlayState = {
    show: boolean
};

export default class AwareOverlay extends React.Component<AwareOverlayProps, AwareOverlayState> {
    
    constructor(props: AwareOverlayProps) {
        super(props);

        this.state = {
            show: false
        };
    }

    show() : void {
        this.setState({show: true});
    }

    hide(): void {
        this.setState({show: false});
    }

    render(): JSX.Element {
        const { name, title, content, footer } = this.props;
        
        return (
            <div className="overlay-container">
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {content}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="overlay-footer">
                            {footer}
                        </div>                 
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
