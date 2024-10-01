import { BigTransButton, BlackButton, CircleButton, DefaultButton, OutLinedButton, TabButton, SmallTransButton, SmallTabButton, RectButton, ArrowDefaultButton, ArrowBlackButton } from "../../components/Buttons"
import { darkAdd, darkTelegram, darkVK, Svideo5, } from '../../assets/index'
import { equipmentsCardInfo, gradiantBgInfo } from "../../constant/group"
import { BigVideoBox } from "../../components/Boxes"


const NewPage = () => {

  return (
    <div className="wrapper">
      <div className="container">

        <div className="pendingSquare section">
          <div className="flexWrapBetween alignCenter">
            <p className="sectionTitle" style={{ color: `var(--primaryBgColor)` }}>Cвет</p>
            <p className="sectionTitle" style={{ color: `var(--secondaryWhiteHover)` }}>Чем мы можем помочь</p>
            <BlackButton title='заказать консультацию' />
          </div>
          <hr style={{ borderColor: '#CFCFCF', width: '100%', margin: 'clamp(20px, 3vw, 40px) 0' }} />
          <div className="flexWrapAround" style={{ gap: '10px' }}>
            {equipmentsCardInfo.light.map((item, index) => (
              <div key={index} className="creationItem" style={{ background: gradiantBgInfo[index], marginLeft: index === 0 && 0 }}>
                <p className="creationTitle">{item.title}</p>
                {item.content.map((text, idx) => (
                  <p key={idx} className="creationSmallText">{text}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <BigVideoBox item={{ src: Svideo5, videoTitle: 'Cветовой Меч', videoDescription: 'Световой концерт' }} />




        <>
          <DefaultButton title='оСТАВИТЬ ЗАЯВКУ' /> <br />

          <BlackButton title='ПОДРОБНЕЕ' /> <br />

          <TabButton icon={darkAdd} title='Выбрать файл' /> <br />
          <SmallTabButton title='Одежда сцены и линолеум' /> <br />

          <CircleButton icon={darkTelegram} /> <br />

          <CircleButton icon={darkVK} /> <br />

          <OutLinedButton title='сбросить' /> <br />

          <SmallTransButton title='ТЕХНИЧЕСКИЕ УСЛУГИ' /> <br />

          <BigTransButton title='ОДЕЖДУ СЦЕНЫ И ЛИНОЛЕУМ' /> <br />

          <RectButton title='Наш мерч →' /> <br />

          <ArrowDefaultButton title='ВСЕ КЕЙСЫ ЗАВОД ШОУ' /> <br />

          <ArrowBlackButton title='ВСЕ КЕЙСЫ ЗАВОД ШОУ' /> <br />
        </>
      </div>
    </div>
  )
}

export default NewPage