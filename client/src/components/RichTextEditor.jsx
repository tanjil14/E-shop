import JoditEditor from "jodit-react";
import { useRef } from "react";
const RichTextEditor = ({ placeholder, content, setContent }) => {
  const editor = useRef(null);
  const config = {
    buttons: ["bold"],
  };
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      //   onChange={(newContent) => {}}
    />
  );
};

export default RichTextEditor;
