# Quiz-App-Backened
The Quiz App Backend is a Node.js application built using Express.js, designed to serve multiple-choice quizzes to users. It provides an interactive platform where users can test their knowledge on various topics and receive immediate feedback on their performance.


### Features

#### Multiple Topics
- The backend supports quizzes across different topics, offering users a diverse range of options to choose from.

#### User Authentication
- Secure registration and login functionalities are implemented to ensure user data privacy and access control.

#### Quiz Management
- **Create, Update, Delete Quizzes:** Administrators can manage quizzes, adding new ones or updating and deleting existing ones.
- **Question Management:** Within each quiz, administrators have the flexibility to add, edit, or remove questions.

#### User Interaction
- **Quiz Participation:** Users can select and participate in quizzes of their choice.
- **Answer Submission:** After completing a quiz, users can submit their answers for evaluation.

#### Feedback System
- Upon submission, users receive immediate feedback on their performance. The feedback includes the total score and highlights correct answers for incorrectly answered questions.

#### Scoring System
- The backend calculates the user's score based on the number of correct answers submitted, providing an accurate assessment of the user's knowledge.

### Technologies Used
- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing quizzes, questions, and user data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT:** JSON Web Token for secure authentication.
- **Bcrypt:** Password hashing for enhanced security.


# Installation and Setup

To set up the application locally, follow these steps:

- Clone the repository:
```bash
git clone https://github.com/Anshul194/Quiz-App-Backened.git
```

- Install dependencies:
```bash
npm install
```

- Set up environment variables:

Create a .env file based on the provided .env.example file and configure necessary environment variables such as database connection URI, JWT secret key, etc.

Run the application:
```bash
npm run dev
```

- Access the application in your web browser:
```bash
http://localhost:8032
```

### NOTE : If you stuck then contact me on [LinkedIn](https://www.linkedin.com/in/anshul-jha-069002259/)

## Request
- If You find any bug then please create issue i love to solve that
- If You have suggestion or want new feature the feel free to create an issue with label features.
