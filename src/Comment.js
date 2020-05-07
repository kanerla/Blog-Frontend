/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import API_URL from './API_URL'
import './comment.css'

// Form for user to fill in name and comment -- works perfectly fine
const CommentForm = (props) => {
  let author
  let comment

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(author + ' : ' + comment)
    props.addComment(author, comment)
    author = ''
    comment = ''
    // clear author and comment
  }

  const handleNameInput = e => {
    author = e.target.value
  }

  const handleCommentInput = e => {
    comment = e.target.value
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-form-fields">
        <input placeholder="Name" required value={author} onChange={handleNameInput}/><br />
        <textarea placeholder="Comment" rows="4" required value={comment} onChange={handleCommentInput} />
      </div>
      <div className="comment-form-actions">
        <button type="submit">Post Comment</button>
        <Button
          type='submit'
          color='secondary'
          variant='contained'>
          Post Comment
        </Button>
      </div>
    </form>
  )
}

// Individual comment
// Format timestamp
const Comment = ({ comment, admin }) =>
  <div className="comment">
    <p className="comment-header">{comment.author}</p>
    <p className='comment-timestamp'>{new Date(comment.timestamp).toLocaleString()}</p>
    <p className="comment-body">{comment.text}</p>
    {admin ? null : <Button>Delete Comment</Button>}
  </div>

const Comments = ({ comments }) =>
  <div className='comments'>
    {comments.map((comment, index) => <Comment comment={comment} key={comment.id} />)}
  </div>

const Form = ({ addComment }) => {
  const [newComment, setNewComment] = useState({ author: '', text: '' })
  return (
    <form className='commentForm' autoComplete='off' onSubmit={(e) => {
      e.preventDefault()
      addComment(newComment, setNewComment)
    }}>
      <TextField name='authorField' required value={newComment.author} onChange={e => setNewComment({ author: e.target.value, text: newComment.text }) } variant='outlined' label='Author' />
      <div>
        <TextField
          name='textField'
          required value={newComment.text} onChange={e => setNewComment({ text: e.target.value, author: newComment.author })}
          variant='outlined' label='Comment' rows={4} multiline fullWidth/>
      </div>
      <Button type='submit' color='secondary' variant='contained'>Post Comment</Button>
    </form>
  )
}

// The whole comment section
export const CommentBox = (props) => {
  const [comments, setComments] = useState(props.comments)
  const [visible, setVisible] = useState(false)

  const addComment = (newComment, setNewComment) => {
    console.log('post id ' + props.postID)
    fetch(
      `${API_URL}/posts/${props.postID}/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      })
      .then(response => response.json())
      .then(c => setComments(comments.concat(c)))

    setNewComment({ author: '', text: '' })
    console.log(comments.length)
    comments.forEach(console.log)
  }

  return (
    <div className="comment-box">
      <a id='comments' href="#" onClick={(e) => {
        e.preventDefault()
        setVisible(!visible)
      }}>
        {visible ? 'Hide comments' : `Show ${comments.length} comments`}
      </a>
      { visible
        ? <>
          <h3>Comments</h3>
          <Comments comments={comments}/>
          <Form addComment={addComment}/>
        </>
        : null }
      {/* <CommentForm addComment={addComment}/> */}
    </div>
  )
}
