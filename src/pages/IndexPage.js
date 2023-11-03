import Post from "../Post";
import {useEffect, useState} from "react";
import { API_URL } from "../services/API_URL";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/post`).then(response => {
      response.json().then(posts => {
        console.log("these are the posts",posts)
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
        {
            posts.length ? 
            <>
                {
                    posts.map((post) => {
                        return <Post {...post} />
                    })
                }
            </>
            : <p>Wave Riding...</p>
        }
    </>
)
}