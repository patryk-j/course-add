import React from "react";
import { useSelector } from "react-redux";
import { userCredentials } from "redux/userSlice";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Path } from "../../routes/routing";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextMobileStepper from './components/TextMobileStepper';

interface Props {}

export const UserProfile: React.FC<Props> = () => {
  const { user } = useSelector(userCredentials);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(Path.AddCourse);
  };


  return (
    <>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between',}}>
        <Typography variant="h5" color="inherit" noWrap>
          Profile
        </Typography>
        <Typography variant="h5" color="inherit" noWrap>
          {user && `Logged as ${user.username}`}
        </Typography>
      </Toolbar>
      <Typography variant="h5" color="inherit" sx={{display: 'flex', justifyContent: 'center',paddingBottom: '30px'}}>
        {user && `Profile preference:  ${user.userPreference}`}
      </Typography>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          // paddingTop: '100px'
        }}
      >
        {user && user.isAdmin ? (
          <>
            <Grid container justifyContent="center" paddingBottom="40px">
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add new course
              </Button>
            </Grid>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
              <TextMobileStepper/>
            </Box>

          </>
        ) : (
          <>
          <Box sx={{width: '100%', display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
            <TextMobileStepper/>
          </Box>
          </>
        )}
      </Box>
    </>
  );
};
