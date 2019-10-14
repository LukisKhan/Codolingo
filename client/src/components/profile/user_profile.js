import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";

const { IS_LOGGED_IN, FETCH_USER, GET_USER, FETCH_COURSES } = Queries;

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { lessonsCompleted: [] };
    }
    render() {
        let authToken = localStorage.getItem("auth-token");
        let userId = localStorage.getItem("userId");

        return(
            <div className="user-profile-page">
                <Query query={GET_USER} 
                    variables={{ id: userId }}
                    onCompleted={data => {
                        let lessonsCompleted = data.user.lessonsCompleted.split(" ");
                        this.setState({ lessonsCompleted: lessonsCompleted });
                    }}>
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if(error) console.log(error);
                        return <p>Blank page</p>
                    }}
                </Query>
                <Query query={FETCH_COURSES}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) console.log(error);
                        console.log(data);
                        return data.courses.map(({ language, _id, lessons }) => {
                            let isCompleted = "";
                            let myLessons = (
                                lessons.map( lesson => {
                                    this.state.lessonsCompleted.includes(lesson._id) ? isCompleted = "lesson-completed" : isCompleted = "lesson-not-completed";
                                    return (
                                        <li key={lesson._id} className={`user-lesson ${isCompleted}`}>{lesson.title}</li>
                                    )})
                            )
                            return (
                                <ul key={_id} className="user-language">
                                    <Link to={`/course/${language}`}>
                                    <h4>{language}</h4>
                                    </Link>
                                    {myLessons}
                                </ul>
                            )}
                        );
                    }}
                </Query>
            </div>
        )
    }
}

export default ProfilePage;