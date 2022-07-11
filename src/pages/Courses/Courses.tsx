import React, { useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Box from "@mui/material/Box";
import { db } from "config/firebase";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Course } from "models/course";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, userCourses } from "redux/coursesSlice";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Path } from "routes/routing";
import { userCredentials } from "../../redux/userSlice";

interface CoursesProps {}
const Courses: React.FC<CoursesProps> = () => {
  const action = useDispatch();
  const { courses } = useSelector(userCourses);
  const { user } = useSelector(userCredentials);
  const navigate = useNavigate();

  useEffect(() => {
    const docTest = async () => {
      let coursesList: Course[] = [];
      const docRef = collection(db, "courses");
      const docSnap = await getDocs(docRef);

      docSnap.forEach((doc) => {
        coursesList.push(doc.data() as Course);
      });
      action(setCourses(coursesList));
    };
    docTest().catch((error) => console.log(error));
  }, []);

  const handleClick = (courseId: string) => {
    navigate(`${Path.Course}/${courseId}`);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(collection(db, "courses"), id));
    window.location.reload();
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h5" color="inherit" noWrap>
          Available courses
        </Typography>
      </Toolbar>
      <Grid
        container
        width="100%"
        justifyContent="space-around"
        alignItems="center"
        direction="row"
        columnGap={4}
        rowGap={6}
      >
        {courses &&
          courses.map(({ id, title, category }) => (
            <Card style={{ width: "350px", height: "360px" }} key={id}>
              <CardMedia
                image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169"
                component="img"
                height="200"
                title={title}
              />
              <CardContent>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                </Box>

                <Typography>{category}</Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleClick(id)}
                  sx={{ marginLeft: "20px" }}
                >
                  Join
                </Button>
                {user?.isAdmin && (
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(id)}
                    sx={{ marginRight: "20px" }}
                  >
                    Usuń
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
      </Grid>
    </div>
  );
};

export default Courses;
