import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState, useContext} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";
import axios from "axios";
import { API_URL } from "../services/API_URL";
import { photoUpload } from "../services/photoUpload";

import { UserContext } from "../UserContext";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const {userInfo} = useContext(UserContext);

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
  async function createNewPost(ev) {
    ev.preventDefault();
    const data = {
      title,
      summary,
      content,
      files,
      author:  userInfo._id
    }

    console.log("Data", data)

    const response = await axios.post(`${API_URL}/post`, data);
    if (response.data.cover) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
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
      <Editor value={content} onChange={setContent} />
      <button disabled={disabled} style={{marginTop:'5px'}}>Create Flip</button>
    </form>
  );
}