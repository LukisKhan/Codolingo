import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      _id
      name
      loggedIn
      _id
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      email
      token
      loggedIn
    }
  }
`;

export const UPDATE_LESSONS_COMPLETED = gql`
  mutation UpdateLessonsCompleted($userId: ID!, $lessonsCompleted: String!){
    updateLessonsCompleted(userId: $userId, lessonsCompleted: $lessonsCompleted){
      _id
      lessonsCompleted
      name
    }
  }
`;

export const NEW_QUESTION = gql`
  mutation NewQuestion($prompt: String!) {
    newQuestion(prompt: $prompt) {
      prompt
      _id
    }
  }
`;

export const REMOVE_QUESTION = gql`
  mutation RemoveQuestion($id: ID!) {
    removeQuestion(id: $id) {
      _id
    }
  }
`;