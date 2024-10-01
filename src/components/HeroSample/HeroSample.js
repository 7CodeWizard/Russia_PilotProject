import { Link as ScrollLink } from 'react-scroll'
// import { Link as RouterLink } from 'react-router-dom'
import { DefaultButton, HeroDarkButton, HeroTopButton, HeroTopWhiteButton, SmallHeroLinkButton } from '../Buttons'
import './herosample.css'

const HeroSample = (props) => {
  const { heroSectionInfo } = props

  return (
    <section>
      <div className='herotopBtn flexWrap section2'>
        <HeroTopButton title={heroSectionInfo.heroTopButton} />
        {heroSectionInfo?.heroTopWhiteBtn?.map((title, index) => (
          <div key={index} className='heroWhiteTopbtn'>
            <HeroTopWhiteButton title={title} />
          </div>
        ))}
      </div>

      <section className='sectionWrapper section2 heroBg' style={{ paddingTop: 'clamp(30px, 4vw, 40px)' }}>
        <img src={heroSectionInfo.bgUrl} alt='bgUrl' />
        {heroSectionInfo.text ?
          <div className='spaceEnd'>
            <p className='heroTitle heroTitleWidth'>{heroSectionInfo.title}</p>
            <div className='heroTextWidth'>
              <p className='cardTitle' style={{ color: 'var(--secondaryWhiteColor)' }}>{heroSectionInfo.text[0]}</p>
              <p className='cardDescription' style={{ color: 'var(--secondaryWhiteColor)' }}>{heroSectionInfo.text[1]}</p>
            </div>
          </div>
          :
          <p className='heroTitle'>{heroSectionInfo.title}</p>}
        <div className='spaceBetween heroLinkWrap'>
          {heroSectionInfo.flag === 1 ?
            <div className='heroLinkLeft'>
              <ScrollLink to="contactSection" smooth={true} spy={true} ><DefaultButton title={heroSectionInfo.defaultBtn.title} /></ScrollLink>
            </div>
            :
            <div className='heroLinkLeft heroLinkLeft1'>
              <ScrollLink to="contactSection" smooth={true} spy={true} ><DefaultButton title={heroSectionInfo.defaultBtn.title} /></ScrollLink>
              <a rel="noreferrer" target="_blank" href={heroSectionInfo.defaultDarkBtn.urlLink} ><HeroDarkButton title={heroSectionInfo.defaultDarkBtn.title} /></a>
            </div>
          }
          <div className='heroLinkRight chichaShow'>
            {
              heroSectionInfo.heroLinkTitle.map((item, index) => (
                <div key={index} style={{ marginTop: '3px' }}><SmallHeroLinkButton title={item.title} /></div>
              ))
            }
          </div>
          <div className='heroLinkRight chichaHidden'>
            {
              heroSectionInfo.mobileHeroLinkTitle.map((item, index) => (
                <div key={index} style={{ marginTop: '3px' }}><SmallHeroLinkButton title={item.title} /></div>
              ))
            }
          </div>
        </div>
      </section>
    </section>
  )
}

export default HeroSample