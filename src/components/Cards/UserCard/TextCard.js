import { useState } from "react";
import { swiperGeer } from "../../../assets";
import TextPreview from "./Preview/TextPreview";

const TextCard = (props) => {
  const [open, setOpen] = useState(false)

  const { name, avatar, content } = props;

  const handleMore = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="textCard">
        <div className="textCardTop">
          <img src={avatar} alt="avatar" />
          <div className="cardBigTitle">{name}</div>
        </div>
        <div className="fade-text">
          {content}
        </div>
        <p className="cardDescription" onClick={handleMore}>Читать полный отзыв</p>
        <img className="swiperGeer" src={swiperGeer} alt="swiperGeer" />
      </div >
      <TextPreview name={name} avatar={avatar} content={content} open={open} setOpen={setOpen} />
    </>
  )
}

export default TextCard;