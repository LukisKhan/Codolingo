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
        lessons {
          _id, title,
          questions {
            _id, prompt,
            answers {
              _id, answer, isCorrect
            }
          }
        }
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
  FETCH_QUESTION: gql`
    query FetchQuestion($id:ID!) {
      question(_id: $id) {
        _id
        prompt
        answers{
          answer
          _id
        }
      }
    }
  `,
  FETCH_LESSONS: gql`
    query FetchLessons {
      lessons {
        _id
        title
      }
    }
  `,
  FETCH_LESSON: gql`
    query FetchLesson($id:ID!) {
      lesson(_id: $id) {
        _id
        title
        questions {
          prompt
          _id
          answers {
            answer
            isCorrect
            _id
          }
        }
      }
    }
  `,
};