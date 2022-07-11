import React from "react";
import { Form, Formik } from "formik";
import Card from "@mui/material/Card";
import QuestionForm from "components/QuestionForm";
import { QuizState } from "../models/quiz";
import Button from "@mui/material/Button";

const initialState: QuizState = {
  label: "Ask question",

  answers: [
    { label: "Write your first answer", value: 0, isCorrect: true },
    { label: "Write your second answer", value: 1, isCorrect: true },
  ],
};

interface AddQuizProps {
  courseId: string;
  setQuiz: React.Dispatch<React.SetStateAction<QuizState | null>>;
}

const AddQuiz: React.FC<AddQuizProps> = ({ courseId, setQuiz }) => {
  const handleSubmit = async (data: QuizState) => {
    courseId && setQuiz(data);
  };

  const scrollToTop = () => {
    window.scrollTo(0,0)
  }
  return (
    <Card sx={{ width: "100%", p: 3, m: 3 }}>
      <Formik initialValues={initialState} onSubmit={handleSubmit}>
        <Form>
          <QuestionForm />
          <Button type="submit" variant="contained" onClick={scrollToTop}>
            Add quiz
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default AddQuiz;
