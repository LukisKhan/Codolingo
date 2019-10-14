import { UPDATE_LESSONS_COMPLETED } from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import React, { Component } from 'react';

class LessonEnd extends Component {
  constructor(props){
    super(props);
  }
  handleClick(e, updateLessonsCompleted){
    updateLessonsCompleted({
      variables: {
        userId: localStorage.getItem("userId"),
        lessonsCompleted: localStorage.getItem("lessonId")
    }});
    let lang = localStorage.getItem('language')
    this.props.history.push(`/courses/${lang}`);
  }
  render() {
    return (
      <Mutation mutation={UPDATE_LESSONS_COMPLETED}
        onCompleted={data => {
          console.log(data);
        }}
      >{ updateLessonsCompleted => (
            <div className="end-of-lesson">
              <button
                className="end-of-lesson-button"
                onClick={e => this.handleClick(e, updateLessonsCompleted)}>Back to Lessons
              </button>
            </div>
      )}
      </Mutation>
    )
  }
}

export default withRouter(LessonEnd);
