import { Preferences, Question } from "../models/questionnaire";

export const questions: Question[] = [
  {
    text: "Question 1: I want to find out about a house or an apartment. Before visiting it I would want:",
    answers: [
      {
        label: "to view a video of the property.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "a printed description of the rooms and features.",
        preference: Preferences.Read,
      },
      {
        label: "a plan showing the rooms and a map of the area.",
        preference: Preferences.Visual,
      },
      { label: "a discussion with the owner.", preference: Preferences.Aural },
    ],
  },
  {
    text: "Question 2: I have a problem with my heart. I would prefer that the doctor:",
    answers: [
      {
        label: "described what was wrong.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "gave me something to read to explain what was wrong.",
        preference: Preferences.Read,
      },
      {
        label: "used a plastic model to show me what was wrong.",
        preference: Preferences.Visual,
      },
      {
        label: "showed me a diagram of what was wrong.",
        preference: Preferences.Aural,
      },
    ],
  },
  {
    text: "Question 3: When choosing a career or area of study, these are important for me:",
    answers: [
      {
        label: "Working with designs, maps or charts.",
        preference: Preferences.Visual,
      },
      {
        label: "Using words well in written communications.",
        preference: Preferences.Read,
      },
      {
        label: "Applying my knowledge in real situations.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "Communicating with others through discussion.",
        preference: Preferences.Aural,
      },
    ],
  },
  {
    text: "Question 4: When learning from the Internet I like:",
    answers: [
      {
        label: "audio channels where I can listen to podcasts or interviews.",
        preference: Preferences.Aural,
      },
      {
        label: "videos showing how to do or make things.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "interesting written descriptions, lists and explanations.",
        preference: Preferences.Read,
      },
      {
        label: "interesting design and visual features.",
        preference: Preferences.Visual,
      },
    ],
  },
  {
    text: "Question 5: I want to find out more about a tour that I am going on. I would:",
    answers: [
      {
        label: "use a map and see where the places are.",
        preference: Preferences.Visual,
      },
      {
        label:
          "talk with the person who planned the tour or others who are going on the tour.",
        preference: Preferences.Aural,
      },
      {
        label:
          "look at details about the highlights and activities on the tour.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "read about the tour on the itinerary.",
        preference: Preferences.Read,
      },
    ],
  },
  {
    text: "Question 6: I need to find the way to a shop that a friend has recommended. I would:",
    answers: [
      {
        label: "use a map.",
        preference: Preferences.Visual,
      },
      {
        label: "find out where the shop is in relation to somewhere I know.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "write down the street directions I need to remember.",
        preference: Preferences.Read,
      },
      {
        label: "ask my friend to tell me the directions.",
        preference: Preferences.Aural,
      },
    ],
  },
  {
    text: "Question 7: I want to learn how to play a new board game or card game. I would:",
    answers: [
      {
        label: "listen to somebody explaining it and ask questions.",
        preference: Preferences.Aural,
      },
      {
        label: "watch others play the game before joining in.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "read the instructions.",
        preference: Preferences.Read,
      },
      {
        label:
          "use the diagrams that explain the various stages, moves and strategies in the game.",
        preference: Preferences.Visual,
      },
    ],
  },
  {
    text: "Question 8: When I am learning I:",
    answers: [
      {
        label: "read books, articles and handouts.",
        preference: Preferences.Read,
      },
      {
        label: "use examples and applications.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "see patterns in things.",
        preference: Preferences.Visual,
      },
      {
        label: "like to talk things through.",
        preference: Preferences.Aural,
      },
    ],
  },
  {
    text: "Question 9: I want to save more money and to decide between a range of options. I would:",
    answers: [
      {
        label: "talk with an expert about the options.",
        preference: Preferences.Aural,
      },
      {
        label:
          "use graphs showing different options for different time periods.",
        preference: Preferences.Visual,
      },
      {
        label:
          "consider examples of each option using my financial information.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "read a print brochure that describes the options in detail.",
        preference: Preferences.Read,
      },
    ],
  },
  {
    text: "Question 10: I want to learn about a new project. I would ask for:",
    answers: [
      {
        label: "an opportunity to discuss the project.",
        preference: Preferences.Aural,
      },
      {
        label: "examples where the project has been used successfully.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "a written report describing the main features of the project.",
        preference: Preferences.Read,
      },
      {
        label:
          "diagrams to show the project stages with charts of benefits and costs.",
        preference: Preferences.Visual,
      },
    ],
  },
  {
    text: "Question 11: A website has a video showing how to make a special graph or chart. There is a person speaking, some lists and words describing what to do and some diagrams. I would learn most from:",
    answers: [
      {
        label: "watching the actions.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "seeing the diagrams.",
        preference: Preferences.Visual,
      },
      {
        label: "reading the words.",
        preference: Preferences.Read,
      },
      {
        label: "listening..",
        preference: Preferences.Aural,
      },
    ],
  },
  {
    text: "Question 12: I have finished a competition or test and I would like some feedback. I would like to have feedback:",
    answers: [
      {
        label: "using a written description of my results.",
        preference: Preferences.Read,
      },
      {
        label: "from somebody who talks it through with me.",
        preference: Preferences.Aural,
      },
      {
        label: "using graphs showing what I achieved..",
        preference: Preferences.Visual,
      },
      {
        label: "using examples from what I have done.",
        preference: Preferences.Kinesthetic,
      },
    ],
  },
  {
    text: "Question 13: I want to learn to do something new on a computer. I would:",
    answers: [
      {
        label: "read the written instructions that came with the program.",
        preference: Preferences.Read,
      },
      {
        label: "start using it and learn by trial and error",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "follow the diagrams in a book.",
        preference: Preferences.Visual,
      },
      {
        label: "talk with people who know about the program.",
        preference: Preferences.Aural,
      },
    ],
  },
  {
    text: "Question 14: I want to assemble a wooden table that came in parts (kitset). I would learn best from:",
    answers: [
      {
        label: "diagrams showing each stage of the assembly.",
        preference: Preferences.Visual,
      },
      {
        label: "watching a video of a person assembling a similar table.",
        preference: Preferences.Kinesthetic,
      },
      {
        label: "advice from someone who has done it before.",
        preference: Preferences.Aural,
      },
      {
        label: "written instructions that came with the parts for the table.",
        preference: Preferences.Read,
      },
    ],
  },
  {
    text: "Question 15: I want to learn how to take better photos. I would:",
    answers: [
      {
        label: "use the written instructions about what to do.",
        preference: Preferences.Read,
      },
      {
        label: "use diagrams showing the camera and what each part does.",
        preference: Preferences.Visual,
      },
      {
        label: "ask questions and talk about the camera and its features.",
        preference: Preferences.Aural,
      },
      {
        label:
          "use examples of good and poor photos showing how to improve them.",
        preference: Preferences.Kinesthetic,
      },
    ],
  },
  {
    text: "Question 16: I prefer a presenter or a teacher who uses:",
    answers: [
      {
        label: "demonstrations, models or practical sessions.",
        preference: Preferences.Kinesthetic,
      },
      {
        label:
          "question and answer, talk, group discussion, or guest speakers.",
        preference: Preferences.Aural,
      },
      {
        label: "handouts, books, or readings.",
        preference: Preferences.Read,
      },
      {
        label: "diagrams, charts, maps or graphs.",
        preference: Preferences.Visual,
      },
    ],
  },
];
