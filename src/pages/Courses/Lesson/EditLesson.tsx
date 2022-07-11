import React, { useState, ChangeEvent, useEffect, FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Course as CourseModel, Lesson } from "../../../models/course";
import { getCourseById } from "../../../services/coursesActions";
import { db } from "config/firebase";
import { LessonSection as LessonSectionModel } from "models/course";
import { LessonSection } from "components/LessonSection";
import { Preferences } from "models/questionnaire";
import { doc, updateDoc, collection } from "firebase/firestore";
import { Path } from "routes/routing";
import Typography from "@mui/material/Typography";

interface EditLessonProps {}

const defaultSectionState = {
  preferences: [Preferences.Visual],
  content: "Init content",
};

const EditLesson: FC<EditLessonProps> = () => {
  const [lessonName, setLessonName] = useState("");
  const [course, setCourse] = useState<CourseModel | null>(null);
  let { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [initSections, setInitSections] = useState<LessonSectionModel[]>([
    defaultSectionState,
  ]);
  const [sections, setSections] = useState<LessonSectionModel[]>([
    defaultSectionState,
  ]);

  const handleEditLesson = async () => {
    const courseRef = doc(collection(db, "courses"), courseId);
    await updateDoc(courseRef, {
      lessons: course?.lessons.reduce(
        (acc: Lesson[], lesson: Lesson, index: number) => {
          if (lessonId && index === (+lessonId as number)) {
            acc.push({
              name: lessonName,
              quiz: lesson.quiz,
              sections: sections,
            });
          } else {
            acc.push(lesson);
          }
          return acc;
        },
        []
      ),
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
          lessonId && setLessonName(course?.lessons[+lessonId as number].name);
          lessonId &&
            setSections(course?.lessons[+lessonId as number].sections);
          lessonId &&
            setInitSections(course?.lessons[+lessonId as number].sections);
        }
      } catch (e) {
        console.log(e);
      }
    };
    void fetchCourse();
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
          value={lessonName}
          margin="normal"
          sx={{ width: "250px" }}
          label="Lesson Name"
          name="lessonName"
          autoComplete="lessonName"
          autoFocus
          onChange={handleChange}
        />
        <Button
          onClick={handleEditLesson}
          variant="contained"
          sx={{ height: "50px" }}
          disabled={lessonName.length < 5}
        >
          Edit lesson
        </Button>
      </Box>
      {sections.map((section, index) => (
        <LessonSection
          key={index}
          index={index}
          onPreferenceChange={onPreferenceChange}
          onContentChange={onContentChange}
          preferences={section.preferences}
          initialValue={initSections[index]?.content}
        />
      ))}
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
export default EditLesson;
