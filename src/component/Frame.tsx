import "./Frame.css";
import { Link } from "react-router-dom";

interface FrameProps {
  left: React.ReactNode;
  top: React.ReactNode;
  selectIdx: number;
  children: React.ReactNode;
}

export default function Frame({ left, top, selectIdx, children }: FrameProps) {
  //common structure
  return (
    <>
      <LeftBar content={left} selectIdx={selectIdx} />
      <div className="container"> 
        <TopBar content={top} />
        {children}
      </div>
    </>
  );
}

function LeftBar({ content, selectIdx }) {
  return (
    <div className="left-bar">
      <Link to="/" className="link">
        <div className="logo">
          leti
        </div>
      </Link>
      {/*main buttons*/}
      <div className="display-btn-cover">
        <Link to="/" className="link">
          <button className={`display-btn ${selectIdx === 0 ? "display-btn-select" : ""}`}>
            <img src={`../img/tag_${selectIdx === 0 ? "white" : "black"}.png`} alt="img" />
            <div className="display-btn-txt">board</div>
          </button>
        </Link>
        <Link to="/calendar" className="link">
          <button className={`display-btn ${selectIdx === 1 ? "display-btn-select" : ""}`}>
            <img src={`../img/calendar_${selectIdx === 1 ? "white" : "black"}.png`} alt="img" />
            <div className="display-btn-txt">calendar</div>
          </button>
        </Link>
        <Link to="/write" className="link">
          <button className={`display-btn ${selectIdx === 2 ? "display-btn-select" : ""}`}>
            <img src={`../img/write_${selectIdx === 2 ? "white" : "black"}.png`} alt="img" />
            <div className="display-btn-txt">writing</div>
          </button>
        </Link>
      </div>
      <div className="sub-btn-cover">
        {content}
      </div>
    </div>
  );
}

function TopBar({ content }) {
  return (
    <div className="top-bar">
      {content}
      <img src="../img/user.png" alt="user" className="user-icon" />
    </div>
  );
}