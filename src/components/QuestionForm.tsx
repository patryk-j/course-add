import React from "react";
import { Field } from "formik";
import AnswerForm from "components/AnswerForm";
import Typography from "@mui/material/Typography";
import FormikInput from "./FormikInput";

const QuestionForm = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ padding: "10px", display: "flex", justifyContent: "center" }}
      >
        Question
      </Typography>
      <Field name="label" label="Question" as={FormikInput} />
      <AnswerForm />
    </>
  );
};

export default QuestionForm;
