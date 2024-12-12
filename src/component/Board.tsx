import { useState, useEffect } from "react";
import "./Board.css";
import Frame from "./Frame.tsx";
import axios from "axios";

export default function Board() {
  const [tagId, setTagId] = useState("1");
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("1");
  const [tags, setTags] = useState([]);
  const [post, setPost] = useState({"title": "", "content": "", "create_year": 0, "create_month": 0, "create_date": 0});
  const [tag, setTag] = useState({"tag_name": ""});
  const [error, setError] = useState(null);

  //get post list
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/posts?tag_id=${tagId}`);
        setPosts(res.data);
        setPostId(res.data[0].id);
      } catch (err) {
        setError(err);
      }
    };

    fetchPosts();
  }, [tagId]);

  //get post detail
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPost();
  }, [postId]);

  //get tag list
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:3001/tags");
        setTags(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchTags();
  }, []);

  //get tag detail
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/tags/${tagId}`);
        setTag(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchTag();
  }, [tagId]);

  return (
    <Frame 
      left={<TagList tags={tags} tagId={tagId} setTagId={setTagId} />} 
      top={<BoardTop tag={tag} />}
      selectIdx={0}
    >
      <div className="board">
        {/* 본문 */}
        <div className="article">
          {/* 제목 */}
          <div className="article-title">
            {post.title}
            <span className="article-crate-time">
              {post.create_year % 100}.{post.create_month}.{post.create_date}
            </span>
          </div>
          {/* 글 */}
          <div className="article-body">
            {post.content}
          </div>
        </div>

        {/* 제목 목록 */}
        <div className="board-list">
          {posts.map((post) => {
            return (
              <div 
                className={`list-element ${post.id === postId ? "list-element-select" : ""}`}
                onClick={() => {setPostId(post.id)}}
              >
                {post.title}
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

function TagList({ tags, tagId, setTagId }) {
  return (
    <div>
      {tags.map((tag) => {
        return (
          <div 
            className={`tag ${tag.id === tagId ? "tag-selected" : ""}`}
            onClick={() => setTagId(tag.id)}
          >
            # {tag.name}
          </div>
        );
      })}
    </div>
  );
}

function BoardTop({ tag }) {
  return (
    <div>
      {tag.name}
    </div>
  );
}