import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { questions } from "utils/questions";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Paper } from "@mui/material";
import { FieldArray, FieldAttributes, Form, Formik, useField } from "formik";
import Checkbox from "@mui/material/Checkbox";
import { setPreference, userCredentials } from "redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Path } from "routes/routing";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface Props {}

type CheckboxProps = { label: string; value: string } & FieldAttributes<{}>;

const initialState = questions.reduce<{ [key: string]: string }>(
  (acc, value, index) => {
    acc[`Question ${index}`] = "";
    return acc;
  },
  {}
);

const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  value,
  ...props
}) => {
  const [field] = useField<{}>(props);
  return (
    <FormControlLabel
      {...field}
      control={<Checkbox value={value} />}
      label={label}
    />
  );
};

export const Questionnaire: React.FC<Props> = () => {
  const action = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(userCredentials);

  const handleSubmit = async (data: any) => {
    const result = Object.values(data)
      .flatMap((value) => value)
      .filter((value) => value !== "") as string[];
    const summary = result.reduce<{ [key: string]: number }>(
      (acc, value) => {
        acc[value] += 1;
        return acc;
      },
      { V: 0, A: 0, R: 0, K: 0 }
    );
    const summaryList = Object.entries(summary).sort((a, b) => {
      return a[1] < b[1] ? 1 : -1;
    });
    const highestPreferenceValue = summaryList[0][1] / 2;
    const chosenPreferenceValue = summaryList
      .filter((item) => item[1] > highestPreferenceValue)
      .map((item) => item[0]);

    action(setPreference(chosenPreferenceValue.slice(0, 1)));
    user &&
      (await updateDoc(doc(db, "users", user.id), {
        preferences: chosenPreferenceValue.slice(0, 1),
      }));
    navigate(Path.UserProfile);
  };

  return (
    <Formik initialValues={initialState} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <FieldArray name="questions">
            {() => (
              <Box>
                <Typography
                  variant="h5"
                  paddingTop="30px"
                  display="flex"
                  justifyContent="center"
                >
                  VARK is a questionnaire that helps your learning by suggesting
                  the strategies you should be using.
                </Typography>
                {questions.map((question, questionIndex) => (
                  <Paper
                    key={questionIndex}
                    elevation={1}
                    sx={{
                      p: 2,
                      mt: 3,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h5">{question.text}</Typography>
                    {question.answers.map((answer, index) => (
                      <CustomCheckbox
                        name={`Question ${questionIndex}`}
                        key={index}
                        value={answer.preference}
                        label={answer.label}
                      />
                    ))}
                  </Paper>
                ))}
              </Box>
            )}
          </FieldArray>
          <Button
            sx={{
              m: 3,
            }}
            type="submit"
            size="small"
            color="primary"
            variant="contained"
          >
            View result
          </Button>
        </Form>
      )}
    </Formik>
  );
};
