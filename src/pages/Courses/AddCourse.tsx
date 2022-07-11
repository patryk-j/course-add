import React, { useTransition } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import Container from "@mui/material/Container";
import { addCourseSchema } from "utils/validationSchemas";
import CategoryIcon from "@mui/icons-material/Category";
import { db } from "config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Path } from "routes/routing";

interface CourseProps {}

interface CourseForm {
  title: string;
  category: string;
  description: string;
}

const initialState: CourseForm = {
  title: "",
  category: "",
  description: "",
};

const AddCourse: React.FC<CourseProps> = () => {
  const navigate = useNavigate();
  const [isSaving, startSaving] = useTransition();

  const saveCourse = async ({ title, category, description }: CourseForm) => {
    try {
      const newDocRef = doc(collection(db, "courses"));
      const course = await setDoc(newDocRef, {
        id: newDocRef.id,
        title,
        category,
        description,
      });
      navigate(`${Path.Course}/${newDocRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const submitForm = (data: CourseForm) => {
    startSaving(() => {
      void saveCourse(data);
    });
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: initialState,
    validationSchema: addCourseSchema,
    onSubmit: submitForm,
  });

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
          <CategoryIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add course
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Category"
            name="category"
            autoComplete="category"
            autoFocus
            value={values.category}
            onChange={handleChange}
            error={touched.category && Boolean(errors.category)}
            helperText={touched.category && errors.category}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            maxRows={6}
            label="Description"
            name="description"
            autoComplete="description"
            autoFocus
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <LoadingButton
            loading={isSaving}
            type="submit"
            variant="contained"
            color="success"
            sx={{
              mt: 5,
              mb: 2,
            }}
          >
            Add course
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default AddCourse;
