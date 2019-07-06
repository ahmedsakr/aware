import React from 'react';
import './CourseDiscussion.scss'

type CourseDiscussionProps = {
    updateRoom: (course: CourseDiscussion) => void,
    room: string,
    src: string,
    name: string,
};

type CourseDiscussionState = {
    selected: boolean
};

export default class CourseDiscussion extends React.Component<CourseDiscussionProps, CourseDiscussionState> {
    constructor(props: CourseDiscussionProps) {
        super(props)

        this.state = {
            selected: false
        }
    }

    shouldComponentUpdate(nextProps: CourseDiscussionProps, nextState: CourseDiscussionState): boolean {
        return nextState.selected !== this.state.selected;
    }

    render(): JSX.Element {
        const { src, name, room, updateRoom } = this.props;

        return (
            <div onClick={() => { updateRoom(this); }} className={this.state.selected ? "chat-navigation-item-selected" : "chat-navigation-item"}>
                <div className="navbar-item-avatar col-2">
                    <img src={process.env.PUBLIC_URL + src} alt={name} />
                </div>
                <div className="navbar-item-name col-9">
                    <p>{name}</p>
                </div>
            </div>
        );
    }
}
