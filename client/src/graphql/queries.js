import gql from "graphql-tag";

export default {
  // it's this simple to query our cache!
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_COURSES: gql `
    query FetchCourses {
      courses {
        _id
        language
        lessons
      }
    }
  `,
  FETCH_LESSONS: gql`
    query FetchLessons {
      lessons {
        _id
        title
        questions
        courses
      }
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
};