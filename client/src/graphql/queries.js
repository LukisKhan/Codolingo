import gql from "graphql-tag";

export default {
  // it's this simple to query our cache!
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_QUESTIONS: gql`
    query FetchQuestions {
      questions {
        _id
        prompt
      }
    }
  `,
  // FETCH_QUESTIONS: gql`
  //   query FetchQuestions {
  //     questions {
  //       _id
  //       prompt
  //     }
  //   }
  // `,
  // FETCH_QUESTIONS: gql`
  //   query FetchQuestions {
  //     questions {
  //       _id
  //       prompt
  //     }
  //   }
  // `,
};