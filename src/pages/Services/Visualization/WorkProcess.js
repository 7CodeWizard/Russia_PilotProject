import { downloadIcon } from "../../../assets"
import { DownloadButton } from "../../../components/Buttons"
import { ChichaBox } from "../../../components/ChichaBox"
import './visualization.css'

const WorkProcess = ({ arrowWidth, title1, title2, data, fileName }) => {
  const downloadPdf = () => {
    const link = document.createElement("a");
    link.download = `download.pdf`;
    link.href = `../../../assets/document/${fileName}.pdf`;
    link.click();
  };

  const WorkProcessBtn = () => (
    <div className="alignCenter downloadBtnWrap" style={{ marginTop: '12px' }}>
      <DownloadButton icon={downloadIcon} title="Скачать пример документации" onClick={downloadPdf} />
      <p className="pdfText" >PDF 2.1 Мб</p>
    </div>
  )

  const ProcessListObject = ({ item, index }) => (
    <div className="processItem" style={{ position: 'relative' }}>
      <div className="alignCenter" style={{ gap: '20px' }}>
        <p className="processListTitle">{item.title}</p>
        {index !== 2 &&
          <div className="alignCenter arrowShow">
            <hr className="ArrowLine" style={{ width: arrowWidth }} />
            <div className="ArrowRect"></div>
          </div>}
      </div>
      {item.content.map((title, index) => (
        title !== "button" ?
          <p key={index} className="cardDescription">{title}</p> :
          <WorkProcessBtn key={index} />
      ))}
      <div className="verticalBorder" style={{ marginTop: item.arrowMargin, height: item.arrow }}>
        <div className="ArrowRect" style={{ marginTop: item.arrow, marginRight: '-4px' }}></div>
      </div>
    </div>
  )

  const content = (
    <div>
      <p className="sectionTitle" style={{ color: `var(--primaryBgColor)`, width: '90%', marginBottom: '10px' }}>{title1}</p>
      <p className="sectionTitle" style={{ color: `var(--secondaryWhiteHover)`, width: '90%', marginBottom: '0px' }}>{title2}</p>
      <div className="flexWrapBetween workProcessSquare" >
        {data?.map((item, index) => (
          <ProcessListObject key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  )

  return (
    <ChichaBox content={content} />
  )
}

export default WorkProcess