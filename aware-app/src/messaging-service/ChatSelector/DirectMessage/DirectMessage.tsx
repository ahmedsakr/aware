import React from 'react';
import './DirectMessage.css';

type DirectMessageProps = {
    src: string,
    name: string
};

type DirectMessageState = {};

export default class DirectMessage extends React.Component<DirectMessageProps, DirectMessageState> {
    render(): JSX.Element {
        const { src, name } = this.props;
        return (
            <div className="col-12 direct-message">
                <div className="direct-message-avatar col-2">
                    <img src={process.env.PUBLIC_URL + src} alt={name} />
                </div>

                <div className="direct-message-content col-10">
                    <p className="col-12">{name}</p>
                    <p className="direct-message-preview">Preview of last message...</p>
                </div>
            </div>
        );
    }
}
