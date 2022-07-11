import React, { FC } from "react";
import { Field, FieldArray } from "formik";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FormikInput from "./FormikInput";
import { Answer } from "../models/quiz";

interface AnswerFormProps {}

const AnswerForm: FC<AnswerFormProps> = () => {
  return (
    <FieldArray name="answers">
      {({ push, remove, form }) => {
        const { values } = form;
        const { answers } = values;
        return (
          <>
            {answers.map((answer: Answer, index: number) => (
              <div key={index}>
                <Typography sx={{ padding: "10px" }} fontWeight="bold">
                  {`Answer ${index + 1}`}
                </Typography>
                <Field
                  name={`answers.${index}.label`}
                  label="Question"
                  as={FormikInput}
                />
                <label>
                  <Field
                    type="checkbox"
                    name={`answers.${index}.isCorrect`}
                    label="Correct"
                    as={Checkbox}
                  />
                  correct
                </label>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  {answers.length > 1 && (
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => remove(index)}
                    >
                      Remove Answer
                    </Button>
                  )}
                  {answers.length - 1 === index && answers.length < 5 && (
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() =>
                        push({
                          label: "Write your next answer",
                          value: index,
                          isCorrect: true,
                        })
                      }
                    >
                      Add Answer
                    </Button>
                  )}
                </CardActions>
              </div>
            ))}
          </>
        );
      }}
    </FieldArray>
  );
};

export default AnswerForm;
