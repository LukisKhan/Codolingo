import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";

const { IS_LOGGED_IN, FETCH_USER } = Queries;

class ProfilePage extends React.Component {
    render() {
        let authToken = localStorage.getItem("auth-token");
        
        debugger;
        return(
            <div>
                <Query query={FETCH_USER} variables={{ token: authToken }}>
                    {({loading, error, data}) => {
                        if(error) return<p>Error</p>;
                        let usersArray = data.users;
                        return <p>Poopoo</p>
                    }}
                </Query>
            </div>
        )
    }
}

export default ProfilePage;