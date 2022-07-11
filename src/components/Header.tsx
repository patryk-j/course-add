import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/system";
import { Path } from "routes/routing";
import { auth } from "config/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { RootState } from "../redux/store";
import AccountMenu from "../pages/UserProfile/components/AccountMenu";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  flexDirection: 'row',
  justifyContent: "start",
  fontFamily: "Arial",
});

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleProfile = () => {
    navigate(Path.UserProfile);
  };

  const handleCourses = () => {
    navigate(Path.Courses);
  };

  const handleLogout = () => {
    isAuthenticated
      ? signOut(auth)
          .then(() => {
            dispatch(logout());
            navigate(Path.Courses);
          })
          .catch((error) => console.error(error.toString()))
      : navigate(Path.SignIn);
  };

  return (
    <AppBar color="default" position="static">
      <StyledToolbar>
          <Typography variant="h6">COURSE CREATOR</Typography>
        <Box sx={{marginLeft: '10px'}}>
          <Button color="info" onClick={handleCourses}>
            Courses
          </Button>
          <Button color="info" onClick={handleProfile}>
            Profile
          </Button>
        </Box>
        <Box sx={{marginLeft: 'auto', marginRight: '0',}}>
        {isAuthenticated ? <AccountMenu /> :
        <Button  color="primary" variant="contained" onClick={handleLogout}>
           Sign in
        </Button>
        }
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};
