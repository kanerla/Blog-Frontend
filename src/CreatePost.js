import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export const CreatePost = () => {
  return (
    <div>
      <p>This is where you create a new post</p>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        } }
        onChange={ (event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        } }
        onBlur={ (event, editor) => {
          console.log('Blur.', editor)
        } }
        onFocus={ (event, editor) => {
          console.log('Focus.', editor)
        } }
      />
    </div>
  )
}