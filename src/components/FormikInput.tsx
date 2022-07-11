import React from "react";
import { FieldAttributes, useField } from "formik";
import TextField from "@mui/material/TextField";

type TextFieldProps = { label: string } & FieldAttributes<{}>;

const FormikInput: React.FC<TextFieldProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return (
    <TextField
      {...field}
      margin="normal"
      multiline
      maxRows={4}
      sx={{ display: "flex", justifyContent: "center" }}
      label={label}
    />
  );
};

export default FormikInput;
