import { Preferences } from "./questionnaire";
import { QuizState } from "./quiz";

export interface LessonSection {
  preferences: Preferences[];
  content: string;
}

export interface Lesson {
  name: string;
  sections: LessonSection[];
  quiz: QuizState;
}

export interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CoursesState {
  courses: null | Course[];
}
