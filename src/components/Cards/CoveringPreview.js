import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const CoveringPreview = (props) => {
  const { open, setOpen, avatar, name } = props

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
      <div className="videoPreviewContainer">
        <div className="spaceBetween">
          <p className="cardBigTitle" style={{ color: 'var(--secondaryWhiteColor)' }}>
            {name}
          </p>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "var(--secondaryWhiteColor)" }} />
          </IconButton>
        </div>
        <div>
          <video style={{ width: '100%', height: '65%', marginTop: '20px', borderRadius: '5px' }} controls>
            <source src={avatar} type="video/mp4" />
          </video>
        </div>
      </div>
    </Modal>
  )
}

export default CoveringPreview