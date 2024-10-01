import * as React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'

import { insertSolution } from '../../../api/caseAPI'
import { Dropzone, FileMosaic } from '@files-ui/react'

export default function FormDialog({ opened, idd, onClose }) {
  const [formData, setFormData] = React.useState({
    content: "",
    images: [{ title: '', image: '' }],
    idd: idd
  })

  const [files, setFiles] = React.useState([])
  const [error, setError] = React.useState({ contentError: false, fileError: false })

  const handleClose = () => {
    setFormData({ content: "", images: [{ title: '', image: '' }], idd })
    setFiles([])
    setError({ contentError: false, fileError: false })
    onClose()
  }

  const updateFiles = (incomingFiles) => {
    const updatedFiles = incomingFiles.map((file) => ({
      image: file,
      title: ''
    }))
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles])
    setError((prev) => ({ ...prev, fileError: false }))
  }

  const handleContentChange = (index, event) => {
    const updatedFilesData = [...files]
    updatedFilesData[index].title = event.target.value
    setFiles(updatedFilesData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setError((prev) => ({ ...prev, contentError: false }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let contentError = !formData.content.trim()
    let fileError = files.length === 0

    if (contentError || fileError) {
      setError({ contentError, fileError })
      return
    }

    let newFormData = new FormData()
    newFormData.append('content', formData.content)
    newFormData.append('idd', idd)

    files.forEach((file) => {
      newFormData.append('images', file.image.file)
    })

    files.forEach((file) => {
      newFormData.append('imageContent', file.title)
    })

    insertSolution(newFormData).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        handleClose()
      }
    })
  }

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        backgroundColor: 'rgba(23, 23, 23, 0.42)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <DialogTitle>Add Solution</DialogTitle>
      <DialogContent sx={{ width: '600px', boxSizing: 'border-box' }}>
        <TextField
          fullWidth label="Content" multiline rows={4} name="content" variant="outlined"
          sx={{ my: 2 }} value={formData.content}
          onChange={handleChange}
          error={error.contentError}
          helperText={error.contentError ? "Content is required" : ""}
          required
        />
        <Dropzone onChange={updateFiles} >
          {files.map((file, index) => (
            <div key={index}>
              <FileMosaic {...file.image} preview />
              <TextField label="Title" name="title" variant="outlined" size="small"
                sx={{ my: 2, width: '130px' }} value={file.title}
                onChange={(e) => handleContentChange(index, e)}
                onClick={(e) => e.stopPropagation()}
                required
              />
            </div>
          ))}
        </Dropzone>
        {error.fileError && <DialogContentText color="error">At least one file is required.</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
