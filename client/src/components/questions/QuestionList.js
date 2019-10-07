import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_QUESTIONS } = Queries;

const QuestionList = () => {
  return (
    <div className="outer">
      <ul>
        <Query query={FETCH_QUESTIONS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return data.questions.map(({ _id, prompt }) => (
              <li key={_id}>
                <Link to={`/questions/${_id}`}>
                  <h4>{prompt}</h4>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default QuestionList;
