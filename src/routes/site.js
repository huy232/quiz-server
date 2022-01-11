const express = require("express");
const router = express.Router();

const homeController = require("../app/controller/HomeController");
const contactController = require("../app/controller/ContactController");
const quizController = require("../app/controller/QuizController");
const questionController = require("../app/controller/QuestionController");
const answerController = require("../app/controller/answerController");
const historyController = require("../app/controller/historyController");
const history_resultController = require("../app/controller/historyResultController");
const ranklistController = require("../app/controller/ranklistController");

const signinController = require("../app/controller/SignInController");
const signupController = require("../app/controller/SignUpController");

const adminController = require("../app/controller/adminController");

// HOME SITE
router.get("/", homeController.index);

// SIGN-IN & SIGN-UP
// SIGN IN
router.get("/sign-in", (req, res) => {
	res.render("signin");
});
router.post("/sign-in", signinController.signin);
// SIGN UP
router.get("/sign-up", (req, res) => {
	res.render("signup");
});
router.post("/sign-up", signupController.signup);

// ADMIN PAGE
router.get("/admin", (req, res) => {
	res.render("admin");
});
// ADMIN INTERACT WITH USER
router.get("/admin/get-list-user", adminController.getUserList);
// router.put("/admin/update-user", adminController.updateUser);
router.patch("/admin/update-user/:user_ID", adminController.updateUserByRole);
router.delete("/admin/delete-user/:user_ID", adminController.deleteUser);

router.get("/admin/get-user/:user_ID", adminController.getUser);

// ADMIN INTERACT WITH ROLE
router.get("/admin/get-role-list", adminController.getRoleList);
router.post("/admin/create-role", adminController.createRole);
router.get("/admin/find-role", adminController.findRole);
router.put("/admin/update-role/:role_ID", adminController.updateRole);
router.delete("/admin/delete-role/:role_ID", adminController.deleteRole);
// CONTACT
router.get("/contact", contactController.index);
// QUIZ
// router.get('/quiz-topic', (req, res)=>{
//   res.render ('quiz')
// })
router.get("/quiz-topics/:quiz_ID", quizController.getQuiz);
router.get("/quiz-topics", quizController.getQuizList);

// ADMIN INTERACT WITH QUIZ
router.get("/admin/get-quiz-list", quizController.getQuizList);
router.post("/admin/create-quiz", quizController.createQuiz);
router.get("/admin/get-quiz/:quiz_ID", quizController.getQuiz);
router.put("/admin/update-quiz/:quiz_ID", quizController.updateQuiz);
router.delete("/admin/delete-quiz/:quiz_ID", quizController.deleteQuiz);

router.get("/");

// ADMIN INTERACT WITH QUESTION
router.get("/admin/get-question-list", questionController.getQuestionList);
router.post("/admin/create-question", questionController.createQuestion);
router.put(
	"/admin/update-question/:question_ID",
	questionController.updateQuestion
);
router.delete(
	"/admin/delete-question/:question_ID",
	questionController.deleteQuestion
);

router.get("/questions/", questionController.getQuestionList);
router.get("/questions/:question_ID", questionController.getQuestionByID);
router.get(
	"/quiz-question/:quiz_ID",
	questionController.getQuestionListByQuizID
);
router.get("/quiz/:quiz_ID", questionController.getQuesAnsListByQuizID);

// router.put('/admin/update-question-count',questionController.countByQuizID)

// ADMIN INTERACT WITH ANSWER
router.get("/admin/get-answer-list", answerController.getAnswerList);
router.post("/admin/create-answer", answerController.createAnswer);
router.patch("/admin/update-answer/:answer_ID", answerController.updateAnswer);
router.delete("/admin/delete-answer/:answer_ID", answerController.deleteAnswer);

router.get("/answer/:question_ID", answerController.findByQuestionID);

// HISTORY
router.get("/get-history/:user_ID", historyController.getHistory);
router.get("/history/:user_ID", historyController.getAllHistory);
router.post("/create-history", historyController.createHistory);

// HISTORY RESULT
router.post(
	"/create-history-result/:history_ID",
	history_resultController.createHistoryResult
);
router.get("/get-all-result", history_resultController.getAll);
router.get(
	"/get-specific-result/:history_ID/:user_ID",
	history_resultController.getSpecific
);

router.get(
	"/get-history-result/:history_ID",
	history_resultController.getHistoryResult
);
router.patch(
	"/update-result/:question_ID/:history_ID",
	history_resultController.update
);
router.delete("/delete-history/:history_ID", history_resultController.delete);

// router.put('/admin/update-answer-count', answerController.countByQuestionID)

// RANK LIST

router.get("/get-ranklist/:quiz_ID", ranklistController.getRankList);
router.post("/create-ranklist", ranklistController.createRankList);
module.exports = router;
