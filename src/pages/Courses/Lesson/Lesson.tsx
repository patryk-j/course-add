import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonById } from "../../../services/coursesActions";
import { Lesson as LessonModel } from "models/course";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { Path } from "../../../routes/routing";
import { useDispatch, useSelector } from "react-redux";
import { setPreference, userCredentials } from "../../../redux/userSlice";
import { Preferences } from "models/questionnaire";
import Checkbox from "@mui/material/Checkbox";
import { Answer } from "../../../models/quiz";
import { Field, Form, Formik } from "formik";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface LessonProps {}

interface InitialState {
  answers: Answer[];
}

const Lesson: React.FC<LessonProps> = () => {
  let { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState<LessonModel | null>(null);
  const [changePreference, setChangePreference] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isQuizDone, setIsQuizDone] = useState(false);

  const navigate = useNavigate();
  const action = useDispatch();
  const { user } = useSelector(userCredentials);

  useEffect(() => {
    const getLessonData = async () => {
      if (courseId && lessonId) {
        setLesson(await getLessonById(courseId, lessonId));
      }
    };
    void getLessonData();
  }, [courseId, lessonId]);

  const initValues = () => ({
    answers: lesson!.quiz.answers.map((answer) => ({
      label: answer.label,
      value: answer.value,
      isCorrect: false,
    })),
  });

  const handleSubmit = (answers: InitialState) => {
    lesson?.quiz.answers.forEach((answer, index) => {
      if (answer.isCorrect !== answers?.answers[index].isCorrect) {
        setChangePreference(true);
        return;
      }
    });
    setIsQuizDone(true);
  };

  const redirectToCourses = () => navigate(Path.Courses);
  const redirectToCourse = () => navigate(`/course/${courseId}`);
  const handleChange = (event: SelectChangeEvent<typeof preferences>) => {
    const {
      target: { value },
    } = event;
    setPreferences(value as string[]);
  };
  const handleChangePreference = () => {
    setIsQuizDone(false);
    action(setPreference(preferences));
  };
  return (
    <Box
      sx={{
        width: "100%",
        p: 8,
        textAlign: 'justify',
      }}
    >
      {lesson && (
        <>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              maxHeight: "200px",
              paddingBottom:"40px",
            }}
          >
            <Typography variant="h5" paddingBottom="10px">
              {`Lesson: ${lesson.name}`}
            </Typography>
            {user?.isAdmin && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() =>
                  navigate(`${Path.EditLesson}/${courseId}/${lessonId}`)
                }
              >
                Edit Lesson
              </Button>
            )}
          </CardContent>
          <Card sx={{padding: '10px',}}>
            <CardContent>
              {lesson.sections
                .filter((section) => {
                  return (
                    user?.userPreference &&
                    section.preferences.includes(
                      user.userPreference[0] as Preferences
                    )
                  );
                })
                .map((section, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  ></div>
                ))}
            </CardContent>
          </Card>
          <Card style={{ minWidth: "300px" ,width:'fit-content', height: 'fit-content', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '50px', }}>
          <CardContent>
          <Typography variant="h4" padding="10px">
            Quiz
          </Typography>
          {isQuizDone ? (
            changePreference ? (
              <>
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Preferences</InputLabel>
                  <Select
                    fullWidth
                    multiline
                    maxRows={6}
                    name="preferences"
                    label="preferences"
                    autoComplete="preferences"
                    autoFocus
                    value={preferences}
                    onChange={handleChange}
                  >
                    <MenuItem value={Preferences.Visual}>Visual</MenuItem>
                    <MenuItem value={Preferences.Aural}>Aural</MenuItem>
                    <MenuItem value={Preferences.Read}>Read</MenuItem>
                    <MenuItem value={Preferences.Kinesthetic}>
                      Kinesthetic
                    </MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{margin: '10px'}}>
                  <Button onClick={handleChangePreference} variant="contained" sx={{marginRight: '20px'}}>
                    Approve your choice
                  </Button>
                  <Button onClick={redirectToCourse} variant="contained" sx={{marginLeft: '20px'}}>
                    Go back to course
                  </Button>
                </Box>

              </>
            ) : (
              <Button variant="contained" onClick={redirectToCourses}>
                Go to courses
              </Button>
            )
          ) : (
            <CardContent>
              <Formik initialValues={initValues()} onSubmit={handleSubmit}>
                <Form>
                  <Typography>{lesson.quiz.label}</Typography>
                  <Box sx={{display: 'flex', flexDirection: 'column',}}>
                    {lesson.quiz.answers.map((answer, index) => (
                      <label key={index}>
                        <Field
                          type="checkbox"
                          name={`answers.${index}.isCorrect`}
                          label="Correct"
                          as={Checkbox}
                        />
                        {answer.label}
                      </label>
                    ))}
                  </Box>
                  <Button variant="contained" type="submit">
                    Submit Answer
                  </Button>
                </Form>
              </Formik>
            </CardContent>
          )}
          </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Lesson;
