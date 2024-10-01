import { Button } from '@mui/material'
import { darkArrowup, darkTelegramRound, lightArrow } from '../../assets'
import './button.css'

const DefaultButton = ({ type, onClick, title }) => (
  <button type={type} onClick={onClick} className="button defaultButton" >{title}</button>
)

const BlackButton = ({ title, onClick }) => (
  <button className="button defaultButton blackButton" onClick={onClick} >{title}</button>
)

const TabButton = ({ icon, title, onChange }) => (
  <Button
    component="label"
    sx={{
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      gap: '10px',
      textAlign: 'center',
      transition: '0.3s',
      cursor: 'pointer',
      height: '40px',
      borderRadius: '5px',
      padding: '10px 20px',
      backgroundColor: 'white',
      fontFamily: 'Mulish',
      color: 'black',
      fontSize: 'clamp(14px, 1vw, 16px)',
      fontWeight: '700',
      lineHeight: '20.08px',
      letterSpacing: '-0.03em',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'var(--secondaryWhiteHover)', // Define hover state
      },
    }}
  >
    <input type="file" name="video" hidden onChange={onChange} />
    <img src={icon} alt="darkAdd" />
    {title}
  </Button>
  // <button className='button tabButton'><img src={icon} alt='darkAdd' />{title}</button>
)

const SmallTabButton = ({ title, onClick }) => (
  <button onClick={onClick} className='button tabButton smallTabButton'>{title}</button>
)

const CircleButton = ({ icon, scale }) => (
  <button className="button circleButton" style={{ scale: scale }}><img src={icon} alt='darkTelegram' /></button>
)

const OutLinedButton = ({ onClick, title }) => (
  <button onClick={onClick} className="button defaultButton outLinedButton" >{title}</button>
)


const BigTransButton = ({ title, long, onClick }) => (
  <button className={`button transButton bigTransButton ${long ? 'bigTransButtonPadding' : ''}`} onClick={onClick} >{title}</button>
)

const SmallTransButton = ({ title }) => (
  <button className='button transButton smallTransButton'>{title}</button>
)

const HeroTopWhiteButton = ({ title }) => (
  <button className='button heroTopWhitebutton'>{title}</button>
)

const RectButton = ({ title }) => (
  <button className="button rectButton" >{title}</button>
)

const ArrowDefaultButton = ({ title, onClick }) => (
  <button onClick={onClick} className="button defaultButton " style={{ height: '39px', paddingRight: '24px', paddingLeft: '24px' }}>{title}<img src={darkArrowup} alt='arrowButton' /></button>
)
const ArrowBlackButton = ({ title, onClick }) => (
  <button onClick={onClick} className="button defaultButton blackButton" style={{ height: '39px', paddingRight: '24px', paddingLeft: '24px' }}>{title}<img src={lightArrow} alt='arrowButton' /></button>
)
const BigArrowBlackButton = ({ title }) => (
  <button className="button defaultButton blackButton" style={{ height: '48px' }}>{title}<img src={darkTelegramRound} alt='arrowButton' /></button>
)

const HeroTopButton = ({ title }) => (
  <button className='button heroTopbutton'>{title}</button>
)

const SmallHeroLinkButton = ({ title }) => (
  <button className='button smallHeroButton heroTopbutton'>{title}</button>
)

const LinkButton = ({ title }) => (
  <span className='linkButton'>{title}</span>
)

const DownloadButton = ({ icon, title, onClick }) => (
  <button className='button blackButton downloadBtn' onClick={onClick}>
    <img src={icon} alt='icon' /> {title}
  </button>
)
const DownloadButton1 = ({ icon, title, onClick }) => (
  <button className='button blackButton downloadBtn x16Font_5' style={{ height: '34px', background: '#EBEBEB', color: `var(--primaryBgColor)`, padding: '11.5px clamp(10px, 2vw, 24px)' }} onClick={onClick}>
    <img src={icon} alt='icon' /> {title}
  </button>
)

const HeroDarkButton = ({ title }) => (
  <button className='heroDarkButton'>{title}</button>
)


const DarkIconButton = ({ icon, title }) => (
  <button className='button blackButton downloadBtn' style={{ fontSize: '12px' }}><img src={icon} alt='icon' />{title}</button>
)

const QuestionButton = ({ title }) => (
  <button className="button questionButton">{title}</button>
)

const EventTagButton = ({ title }) => (
  <button className="button transButton eventTags" >{title}</button>
)

const BlackButtonBorderWhite = ({ onClick, title }) => (
  <button onClick={onClick} className="button defaultButton blackButton" style={{ border: '1px solid white' }} >{title}</button>
)

const CaseButton = ({ title }) => (
  <button className='button caseButton'>{title}</button>
)

const Banquet = ({ title }) => (
  <button className='button banquetBtn'>{title}</button>
)

export {
  DefaultButton,
  BlackButton,
  TabButton, SmallTabButton,
  CircleButton,
  OutLinedButton,
  SmallTransButton, BigTransButton,
  RectButton,
  ArrowDefaultButton, ArrowBlackButton, BigArrowBlackButton,
  HeroTopButton,
  SmallHeroLinkButton,
  LinkButton,
  DownloadButton,
  DownloadButton1,
  HeroDarkButton,
  DarkIconButton,
  QuestionButton,
  EventTagButton,
  HeroTopWhiteButton,
  BlackButtonBorderWhite,
  CaseButton,
  Banquet,
}