// import React from 'react';

// import { Query, ApolloConsumer } from "react-apollo";
// import Queries from "../../graphql/queries";
// const { IS_LOGGED_IN } = Queries;

// const LogoutButton = (props) => {
//     return(
//         <ApolloConsumer>
//             {client => (
//             <Query query={IS_LOGGED_IN}>
//             {({ data }) => (
//                 <button className="logoutButton"
//                     onClick={e => {
//                     e.preventDefault();
//                     localStorage.removeItem("auth-token");
//                     client.writeData({ data: { isLoggedIn: false } });
//                     this.props.history.push("/");
//                 }}
//                 >
//                 Logout
//                 </button>
//                                             )}
//             </Query>
//                                     )}
//         </ApolloConsumer>
//     )
// }