import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
import {withRouter} from "react-router-dom"
const { FETCH_QUESTION } = Queries;

class QuestionDetail extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    return (
    <div className="question-detail">
      <ul>
          <Query query={FETCH_QUESTION} variables={{ id: this.props.match.params.id }}>
          {({ loading, error, data }) => {
            console.log(data);
            console.log(this.props.match.params.id );
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return <div>in question details</div>
            {/* return data.question.answers.map(({ _id,answer }) => (
              <li key={_id}>
                <Link to={`/answers/${_id}`}>
                  <h4>{answer}</h4>
                </Link>
              </li>
            )); */}
          }}
        </Query>
      </ul>
    </div>
    )
  }
};

export default withRouter(QuestionDetail);
