import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import CourseHeader from "./CourseHeader";
const { FETCH_LESSONS } = Queries;

class CourseDetail extends React.Component {
    render() {
        return (
            <div >
                <CourseHeader courseId={this.props.match.params.id} />
                <div className="courseTitle">{this.props.match.params.id}</div>
                <div className="lesson-list-page">
                    <ul className="lesson-list">
                        <Query query={FETCH_LESSONS}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error</p>;
                                return data.lessons.map(({ _id, title }) => (
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

export default CourseDetail;
