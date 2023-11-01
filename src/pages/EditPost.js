import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";
import { photoUpload } from "../services/photoUpload";
import { API_URL } from "../services/API_URL";
import axios from 'axios'

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false)

  const handleFileChange = (e) => {
    setDisabled(true)
    photoUpload(e)
    .then((response) => {
      setFiles(response.data.image)
      setDisabled(false)
    })
    .catch((err) => {
      console.log(err)
      setDisabled(false)
    })
  }

  useEffect(() => {
    fetch(API_URL + "/post/" + id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setFiles(postInfo.files)
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    let data = {
      title,
      summary,
      content,
      files,
      id
    }

    let token = localStorage.getItem('authToken')
    const response = await axios.put(`${API_URL}/post`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.cover) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Tidal Wave'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Swimmary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={handleFileChange} />
      <Editor onChange={setContent} value={content} />
      <button disabled={disabled} style={{marginTop:'5px'}}>Update Flip</button>
    </form>
  );
}