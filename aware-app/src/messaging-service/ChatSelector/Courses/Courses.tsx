import React from 'react'
import './Courses.scss'
import { MessengerChat, ChatData, ChatDomain } from '../../api/Messaging'

type CoursesProps = {
    activeChat: string,
    socket: SocketIOClient.Socket,
    username: string,
    selectChat: (chat: MessengerChat) => void
};

type CoursesState = {
    courses: Set<MessengerChat>
}

export default class Courses extends React.Component<CoursesProps, CoursesState> {

    constructor(props: CoursesProps) {
        super(props);

        this.state = {
            courses: new Set<MessengerChat>()
        }
    }

    componentWillMount(): void {
        if (this.props.socket) {

            // Retrieve all rooms that the user is subscribed to.
            this.props.socket.emit('get-courses', this.props.username);

            // Listen for any updates in subscribed rooms for this user.
            this.props.socket.on('user-courses', (chats: ChatData[]) => {
                let courses: Set<MessengerChat> = new Set<MessengerChat>();
                chats.forEach((course: ChatData) => courses.add({
                    domain: ChatDomain.COURSE_DISCUSSION,
                    data: course
                }));

                this.setState({ courses });
            });
        }
    }

    render(): JSX.Element {
        return (
            <div>
            {
                Array.from(this.state.courses.values()).map((course: MessengerChat) => {
                    return (
                        <Course
                            selectChat={this.props.selectChat}
                            selected={this.props.activeChat === course.data.id}
                            course={course} />
                    )
                })
            }
            </div>
        );
    }
}

type CourseProps = {
    selectChat: (chat: MessengerChat) => void,
    selected: boolean,
    course: MessengerChat
};

const Course: React.FC<CourseProps> = (props) => {
    const currentState = "chat-navigation-item" + (props.selected ? "-selected": "")
    return (
        <div
            onClick={() => { props.selectChat(props.course) }}
            className={currentState}>

            <div className="navbar-item-avatar col-2">
                <img src={process.env.PUBLIC_URL + props.course.data.icon} alt={props.course.data.name} />
            </div>

            <div className="navbar-item-name col-9">
                <p>{props.course.data.name}</p>
            </div>
        </div>
    );
}