# `Course creator`

![coursepage](https://firebasestorage.googleapis.com/v0/b/course-app-fb4f5.appspot.com/o/courses.PNG?alt=media&token=8a6dd8cb-c219-4061-a899-0de67f6ddd33)

## Description

Course creator is a front-end application that allows you to create courses based on VARK teaching strategies - a questionnaire that helps your learning by suggesting the strategies you should be using (more detailed description below). After registering, each user has to fill in a questionnaire consisting of sixteen questions to define preferences. Thanks to this, the user knows which preference is his dominant, which is important, because the lessons displayed in the course will be matched to the teaching style defined after completing the survey. However, if the user finds that the content of the chosen teaching style does not suit him, there is a quiz inside the course, in which, after giving the wrong answer, the user gets the option to change preferences. As you change your preferences, the lesson content will change to suit your teaching style as much as possible

## VARK

Neil Fleming introduced an VARK inventory in 1987 that was designed to help students and others learn more about their individual learning preferences.  According to the VARK model, learners are identified by whether they have a preference for:
- Visual learning (pictures, movies, diagrams)
- Auditory learning (music, discussion, lectures)
- Reading and writing (making lists, reading textbooks, taking notes)
- Kinesthetic learning (movement, experiments, hands-on activities)
The course creator application uses VARK to make it easier for students and teachers to create and learn in accordance with these principles so that learning is as effective as possible


## Features

- User registration
- VARK questionnaire 
- Profile with VARK preferences description
- Profile edit (username and password)
- Authentication using Firebase Authentication
- Creating and deleting courses
- List of courses
- Validation of forms and data
- Adding and deleting lessons
- Quiz with the ability to change preferences
- HTML editor

## Built with

- [React.js](https://pl.reactjs.org/) ^18.0.0
- [TypeScript](https://www.typescriptlang.org/) ^4.6.3
- [react-router](https://reactrouter.com/) ^6.3.0
- [Redux](https://redux.js.org/) ^4.1.2
- [Material UI](https://mui.com/) ^5.6.1
- [Formik](https://formik.org/) ^2.2.9
- [Firebase](https://firebase.google.com/) ^9.6.11
- [Node](https://nodejs.org/en/) ^16.11.27
- [yup](https://www.npmjs.com/package/yup) ^0.32.11


## Getting started

If you want, you can test the course creator application at the link: https://course-app-fb4f5.web.app or just clone the repository, install and run the application (instructions below).
The first thing you need to do is register as a new user, without this you will not be able to access the functionality of the site. The form is validated with the username and password. The next step is to complete the required survey which will determine the VARK preference. After logging in, you can use the available courses or, if you are the authorized person, create your own course.

## Installation

1. Clone repository

    ```txt
    git clone https://github.com/patryk-j/course-creator/
    ```

2. Install requierd packages using npm:

    ```txt
    npm install
    ```

## Usage

To run the application simply paste and run the following command:

```txt
    npm start
```

## License

Distributed under the MIT License. See `LICENSE.txt`
