import { useState } from "react";
import "./Board.css";
import Frame from "./Frame.tsx";

export default function Board() {
  const tagList: string[] = ["root", "lorem", "ipsum", "dolor", "sit"];
  const [selectedTag, setSelectedTag] = useState(0);
  const [selectedTil, setSelectedTil] = useState(0);
  const boardList: string[] = ["title1", "hello world", "i dont konw"];

  return (
    <Frame 
      left={<TagList />} 
      top={<BoardTop selectedTag={tagList[selectedTag]} />}
      selectIdx={0}
    >
      <div className="board">
        <div className="article">
          <div className="article-title">
            lorem ipsum
          </div>
          <div className="article-body">
            lorem ipsum dolor sit
          </div>
        </div>
        <div className="board-list">
          {boardList.map((element, idx) => {
            return (
              <div 
                className={`list-element ${idx === selectedTil ? "list-element-select" : ""}`}
                onClick={() => {setSelectedTil(idx)}}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

function TagList() {
  const tagList: string[] = ["root", "lorem", "ipsum", "dolor", "sit"];
  let tagRelation: number[][] = [[1, 4], [2], [3], []]; //adjecent list

  return (
    <div>
      <div className="tag">lorem</div>
      <div className="tag">ipsum</div>
      <div className="tag">dolor</div>
      <div className="tag">lorem</div>
    </div>
  );
}

function BoardTop({ selectedTag }) {
  return (
    <div>
      {selectedTag}
    </div>
  );
}