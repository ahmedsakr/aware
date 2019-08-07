import React, { useState } from 'react'
import AwareOverlay from '../../../shared/overlay/AwareOverlay'
import 'bootstrap'
import './UserFinderOverlay.scss'
import Modal from 'react-bootstrap/Modal'

type UserFinderOverlayProps = {
    socket: SocketIOClient.Socket,
    username: string
};

type RelatedUser = {
    username: string
}

type UserFinderOverlayState = {
    relatedUsers: RelatedUser[] | null,
    messagesFilter: string,
    selectedUser: string | null,
    show: boolean
};

export default class UserFinderOverlay extends React.Component<UserFinderOverlayProps, UserFinderOverlayState> {

    constructor(props: UserFinderOverlayProps) {
        super(props);

        this.state = {
            relatedUsers: null,
            messagesFilter: '',
            selectedUser: null,
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show(): void {
        this.setState({show: true});
    }

    hide(): void {
        this.setState({show: false});
    }

    selectRecord(username: string): void {
        if (this.state.selectedUser === username) {
            this.setState({
                selectedUser: null
            });
        } else {
            this.setState({
                selectedUser: username
            });
        }
    }

    getFilteredRelatedUsers(): RelatedUser[] {
        if (this.state.relatedUsers == null) {
            return [];
        }

        return this.state.relatedUsers.filter(user => user.username.startsWith(this.state.messagesFilter))
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            [event.target.name]: event.target.value
        } as any); 
    }

    componentWillMount(): void {
        if (this.props.socket) {
            this.props.socket.emit('get-related-users', this.props.username);

            this.props.socket.on('get-related-users', (relatedUsers: RelatedUser[]) => {
                this.setState({ relatedUsers: relatedUsers });
            });
        }
    }

    name(): string {
        return "user-finder-overlay"
    }

    title(): string {
        return "Start a direct message"
    }

    content(): JSX.Element {
        let records : JSX.Element[] | JSX.Element | null = null;

        if (this.state.relatedUsers == null || this.getFilteredRelatedUsers().length == 0) {
            records = (
                <div>
                    No students were found in your courses.
                </div>
            );
        } else {
            records = this.getFilteredRelatedUsers()
                .map(user => {
                    return (
                        <UserFinderRecord
                            selectRecord={this.selectRecord.bind(this)}
                            selected={this.state.selectedUser === user.username}
                            name={user.username}
                            avatar={user.username + "-pic.jpg"} />
                    );
                })
        }

        return (
            <div id="user-finder-content">
                <div id="user-finder-filter">
                    <input onChange={this.handleChange} name="messagesFilter" type="textfield" placeholder="John Doe" />
                </div>

                <hr className="user-finder-line-break" />

                <div id="user-finder-records">
                    {records}
                </div>
            </div>
        )
    }

    footer(): JSX.Element {
        let selected : boolean = this.state.selectedUser !== null ? true : false;
        return (
            <div id="footer-layer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Nevermind</button>
                <button
                    id={selected ? "user-finder-go-enabled" : "user-finder-go-disabled"}
                    disabled={!selected}
                    type="button" className="btn btn-primary">
                        Go
                </button>
            </div>
        )
    }

    shouldComponentUpdate(nextProps: UserFinderOverlayProps, nextState: UserFinderOverlayState): boolean{
        return true;
    }

    render(): JSX.Element {
        alert(1);
        return (
            <div className="overlay-container">
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.title()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.content()}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="overlay-footer">
                            {this.footer()}
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

type UserFinderRecordProps = {
    selectRecord: (username: string) => void,
    selected: boolean,
    name: string,
    avatar: string
};

const UserFinderRecord: React.FC<UserFinderRecordProps> = (props) => {

    return (
        <div onClick={() => props.selectRecord(props.name) } className="user-finder-record">
            <div className="user-finder-record-select">
                <span className="fa fa-plus" aria-hidden="true"></span>
            </div>

            <div className="user-finder-record-info">
                <img alt="ahmed" src={process.env.PUBLIC_URL + props.avatar} />
                <div className="user-finder-record-name">
                    {props.name}
                </div>
            </div>

            <div className={props.selected ?
                "user-finder-record-status-selected" :
                "user-finder-record-status-deselected"}>
                <span className="fa fa-check" aria-hidden="true"></span>
            </div>
        </div>
    );
};