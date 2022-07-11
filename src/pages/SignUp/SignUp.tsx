import { FC, MouseEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Path } from "routes/routing";
import { useFormik } from "formik";
import { signUpSchema } from "utils/validationSchemas";
import { auth, db } from "config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "redux/userSlice";
import { doc, setDoc } from "firebase/firestore";

interface SignUpProps {}

interface SignUpFrom {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const initialState: SignUpFrom = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const Copyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {`Copyright © Course creator ${new Date().getFullYear()}.`}
  </Typography>
);

export const SignUp: FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const action = useDispatch();

  const handleSubmitForm = async ({ email, password, name }: SignUpFrom) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = user.uid;

      await updateProfile(user, {
        displayName: name,
      });
      await setDoc(doc(db, "users", userId), {
        email: email,
        name: name,
        id: userId,
        userPreference: [],
        isAdmin: false,
      });
      action(
        setUser({
          user: {
            id: userId,
            username: name,
            email: email,
            isAdmin: false,
            userPreference: [],
          },
          isAuthenticated: true,
        })
      );
    } catch (error) {
      console.error(error);
    }
    navigate(Path.Questionnaire);
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: initialState,
    validationSchema: signUpSchema,
    onSubmit: handleSubmitForm,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            name="name"
            autoComplete="name"
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
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type={isPasswordVisible ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/signIn" variant="body2">
            {"Do you have an account? Sign In"}
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
