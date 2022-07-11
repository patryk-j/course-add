import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Course as CourseModel } from "../../../models/course";
import { getCourseById } from "../../../services/coursesActions";
import { db } from "config/firebase";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { Path } from "routes/routing";
import Typography from "@mui/material/Typography";
import { LessonSection } from "components/LessonSection";
import { LessonSection as LessonSectionModel } from "models/course";
import { Preferences } from "models/questionnaire";
import AddQuiz from "../../../components/AddQuiz";
import { QuizState } from "../../../models/quiz";

interface AddLessonProps {}

const defaultSectionState = {
  preferences: [Preferences.Visual],
  content: "Init content",
};

const AddLesson: FC<AddLessonProps> = () => {
  const [lessonName, setLessonName] = useState("");
  const [course, setCourse] = useState<CourseModel | null>(null);
  let { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState<LessonSectionModel[]>([
    defaultSectionState,
  ]);
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  const handleAddLesson = async () => {
    const course = doc(collection(db, "courses"), courseId);
    await updateDoc(course, {
      lessons: arrayUnion({
        name: lessonName,
        sections: sections,
        quiz: quiz,
      }),
    });
    navigate(`${Path.Course}/${courseId}`);
  };

  const handleAddSection = () => {
    setSections([...sections, defaultSectionState]);
  };

  const onPreferenceChange = (preferences: any, sectionNumber: number) => {
    setSections(
      sections.map((section, index) => {
        if (index === sectionNumber) return { ...section, preferences };
        return section;
      })
    );
  };

  const onContentChange = (content: string, sectionNumber: number) => {
    setSections(
      sections.map((section, index) => {
        if (index === sectionNumber) return { ...section, content };
        return section;
      })
    );
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (courseId) {
          const course = await getCourseById(courseId);
          setCourse(course as CourseModel);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLessonName(e.target.value);
  };

  return (
    <>
      {course && (
        <Typography
          variant="h4"
          sx={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}
        >
          {`${course.title} Course `}
        </Typography>
      )}
      <Box
        sx={{
          mt: 3,
          mb: 3,
          pl: 3,
          height: "100px",
          width: "100%",
          display: "Flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          sx={{ width: "250px" }}
          label="Lesson Name"
          name="lessonName"
          autoComplete="lessonName"
          autoFocus
          onChange={handleChange}
        />
        {quiz && (
          <Button
            onClick={handleAddLesson}
            variant="contained"
            sx={{ height: "50px" }}
            disabled={lessonName.length < 5}
          >
            Add lesson
          </Button>
        )}
      </Box>
      {sections.map((section, index) => (
        <LessonSection
          key={index}
          index={index}
          onPreferenceChange={onPreferenceChange}
          onContentChange={onContentChange}
          preferences={section.preferences}
        />
      ))}
      <AddQuiz courseId={courseId as string} setQuiz={setQuiz} />
      <Button
        onClick={handleAddSection}
        variant="contained"
        sx={{ mt: 2, mb: 2, height: "50px" }}
      >
        Add section
      </Button>
    </>
  );
};

export default AddLesson;
