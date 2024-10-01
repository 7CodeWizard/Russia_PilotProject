import { useState } from "react"
import { ChichaBoxRightCard, ChichaBoxVideoCard } from "../../../components/Cards"
import CoveringPreview from "../../../components/Cards/CoveringPreview"
import { WhiteBox } from "../../../components/WhiteBox/WhiteBox"

import { ArrowBlackButton } from "../../../components/Buttons"
import { eventVideo } from "../../../assets"
import endpoint from "../../../config/config"

const EventSection = ({ dData }) => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const onClick = (url) => {
    window.open(url, '_blank');
  }

  const content = (
    <section>
      <p className="sectionTitle" style={{ color: `var(--primaryBgColor)`, width: '90%' }}>3D-визуализация сцены мероприятия</p>
      <div className="flexWrapBetween" style={{ marginTop: '30px', gap: 'clamp(30px, 3.5vw, 40px)' }}>
        <ChichaBoxVideoCard width='clamp(240px, 46vw, 700px)' height='clamp(154px, 30vw, 410px)' video={`${endpoint}/uploads/three_d/${dData?.video}`} onClick={handleOpen} />
        <ChichaBoxRightCard
          content={
            <>
              {dData && <div>
                <div>
                  <p className="x24Font_2">{dData.title1}</p>
                  <p className="x18Font_2 eventSectionText">{dData.content1}</p>
                </div>
                <div>
                  <p className="x24Font_2">{dData.title2}</p>
                  <p className="x18Font_2 eventSectionText">{dData.content2}</p>
                </div>
              </div>}
              <div style={{ marginTop: '10px' }}><ArrowBlackButton onClick={() => onClick(dData?.links && dData.links)} title="CДЕЛАТЬ РАСЧЁТ" /></div>
            </>}
          width='clamp(240px, 45vw, 401px)' />
      </div>
      <CoveringPreview open={open} setOpen={setOpen} avatar={eventVideo} />
    </section>
  )

  return (
    <div className="">
      <WhiteBox content={content} />
    </div>
  )
}


export default EventSection