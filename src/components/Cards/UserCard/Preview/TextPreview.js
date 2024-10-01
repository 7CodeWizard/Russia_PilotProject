import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import './preview.css'

const TextPreview = (props) => {
  const { name, avatar, content, open, setOpen } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      sx={{
        backgroundColor: 'rgba(23, 23, 23, 0.42)', // Semi-transparent background color
        backdropFilter: 'blur(8px)',  // Blur effect
      }}
    >
      <div className="textPreviewContainer">
        <div className="spaceBetween">
          <div className="alignCenter">
            <img
              style={{
                width: "75px",
                height: "74px",
                borderRadius: "50%",
              }}
              src={avatar}
              alt={avatar}
            />
            <p className="cardBigTitle" style={{ marginLeft: '22px' }}>
              {name}
            </p>
          </div>
          <IconButton style={{ marginTop: '-50px' }} onClick={handleClose}>
            <CloseIcon sx={{ color: "var(--primaryBgColor)" }} />
          </IconButton>
        </div>
        <div className="textPreviewContent">
          {content}
        </div>
      </div>
    </Modal>
  )
}

export default TextPreview