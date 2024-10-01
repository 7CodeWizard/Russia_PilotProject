import { useRef, useState } from 'react';
import { white3d, whitePlay } from '../../assets'
import { ArrowDefaultButton } from '../Buttons'
import './box.css'
import { useNavigate } from 'react-router-dom';

const BigVideoBox = ({ item }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
  const navigate = useNavigate();
  const handleLink = (url) => {
    navigate(url);
  }

  return (
    <div className="sectionWrapper" style={{ paddingLeft: 0, paddingRight: 0 }}>
      {item.title &&
        <div className={`sectionHeader section2 ${item.titleCenter ? 'itemCenter' : 'sectionHeaderTitleSquare'}`}>
          <p className={`sectionTitle `}>{item.title}</p>
        </div>}
      <div className="bigVideoSquare">
        <video
          controls
          ref={videoRef}
          className="video"
          width="600"
          onClick={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          src={item.src}>
          {/* <source src={`${endpoint}/uploads/cases/${item.src}`} type="video/mp4" /> */}
        </video>
        {!isPlaying && <img src={whitePlay} alt='whitePlay' className='bigPlayIcon' onClick={handlePlayPause} />}
      </div>
      <div className='spaceBetween bigVideoSquareFooter'>
        <p className='x24Font_2'>{item.videoTitle}</p>
        <p className='x18Font_2'>{item.videoDescription}</p>
        <ArrowDefaultButton title='ПОДРОБНЕЕ' onClick={() => { handleLink('/cases') }} />
      </div>
    </div>
  )
}

const BigImageBox = ({ item }) => {

  return (
    <div className="sectionWrapper">
      <img src={item.src} alt={item.src} />
    </div>
  )
}

const Big3DBox = ({ item }) => (
  <div className="sectionWrapper" style={{ paddingLeft: 0, paddingRight: 0 }}>
    {!item.subTitle ?
      <div className="sectionHeader" style={{ textAlign: 'center' }}>
        <p className="sectionTitle">{item.title}</p>
      </div> :
      <div className='flexWrapBetween section2'>
        <div className="sectionHeader">
          <p className="sectionTitle">{item.title}</p>
        </div>
        <p className='x18font_2' style={{ maxWidth: '310px', color: 'var(--secondaryWhiteColor)' }}>{item.subTitle}</p>
      </div>}
    <div className="bigVideoSquare">
      <img src={item.src} alt='3d' style={{ width: '100%', objectFit: 'cover' }} />
      <div className='itemCenter bigPlayIcon'>
        <img src={white3d} alt='whitePlay' style={{ width: 'clamp(69px, 12vw, 151px)' }} />
      </div>
    </div>
  </div>
)

const BigCaseVideoBox = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="bigVideoSquare">
        <video
          controls
          ref={videoRef}
          className="video"
          width="600"
          onClick={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          src={src}
        />
        {!isPlaying && <img src={whitePlay} alt='whitePlay' className='bigPlayIcon' onClick={handlePlayPause} />}
      </div>
    </div>
  )
}

const TabBox = ({ title }) => (
  <button className='caseEventTab itemCenter x14_1'>{title}</button>
)

export {
  BigVideoBox, Big3DBox, BigImageBox, BigCaseVideoBox, TabBox
}