import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import { API_URL } from "../services/API_URL";
import axios from "axios";

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const [comment, setComment] = useState('')
  const {userInfo} = useContext(UserContext);
  console.log(userInfo)
  const {id} = useParams();

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const addComment = (e) => {
    e.preventDefault()

    let data = {comment: comment}

    let token = localStorage.getItem('authToken')

    axios.post(`${API_URL}/new-comment/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        setPostInfo(response.data);
      })
      .catch((err) => {
        console.log(err)
      })  
    .catch((err) => {
      console.log(err)
    })
    setComment('')

  }
  useEffect(() => {
    fetch(`${API_URL}/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
            console.log("this is the post info", postInfo)
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      {/* <div className="author">by @{postInfo.author.username}</div> */}
      {/* {userInfo.id === postInfo.author._id && ( */}
      {userInfo && userInfo._id === postInfo.author._id ? 
      ( <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit Flip
          </Link>
        </div>) : null
    }
       
      {/* )} */}
      <div className="image">
        {/* <img src={postInfo.cover} alt=""/> */}
        <img src={postInfo.cover} />
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
      <hr />

      <div>
        <form onSubmit={addComment}>
          <h2>Add Comment Clam 🦪</h2>
          <label>New Comment:
            <input type="text" name="comment" onChange={handleChange} value={comment} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {postInfo.comments.length ? 
        <>
          {
            postInfo.comments.map((comment) => {
              return (
                <div>
                  <p>{comment.comment}</p>
                  <h5>{comment.author.username}</h5>     
                </div>
              )
            })
          }
        </>
        : 
        <p>No comment clams...</p>}
      </div>

    </div>
  );
}
