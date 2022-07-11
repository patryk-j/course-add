import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursesState } from "models/course";
import { RootState } from "redux/store";

const initialState: CoursesState = {
  courses: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export const userCourses = (state: RootState) => state.courses;

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
