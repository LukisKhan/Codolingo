import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";

const { IS_LOGGED_IN, FETCH_USER } = Queries;

class ProfilePage extends React.Component {
    render() {
        let authToken = localStorage.getItem("auth-token");

        return(
            <div>
                <Query query={FETCH_USER} variables={{ token: authToken }}>
                    {({loading, error, data}) => {
                        if(error) console.log(error);
                        let currentUser = data;
                        return <p>Blank page</p>
                    }}
                </Query>
            </div>
        )
    }
}

export default ProfilePage;