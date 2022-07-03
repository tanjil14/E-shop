import JoditEditor from "jodit-react";
import { useRef } from "react";
const RichTextEditor = ({  content, setContent }) => {
  const editor = useRef(null);
  return (
    <JoditEditor
      ref={editor}
      value={content}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default RichTextEditor;
