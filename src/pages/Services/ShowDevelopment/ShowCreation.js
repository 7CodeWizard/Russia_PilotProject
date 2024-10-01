import { DarkIconButton } from "../../../components/Buttons"
import { ChichaBox } from "../../../components/ChichaBox"
import { creationInfo } from "../../../constant/group"


const ShowCreation = () => {
  const content = (
    <section>
      <p className="sectionTitle" style={{ color: `var(--primaryBgColor)`, width: '90%', marginBottom: '10px' }}>Создание шоу под ключ</p>
      <p className="sectionTitle" style={{ color: `var(--secondaryWhiteHover)`, width: '90%', marginBottom: '0px' }}>Наш процесс работы</p>
      <div className="flexWrapAround" style={{ paddingTop: '35px', gap: '10px' }}>
        {creationInfo.map((item, index) => (
          <div key={index} className="creationItem" style={{ background: item.bgColor, marginLeft: index === 0 && 0 }}>
            <p className="creationTitle">{item.title}</p>
            {item.smallText.map((text, idx) => (
              <p key={idx} className="creationSmallText">{text}</p>
            ))}
            {item.contentText ?
              <div>
                <p className="contentTitle">{item.contentTitle}</p>
                {item.contentText.map((text, idx) => (
                  <p key={idx} className="creationSmallText" style={{ margin: '3px 0' }}>{text}</p>
                ))}
              </div> :
              <div>
                <DarkIconButton fontSize="12px" icon={item.buttonIcon} title={item.buttonTitle} />
                <p className="docuSizeText" style={{ marginTop: '25px' }}>{item.sizeText}</p>
              </div>}
          </div>
        ))}
      </div>
    </section>
  )

  return (
    <ChichaBox content={content} />
  )
}

export default ShowCreation