import React, { useTransition } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import Container from "@mui/material/Container";
import { EditProfileSchema } from "utils/validationSchemas";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { auth, db } from "config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Path } from "routes/routing";
import { useDispatch, useSelector } from "react-redux";
import { userCredentials } from "../../../redux/userSlice";
import { updatePassword, updateProfile } from "firebase/auth";
import { updateUserCredentials } from "redux/userSlice";

interface EditProfileProps {}

interface EditProfileForm {
  name: string;
  password: string;
}

const initialState: EditProfileForm = {
  name: '',
  password: '',
};

const EditProfile: React.FC<EditProfileProps> = () => {
  const navigate = useNavigate();
  const [isSaving, startSaving] = useTransition();
  const { user } = useSelector(userCredentials);
  const action = useDispatch();

  const editProfile = async ({name, password}: EditProfileForm) => {
    try {
      if(user && auth.currentUser){
        const docRef = doc(collection(db, "users"), user.id)

        await updateDoc(docRef, {
          name: name,
          password: password,
        })
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        await updatePassword(auth.currentUser, password);

        if(name) {
          action(updateUserCredentials({
              username: name,
          }))
        }
        navigate(Path.UserProfile);
      }

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const submitForm = (data: EditProfileForm) => {
    startSaving(() => {
      void editProfile(data);
    });
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: initialState,
    validationSchema: EditProfileSchema,
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
          <ManageAccountsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit profile
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
            label="New username"
            name="name"
            autoComplete="off"
            autoFocus
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            autoComplete="off"
            label="New password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
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
            Edit profile
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
