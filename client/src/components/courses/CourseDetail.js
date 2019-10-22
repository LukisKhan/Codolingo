import React from "react";
import { Query } from "react-apollo";
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import CourseHeader from "./CourseHeader";
const { FETCH_LESSONS, FETCH_COURSES } = Queries;

class CourseDetail extends React.Component {
    render() {
        localStorage.setItem('language', this.props.match.params.id);
        return (
            <div >
                <CourseHeader courseId={this.props.match.params.id} />
                <div className="courseTitle">{this.props.match.params.id}</div>
                <div className="lesson-list-page">
                    <ul className="lesson-list">
                        <Query query={FETCH_COURSES}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error</p>;
                                data.course = data.courses.filter(course => course.language === this.props.match.params.id)[0];
                                return data.course.lessons.map(({ _id, title }) => (
                                    <li key={_id}>
                                        <Link className="lesson-link" to={`/lessons/${_id}`}>
                                            <div className='ball'>
                                                <div className='layer clip'>
                                                    <div className='shade'></div>
                                                </div>
                                            </div>
                                            <div className="line"></div>
                                            <div className="question-title">
                                                {title}
                                            </div>
                                        </Link>
                                    </li>
                                ));
                            }}
                        </Query>
                    </ul>
                </div>
            </div>
        );
    }
};

export default withRouter(CourseDetail);
