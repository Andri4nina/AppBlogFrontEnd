import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Comment_reply from '../../../../components/Comment_reply';
import Comment_visiteur from '../../../../components/Comment_visiteur';
import Blog_reply_comment from './Blog_reply_comment';

const Blog_comment_zone = ({ blogs })  => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);
 
  const fetchComments = ()=> {
    axios
        .get(`http://localhost:3000/commentaire/${blogs._id}/comments`)
        .then((res) => {
          setComments(res.data);

        })
        .catch((err) => {
          console.error('Error:', err);
          if (err.response) {
            console.error('Error response:', err.response.data);
          }
        });
      }


  return (
   <>
        <div className="max-w-5xl bounceslideInFromBottom h-96 blog-comment">
            <h5 className="pl-2 mb-5">Les commentaires</h5>
            <div className="overflow-y-hidden h-full">
                <ul className="overflow-y-scroll h-5/6">
                {comments.map((comment) => (
                    comment.type_com === 'response' ? (
                        <Comment_reply key={comment._id} comment={comment} setComments={setComments} />
                    ) : (
                        <Comment_visiteur key={comment._id} comment={comment} setComments={setComments} />
                    )
                ))}

                </ul>
            </div>
            <Blog_reply_comment blogId={blogs._id} />
        </div>
   </>
  )
}

export default Blog_comment_zone
