import React from 'react'
import './Courses.scss'
import CourseDiscussion from '../CourseDiscussion';
import {Room} from '../ChatSelector'

interface Course {
    id: string,
    icon: string,
    name: string
};

type CoursesProps = {
    socket: SocketIOClient.Socket,
    username: string,
    selectCourse: (course: Room) => void
};

type CoursesState = {
    courses: Course[],
    selected: boolean
}

export default class Courses extends React.Component<CoursesProps, CoursesState> {

    constructor(props: CoursesProps) {
        super(props);

        this.state = {
            courses: [],
            selected: false
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

    shouldComponentUpdate(nextProps: CoursesProps, nextState: CoursesState): boolean {
        return  (this.state.courses !== nextState.courses) ||
                (this.state.selected !== nextState.selected);
    }

    render(): JSX.Element {
        return (
            <div>
            {
                this.state.courses.map((course: Course) => {
                    return (
                        <CourseDiscussion
                            selectCourse={this.props.selectCourse}
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