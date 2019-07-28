import React from 'react'
import AwareOverlay from '../../../shared/overlay/AwareOverlay'
import 'bootstrap'
import './UserFinderOverlay.scss'

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
};

export default class UserFinderOverlay extends React.Component<UserFinderOverlayProps, UserFinderOverlayState> {

    constructor(props: UserFinderOverlayProps) {
        super(props);

        this.state = {
            relatedUsers: null,
            messagesFilter: '',
            selectedUser: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            [event.target.name]: event.target.value
        } as any); 
    }
    
    getFilteredRelatedUsers(): RelatedUser[] {
        if (this.state.relatedUsers == null) {
            return [];
        }

        return this.state.relatedUsers.filter(user => user.username.startsWith(this.state.messagesFilter))
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
                            name={user.username}
                            avatar={user.username + "-pic.jpg"}
                            selected={true} />
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
        return (
            <div id="footer-layer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Nevermind</button>
                <button id="user-finder-start" type="button" className="btn btn-primary" disabled={this.state.selectedUser == null ? true: false}>Go</button>
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