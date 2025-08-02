# Quiz Application

## 🧠 Overview

This is a full-stack Quiz Application built using **React.js**, **Tailwind CSS**, **Redux**, **Node.js**, **Express**, and **MongoDB**.

Users begin by submitting their email, review the quiz instructions, attempt the quiz (15 random questions from OpenTDB API), and finally receive a detailed report of their performance.

## 🌐 Live URLs

- **Frontend Base URL**: [https://causal-funnel-assignment-sandy.vercel.app](https://causal-funnel-assignment-sandy.vercel.app/)
- **Backend Base URL**: [https://causalfunnel-assignment-x3j3.onrender.com](https://causalfunnel-assignment-x3j3.onrender.com)

## ⚙️ Tech Stack

* **Frontend**: React.js, Tailwind CSS, React-Redux
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Email Service**: Nodemailer
* **External API**: [https://opentdb.com/api.php?amount=15](https://opentdb.com/api.php?amount=15)

## 🧠 My Approach

* **Step 1: User Model Design**
  I began by designing a user model that stores the email, score, quiz questions, correct answers, selected answers, and whether the response was correct. Here's the schema:

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  quizQuestionsAndResponses: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
      selectedAnswer: { type: String },
      isCorrect: { type: Boolean },
    },
  ],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
```

* **Step 2: Backend API Design**
  I defined and implemented the necessary API routes to support quiz functionality:

  * `POST /user-email` — Store user email
  * `GET /fetch-questions/:email` — Generate and return quiz questions (excluding correct answers)
  * `POST /submit-quiz` — Submit responses, calculate score, and email result
  * `GET /quiz-report/:email` — Return detailed quiz report for the given email

* **Step 3: Frontend Page Structure**

  * `WelcomePage.jsx` — Form to collect user email
  * `InstructionsPage.jsx` — Displays quiz guidelines to prepare users before beginning
  * `QuizPage.jsx` — Renders quiz questions with a smooth, animated UI
  * `ReportPage.jsx` — Shows all questions, selected answers, correct answers, and total score

## 🌟 Additional Features (Bonus Implementations)

1. **Email Notifications**: Users receive their quiz score via email.
2. **Light and Dark Mode Toggle**: For better accessibility and user comfort.
3. **Responsive Design**: Mobile-first UI with clean adaptability.
4. **Auto Full Screen on Quiz Start**: Enhances focus during the quiz.
5. **Instructions Page**: Displays quiz guidelines to prepare users before beginning.
6. **5-Second Countdown Before Quiz**: Prepares users mentally before starting.
7. **Smooth Transition Animations**: While navigating between questions.

## 📁 Folder Structure

```
root/
├── frontend/     # React application
└── backend/      # Express server and MongoDB integration
```

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/manas-agarwal16/CausalFunnel_Assignment.git
cd CausalFunnel_Assignment
```
### 2. Setup Backend
```bash
cd backend
npm install
```
**Create a .env file in the backend folder:**
```bash
DB_URI=your_mongodb_connection_string
PORT=
CORS_ORIGIN=
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
```
**To run the backend server:**
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```
**To start the frontend development server:**
```bash
npm run dev
```

## 🧩 Backend API Routes

* `POST /user-email` — Store user email
* `GET /fetch-questions/:email` — Generates and returns quiz questions. To ensure quiz integrity, correct answers are excluded from the response sent to the frontend.
* `POST /submit-quiz` — Submit answers, calculate score, notify quiz score via email
* `GET /quiz-report/:email` — Return full quiz report for given email

## 📄 Assumptions

* Each email is allowed a single quiz attempt.

## 🧗 Challenges Faced

One small challenge was tracking visited and answered questions to visually distinguish them in the UI using different colors (answered = green, visited = yellow, not visited = gray). To achieve this, I added an index to each question fetched from the OpenTDB API and used those indexes in state management to dynamically track which questions had been visited or answered. This required attention to detail to ensure consistency across components.thoughtful structuring and smooth user flow were emphasized for clarity and UX.

### 📞 Contact

- **Email**: [manas.agarwal1604@gmail.com](mailto:manas.agarwal1604@gmail.com)  
- **Phone**: +91 8279653442
