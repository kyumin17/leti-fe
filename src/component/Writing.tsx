import "./Writing.css";
import Frame from "./Frame.tsx";
import { useState, useRef } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";

export default function Writing() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  return (
    <Frame
      left={<div>+ new page</div>}
      top={<div>today I learned</div>}
      selectIdx={2}
    >
      <div className="editor">
        <ToolBar editorState={editorState} setEditorState={setEditorState} />
        <TextArea editorState={editorState} setEditorState={setEditorState} />
      </div>
    </Frame>
  );
}

function ToolBar({ editorState, setEditorState }) {
  function toggleStyle(event: React.MouseEvent<HTMLButtonElement>, style: string) {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  function toggleHeader(event: React.MouseEvent<HTMLButtonElement>, size: string) {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, `header-${size}`));
  }

  return (
    <div className="tool-bar">
      <div className="deco-tools">
        <button className="tool" onClick={(e) => {toggleHeader(e, "two")}}>
          h1
        </button>
        <button className="tool" onClick={(e) => {toggleHeader(e, "three")}}>
          h2
        </button>
        <button className="tool" onClick={(e) => {toggleHeader(e, "four")}}>
          h3
        </button>
        <button className="tool" onClick={(e) => {toggleStyle(e, "BOLD")}}>
          <span style={{fontWeight: "500"}}>B</span>
        </button>
        <button className="tool" onClick={(e) => {toggleStyle(e, "ITALIC")}}>
          <i>i</i>
        </button>
        <button className="tool" onClick={(e) => {toggleStyle(e, "UNDERLINE")}}>
          <span style={{textDecoration: "underline"}}>U</span>
        </button>
        <button className="tool" onClick={(e) => {toggleStyle(e, "STRIKETHROUGH")}}>
          <span style={{textDecoration: "line-through"}}>T</span>
        </button>
      </div>
      <div className="insert-tools">
        <button className="tool">
          <img src="../img/code.png" className="code-icon" alt="code" />
        </button>
        <button className="tool">
          <img src="../img/image.png" className="image-icon" alt="img" />
        </button>
        <button className="tool">
          <img src="../img/link.png" className="link-icon" alt="link" />
        </button>
      </div>
    </div>
  );
}

function TextArea({ editorState, setEditorState }) {
  const titleRef = useRef(null);

  async function savePost() {
    const title = titleRef.current.value;
    const content = editorState.getCurrentContent().getPlainText();

    if (!title || !content) {
      alert("please write title or content");
      return;
    }

    // 임시 데이터
    const form = {
      user_id: 1,
      tag_id: 1,
      tag_name: "frontend",
      title: titleRef.current.value,
      content: editorState.getCurrentContent().getPlainText(),
      create_year: 2024,
      create_month: 10,
      create_date: 3
    };

    try {
      await axios.post("http://localhost:3001/posts", form);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-area">
      <div className="text-area-header">
        <input type="text" className="text-area-title" spellCheck="false" placeholder="untitled" ref={titleRef} />
        <button onClick={savePost}>
          save
        </button>
      </div>
      <div className="text-area-body">
        <Editor 
          editorState={editorState} 
          onChange={setEditorState} 
          placeholder="Write what you learned"
        />
      </div>
    </div>
  );
}