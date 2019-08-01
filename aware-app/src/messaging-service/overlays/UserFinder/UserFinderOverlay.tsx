import React from 'react'
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
    selectedUser: UserFinderRecord | null,
    overlay: AwareOverlay
};

export default class UserFinderOverlay extends React.Component<UserFinderOverlayProps, UserFinderOverlayState> {

    constructor(props: UserFinderOverlayProps) {
        super(props);

        this.state = {
            relatedUsers: null,
            messagesFilter: '',
            selectedUser: null,
            overlay: <AwareOverlay
            name={this.name()}
            title={this.title()}
            content={this.content()}
            footer={this.footer()} />
        };

        this.handleChange = this.handleChange.bind(this);
    }

    show(): void {
        this.state.overlay.show();
    }

    selectUser(user: UserFinderRecord): void {
        if (user.state.selected) {
            user.setState({selected: false});
            this.setState({selectedUser: null});
        } else {

            if (this.state.selectedUser !== null) {
                this.state.selectedUser.setState({selected: false});
            }

            user.setState({selected: true});
            this.setState({selectedUser: user});
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
                            selectUser={this.selectUser.bind(this)}
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

    render(): JSX.Element {
        const {show, useState} = useState(false);

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

type UserFinderRecordProps = {
    selectUser: (user: UserFinderRecord) => void,
    name: string,
    avatar: string
};

type UserFinderRecordState = {
    selected: boolean
};

const UserFinderRecord: React.FC<UserFinderRecordProps>= (props) => {
    const [selected, setSelected] = React.useState(false);

    return (
        <div onClick={() => props.selectUser(this)} className="user-finder-record">
            <div className="user-finder-record-select">
                <span className="fa fa-plus" aria-hidden="true"></span>
            </div>

            <div className="user-finder-record-info">
                <img alt="ahmed" src={process.env.PUBLIC_URL + props.avatar} />
                <div className="user-finder-record-name">
                    {props.name}
                </div>
            </div>

            <div className={selected ?
                "user-finder-record-status-selected" :
                "user-finder-record-status-deselected"}>
                <span className="fa fa-check" aria-hidden="true"></span>
            </div>
        </div>
    );
};