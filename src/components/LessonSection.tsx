import React, { FC, useRef} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Preferences } from "../models/questionnaire";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface EditorProps {
  onPreferenceChange: (preferences: any, sectionNumber: number) => void;
  onContentChange: (content: string, sectionNumber: number) => void;
  preferences: Preferences[];
  index: number;
  initialValue?: string;
}

export const LessonSection: FC<EditorProps> = ({
  onPreferenceChange,
  onContentChange,
  preferences,
  index,
  initialValue,
}) => {
  const editorRef = useRef<any>();

  const handlePreferenceChange = (e: SelectChangeEvent<Preferences[]>) => {
    onPreferenceChange(e.target.value, index);
  };

  const handleEditorChange = (content: string) => {
    onContentChange(content, index);
  };

  return (
    <>
      <FormControl margin="normal" fullWidth>
        <InputLabel>Preferences</InputLabel>
        <Select
          multiple
          fullWidth
          multiline
          maxRows={6}
          name="preferences"
          label="preferences"
          autoComplete="preferences"
          autoFocus
          value={preferences}
          onChange={handlePreferenceChange}
        >
          <MenuItem value={Preferences.Visual}>Visual</MenuItem>
          <MenuItem value={Preferences.Aural}>Aural</MenuItem>
          <MenuItem value={Preferences.Read}>Read</MenuItem>
          <MenuItem value={Preferences.Kinesthetic}>Kinesthetic</MenuItem>
        </Select>
      </FormControl>
      <Editor
        apiKey="yoodathq1mz2n44ilqk4tv9h710l0e0hedrurpdqth2hoz65"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
        initialValue={
          initialValue || "<p>This is the initial content of the editor.</p>"
        }
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | media | image | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};
