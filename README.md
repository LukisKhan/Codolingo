# Codolingo
 [Codolingo live](https://codolingo.herokuapp.com/)

## Architecture and Technologies
* [GraphQL](https://www.apollographql.com/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Apollo](https://www.apollographql.com/)

## Overview and Features
Inspired by Duolingo. Learn coding without a keyboard or setup, anywhere
Duolingo for coding

### Database Connectivity
The Database is tailor-made with all data relationships, allowing the frontend components to fetch data seamlessly. The QuestionType served as the lynchpin of the database, connecting the lessons with the multitude of answers.
```javascript
  const QuestionType = new GraphQLObjectType({
    name: "QuestionType",
    fields: () => ({
      _id: { type: GraphQLID },
      prompt: { type: GraphQLString },
      example: { type: GraphQLString },
      hint: { type: GraphQLString },
      answers: { 
        type: new GraphQLList(require("./answer_type")),
        resolve(parentValue) {
          return Question.findAnswers(parentValue._id);
        }
      },
      lessons: {
        type: new GraphQLList(require("./lesson_type")),
        resolve(parentValue) {
          return Question.findById(parentValue.id)
            .populate("lessons")
            .then(question => question.lessons);
        }
      }
    })
  })
```

## FUNCTIONALITY AND MVP
User Profiles 
Question, Answers 
Lessons / Courses 
Stats and Goals 
REPL 
Subscription  
Languages: Ruby, JS, Python, SQL/GraphQL 
Semi-bonus: Security risk for REPL, course builder UI vs seeding
Bonuses: Random questions, increasing difficulty, compare languages

## Future Plans
* Upgradeable accounts utilizing achievements and rewards.
* More expansive curriculum implementing REPL functionality.
* Courses convering additional languages (Python, Swift).
