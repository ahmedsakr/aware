import React from 'react'
import './Courses.scss'
import {ChatDomain} from '../../api/DirectMessaging'

interface Course {
    id: string,
    icon: string,
    name: string
};

type CoursesProps = {
    activeChat: string,
    socket: SocketIOClient.Socket,
    username: string,
    selectChat: (id: string, title: string, domain: ChatDomain) => void
};

type CoursesState = {
    courses: Course[]
}

export default class Courses extends React.Component<CoursesProps, CoursesState> {

    constructor(props: CoursesProps) {
        super(props);

        this.state = {
            courses: []
        }
    }

    componentWillMount(): void {
        if (this.props.socket) {

            // Retrieve all rooms that the user is subscribed to.
            this.props.socket.emit('get-courses', this.props.username);

            // Listen for any updates in subscribed rooms for this user.
            this.props.socket.on('user-courses', (courses: Course[]) => {
                this.setState({
                    courses: courses
                });
            });
        }
    }

    selectCourse(id: string, title: string) {
        this.props.selectChat(id, title, ChatDomain.COURSE_DISCUSSION);
    }

    render(): JSX.Element {
        return (
            <div>
            {
                this.state.courses.map((course: Course) => {
                    return (
                        <Course
                            selectCourse={this.selectCourse.bind(this)}
                            selected={this.props.activeChat === course.id}
                            room={course.id}
                            src={"/messenger-icons/" + course.icon}
                            name={course.name} />
                    )
                })
            }
            </div>
        );
    }
}

type CourseProps = {
    selectCourse: (id: string, title: string) => void,
    selected: boolean,
    room: string,
    src: string,
    name: string,
};

const Course: React.FC<CourseProps> = (props) => {
    const currentState = "chat-navigation-item" + (props.selected ? "-selected": "")

    return (
        <div
            onClick={() => { props.selectCourse(props.room, props.name) }}
            className={currentState}>

            <div className="navbar-item-avatar col-2">
                <img src={process.env.PUBLIC_URL + props.src} alt={props.name} />
            </div>

            <div className="navbar-item-name col-9">
                <p>{props.name}</p>
            </div>

        </div>
    );
}