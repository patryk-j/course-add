import * as yup from "yup";

const emailValidator = yup
  .string()
  .email("Enter a valid email")
  .required("Email is required");

const usernameValidator = yup
  .string()
  .min(4, "Username should be of minimum 4 characters length")
  .required("Username is required");

const passwordValidator = yup
  .string()
  .min(8, "Password should be of minimum 8 characters length")
  .required("Password is required");

const confirmPasswordValidator = yup
  .string()
  .required("Please retype your password")
  .oneOf([yup.ref("password")], "Your passwords do not match");

const courseTitleValidator = yup
  .string()
  .min(3, "Title should be of minimum 3 characters length")
  .required("Title is required");

const courseCategoryValidator = yup
  .string()
  .min(3, "Category should be of minimum 3 characters length")
  .required("Category is required");
const courseDescriptionValidator = yup
  .string()
  .min(10, "Description should be of minimum 10 characters length")
  .required("Description is required");

const lessonPreferencesValidator = yup
  .array()
  .required("Preferences is required");

export const signInSchema = yup.object({
  email: emailValidator,
  password: passwordValidator,
});

export const signUpSchema = yup.object({
  email: emailValidator,
  name: usernameValidator,
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator,
});

export const addCourseSchema = yup.object({
  title: courseTitleValidator,
  category: courseCategoryValidator,
  description: courseDescriptionValidator,
});

export const EditProfileSchema = yup.object({
  name: usernameValidator,
  password: passwordValidator,
})
