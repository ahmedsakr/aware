import React from 'react'
import './Courses.scss'
import CourseDiscussion from '../CourseDiscussion';
import {Room} from '../ChatSelector'

type CoursesProps = {
    selectCourse: (course: Room) => void;
};

interface Course {
    group_id: string,
    icon: string,
    name: string
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
                            room={course.group_id}
                            src={"/messenger-icons/" + course.icon}
                            name={course.name} />
                    )
                })
            }
            </div>
        );
    }
}