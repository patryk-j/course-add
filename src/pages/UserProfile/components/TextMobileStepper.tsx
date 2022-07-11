/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const steps = [
  {
    label: 'Visual (V)',
    description: `This preference includes the depiction of information in maps, spider diagrams, charts, graphs, flow charts, labelled diagrams, and all the symbolic arrows, circles, hierarchies and other devices, that people use to represent what could have been presented in words. 
    This mode could have been called Graphic (G) as that better explains what it covers. It does NOT include still pictures or photographs of reality, movies, videos or PowerPoint. 
    It does include designs, whitespace, patterns and shapes `,
    image: 'https://firebasestorage.googleapis.com/v0/b/course-app-fb4f5.appspot.com/o/eye.jpg?alt=media&token=bd23b8c6-455f-4093-a21a-60bc625aa952',
  },
  {
    label: 'Aural / Auditory (A)',
    description:
      `This perceptual mode describes a preference for information that is “heard or spoken.”
       Learners who have this as their main preference report that they learn best from lectures, group discussion, radio, email, using mobile phones, speaking, web-chat and talking things through. 
       Email is included here because; although it is text and could be included in the Read/write category (below), it is often written in chat-style with abbreviations, colloquial terms, slang and non-formal language. 
       The Aural preference includes talking out loud as well as talking to oneself.`,
    image: 'https://firebasestorage.googleapis.com/v0/b/course-app-fb4f5.appspot.com/o/test.jpg?alt=media&token=a4fbda00-18f2-4070-9e8c-f8c3f8aff321',
  },
  {
    label: 'Read / write (R)',
    description: `This preference is for information displayed as words. 
    Not surprisingly, many teachers and students have a strong preference for this mode. 
    Being able to write well and read widely are attributes sought by employers of graduates. 
    This preference emphasizes text-based input and output – reading and writing in all its forms but especially manuals, reports, essays and assignments. 
    People who prefer this modality are often addicted to PowerPoint, the Internet, lists, diaries, dictionaries, thesauri, quotations and words`,
    image: 'https://firebasestorage.googleapis.com/v0/b/course-app-fb4f5.appspot.com/o/pen.jpg?alt=media&token=88cf7365-579e-4d2f-ab72-40c676333bf5'
  },
  {
    label: 'Kinesthetic (K)',
    description: `By definition, this modality refers to the “perceptual preference related to the use of experience and practice (simulated or real).” 
    It includes demonstrations, simulations, videos and movies of “real” things, as well as case studies, practice and applications. 
    The key is the reality or concrete nature of the example. If it can be grasped, held, tasted, or felt it will probably be included. 
    People with this as a strong preference learn from the experience of doing something and they value their own background of experiences and less so, the experiences of others. 
    `,
    image: 'https://firebasestorage.googleapis.com/v0/b/course-app-fb4f5.appspot.com/o/bulb.jpg?alt=media&token=27eda7ff-7906-40e3-9312-b46bbf2be559',
  },
];

export default function TextMobileStepper() {
  return (
    <div>
      <Grid
        container
        width="100%"
        justifyContent="space-around"
        alignItems="center"
        direction="row"
        columnGap={10}
        rowGap={4}
      >

        {steps &&
          steps.map(({ label, description, image }) => (
            <Card style={{ width: "510px", height: "560px", textAlign: 'justify', }} key={label}>
              <CardMedia
                image={image}
                component="img"
                height="300"
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
                    {label}
                  </Typography>
                </Box>
                <Typography gutterBottom variant="subtitle2" component="h5">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        <Card style={{ width: "380px", height: "360px", textAlign: 'justify', marginBottom: '20px' }}>
          <CardContent>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                VARK
              </Typography>
            </Box>
            <Typography gutterBottom variant="subtitle2" component="h5" p='2'>
              The acronym VARK stands for Visual, Aural, Read/write, and Kinesthetic sensory modalities that are used for learning information.
              Fleming and Mills (1992) suggested four modalities that seemed to reflect the experiences of the students and teachers.
              Although there is some overlap between them they are defined as follows.
              Note the VARK preferences.
              Remember life (and work) are multimodal so there are no hard and fast boundaries.
              The above descriptions will help you understand the main features of your
              preferences, which you received after completing the survey.

            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}