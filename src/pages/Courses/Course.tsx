import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { getCourseById } from "services/coursesActions";
import { userCredentials } from "../../redux/userSlice";
import { Course as CourseModel} from "models/course";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Path } from "routes/routing";


interface CourseProps {}

const CourseContainer = {
  p: 3,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "flex-start",
};

const CourseHeader = {
  display: "flex",
  pl: 1,
  pr: 1,
  justifyContent: "space-between",
};

const ButtonStyle = {
  display: "flex",
  alignSelf: "center",
  mt: 4,
};

const Course: React.FC<CourseProps> = () => {
  let { courseId } = useParams();
  const { user } = useSelector(userCredentials);
  const [course, setCourse] = useState<CourseModel | null>(null);
  const navigate = useNavigate();

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

  return (
    <Box>
      {user && (
        <Box sx={CourseContainer}>
          {course && (
            <Box sx={{ width: "100%" }}>
              <Box sx={CourseHeader}>
                <Box>
                  <Typography fontWeight="bold">Title</Typography>
                  <Typography>{course.title}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold">Category</Typography>
                  <Typography>{course.category}</Typography>
                </Box>
              </Box>
            </Box>
          )}
          {user?.isAdmin && (
            <Button
              color="secondary"
              variant="contained"
              sx={ButtonStyle}
              onClick={() => navigate(`${Path.AddLesson}/${courseId}`)}
            >
              Add lesson
            </Button>
          )}
        </Box>
      )}
      <Box sx={{ width: "100%" }}>
        {course?.lessons?.map((lesson, index) => (
          <Card sx={{ minWidth: 275, marginBottom: '20px' }} key={index}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`Lesson: ${lesson.name}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => navigate(`${Path.Lesson}/${courseId}/${index}`)}
                size="small"
                color="secondary"
                variant="contained"
              >
                content
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Course;
