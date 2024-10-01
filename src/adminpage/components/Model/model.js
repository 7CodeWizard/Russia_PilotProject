import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { insertSolution } from '../../../api/caseAPI';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { Box } from '@mui/material';

export default function FormDialog({ opened, idd, onClose }) {
    const [formData, setFormData] = React.useState({
        content: "",
        images: [{ title: '', image: '' }],
        idd: idd
    });

    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState({ contentError: false, fileError: false });  // Manage both content and file errors

    const handleClose = () => {
        setFormData({ content: "", images: [{ title: '', image: '' }], idd });
        setFiles([]);
        setError({ contentError: false, fileError: false });  // Reset errors on close
        onClose();
    };

    const updateFiles = (incomingFiles) => {
        const updatedFiles = incomingFiles.map((file) => ({
            image: file,
            title: ''
        }));
        setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
        setError((prev) => ({ ...prev, fileError: false }));  // Clear file error when files are uploaded
    };

    const handleContentChange = (index, event) => {
        const updatedFilesData = [...files];
        updatedFilesData[index].title = event.target.value;
        setFiles(updatedFilesData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError((prev) => ({ ...prev, contentError: false }));  // Clear content error on typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let contentError = !formData.content.trim();
        let fileError = files.length === 0;

        if (contentError || fileError) {
            setError({ contentError, fileError });
            return;
        }

        let newFormData = new FormData();
        newFormData.append('content', formData.content);
        newFormData.append('idd', idd);

        files.forEach((file) => {
            newFormData.append('images', file.image.file);
        });

        files.forEach((file) => {
            newFormData.append('imageContent', file.title);
        });

        insertSolution(newFormData).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                handleClose()
            }
        });
    };

    return (
        <Dialog
            open={opened}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Add Solution</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Content"
                    multiline
                    rows={4}
                    name="content"
                    variant="outlined"
                    size="small"
                    sx={{ my: 1 }}
                    value={formData.content}
                    onChange={handleChange}
                    required
                    error={error.contentError}  // Show error state in the TextField
                    helperText={error.contentError ? "Content is required" : ""}
                />
                <Dropzone onChange={updateFiles} >
                    {files.map((file, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <FileMosaic {...file.image} preview />
                            <TextField
                                label="Title"
                                name="title"
                                variant="outlined"
                                size="small"
                                sx={{ my: 1, width: '130px' }}
                                value={file.title}
                                onChange={(e) => handleContentChange(index, e)}
                                onClick={(e) => e.stopPropagation()}
                                required
                            />
                        </Box>
                    ))}
                </Dropzone>
                {error.fileError && <DialogContentText color="error">At least one file is required.</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
