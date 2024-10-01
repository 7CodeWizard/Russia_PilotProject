import { footerTopLink } from "../constant/group";
import { bigfooterLogo, darkTelegram, darkVK, smallfooterLogo, whiteMail, whitePhone } from "../assets";
import { CircleButton, DefaultButton } from "../components/Buttons";
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const FooterTop = () => (
  <div className="footerTop">
    <div className="footerTopLeft">
      <RouterLink to="/"><img className="bigFooterLogo" alt="bigFooterLogo" src={bigfooterLogo} /></RouterLink>
      <RouterLink to="/"><img className="smallFooterLogo" alt="smallFooterLogo" src={smallfooterLogo} /></RouterLink>
    </div>
    <div className="footerTopRight">
      <div>
        {footerTopLink.map((item, index) => (
          // item.title === "КОНТАКТЫ" ? <ScrollLink key={index} to="contactSection" spy={true} smooth={true}><span className="footerTopLink">{item.title}</span></ScrollLink> :
          <RouterLink key={index} to={item.url} className="footerTopLink">{item.title}</RouterLink>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }} className="socialBtn">
        <ScrollLink to="contactSection" spy={true} smooth={true}><div className="requestBtn1"><DefaultButton title="ОСТАВИТЬ ЗАЯВКУ" /></div></ScrollLink>
        <a href="https://web.telegram.org" rel="noreferrer" target="_blank"><CircleButton icon={darkTelegram} alt="darkTelegram" /></a>
        <a href="https://vk.com" rel="noreferrer" target="_blank"><CircleButton icon={darkVK} alt="darkVK" /></a>
      </div>
    </div>
  </div>
)

const FooterMiddle = () => (
  <div className="footerMiddle">
    <div className="footerMiddleLeft">
      <ScrollLink to="contactSection" spy={true} smooth={true}><DefaultButton title="ОСТАВИТЬ ЗАЯВКУ" /></ScrollLink>
    </div>
    <div className="footerMiddleRight">
      <div className="middleOne box1">
        <RouterLink to="/services/showdevelopment" className="middleTitle">РАЗРАБОТКА ШОУ</RouterLink>
        <RouterLink to="/services" className="middleTitle">3D-визуализация</RouterLink>
        <RouterLink to="/services/rehearsal" className="middleLink">Репетиционная база</RouterLink>
      </div>
      <div className="middleOne box2">
        <RouterLink to="/production" className="middleTitle">ПРОДАКШН</RouterLink>
        <RouterLink to="/production" className="middleLink">События</RouterLink>
        <RouterLink to="/production/tourconcert" className="middleLink">Концерты и туры</RouterLink>
      </div>
      <div className="middleOne box3">
        <RouterLink to="/technical" className="middleTitle">ТЕХНИЧЕСКИЕ УСЛУГИ</RouterLink>
        <div>
          <RouterLink to="/technical" className="middleLink" style={{ marginRight: '28px' }}>Свет</RouterLink>
          <RouterLink to="/technical/sound" className="middleLink">Видео</RouterLink>
        </div>
        <div>
          <RouterLink to="/technical/videopage" className="middleLink" style={{ marginRight: '28px' }}>Звук</RouterLink>
          <RouterLink to="/technical/stageclothes" className="middleLink">Одежда сцены</RouterLink>
        </div>
      </div>
    </div>
  </div>
)

const FooterBottom = () => (
  <div className="footerTop">
    <div className="footerTopLeft footerContactWrap">
      <div style={{ display: 'grid', gap: '13px', color: `var(--secondaryWhiteColor)` }} >
        <p className='x18 alignCenter' style={{ gap: '11px' }}><img src={whiteMail} alt='icon' />info@zavodshow.ru</p>
        <p className='x18 alignCenter' style={{ gap: '11px' }}><img src={whitePhone} alt='icon' />+7 906 065-28-33</p>
      </div>
    </div>
    <div className="footerTopRight">
      <p className="footerContact">Москва, г. Реутов, ул. Победы, 20<br />Пн-Сб:&nbsp;10-19 МСК</p>
      <div className="footerTopLeft1">
        <div style={{ display: 'grid', gap: '13px', color: `var(--secondaryWhiteColor)` }} >
          <p className='x18 alignCenter' style={{ gap: '11px' }}><img src={whiteMail} alt='icon' />info@zavodshow.ru</p>
          <p className='x18 alignCenter' style={{ gap: '11px' }}><img src={whitePhone} alt='icon' />+7 906 065-28-33</p>
        </div>
      </div>
      <div className="footerBottomLink" style={{ marginBottom: '20px' }}>
        <RouterLink to="/contact" className="footerSpacialLink">© Завод Шоу</RouterLink>
        {/* <a className="footerSpacialLink" target="_blank" rel="noreferrer" href="https://linkedin.com">© Завод Шоу</a> */}
        <RouterLink className="footerSpacialLink" to="/policy">Политика конфиденциальности</RouterLink>
        <a className="footerSpacialLink" target="_blank" rel="noreferrer" href="https://lard.digital">Разработка сайта</a>
        <a className="footerSpacialLink" target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1GBdaQc7jWGSIvKF_bxRxT2gECSaikiZi/view">СОУТ</a>
      </div>
    </div>
  </div>
)

const Footer = () => {


  return (
    <footer className="wrapper" style={{ paddingTop: 0 }}>
      <div className="footerImg">
        <div className="footerWrapper">
          <FooterTop />
          <FooterMiddle />
          <hr />
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
};

export default Footer;
