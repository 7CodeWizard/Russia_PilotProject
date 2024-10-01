import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BigCaseVideoBox, TabBox } from '../../../components/Boxes'
import TopCaseEventSection from './TopCaseEventSection'
import CaseEventSwiper from './CaseEventSwiper'
import CristalRoom from './CristalRoom'
import CaseCards from './caseCards'
import EventSection from './EventSection'
import { getCaseById } from '../../../api/caseAPI'
import endpoint from '../../../config/config'
import './caseEvent.css'
import ChichaSmallBox from '../../../components/ChichaSmallBox'
import EquipmentUsed from './EquipmentUsed'
import ContactSection from '../../home/ContactSection'
import useScrollToTop from '../../../scrollTo/ScrollToTop'

const CaseEvent = () => {
  useScrollToTop()
  const { caseId } = useParams()
  const [caseOne, setCaseOne] = useState({})
  useEffect(() => {
    getCaseById(caseId).then((data) => {
      data && setCaseOne(data)
    })
  }, [caseId])

  const CaseEventTag = (props) => (
    <div className='alignCenter flexWrap tagBoxWrapper'>
      <p className='x17' style={{ color: 'var(--secondaryWhiteColor)' }}>{props?.title}</p>
      <div className='alignCenter flexWrap'>
        {
          props?.tags?.map((item, index) => (
            <div key={index} className='tagBoxItem flexWrap'><TabBox title={item} /></div>
          ))
        }
      </div>
    </div>
  )

  return (
    <div className="wrapper">
      <div className="container">
        <TopCaseEventSection caseOne={caseOne} />
        <BigCaseVideoBox src={`${endpoint}/uploads/cases/${caseOne?.video}`} />
        <CaseEventSwiper images={caseOne?.images} />
        <section className='section2 caseEventTagSection'>
          <CaseEventTag title="ЧТО ДЕЛАЛИ" tags={caseOne?.tags} />
          <CaseEventTag title="ГОРОДА" tags={caseOne?.cities} />
        </section>
        {caseOne?.type !== 'тур' && <CristalRoom site={caseOne?.site} />}
        <div className='smallSectionWrapper'>
          <EventSection dData={caseOne?.d_id} />
          {caseOne?.type === 'тур' && <ChichaSmallBox
            title="Отрепетировано на реп-базе Завод Шоу"
            text="Современный зрительный зал на 1372 места с полным электрическим оснащением. 
              Стоимость аренды от 60 тыс. ₽ при соблюдении условий аренды"
            btnTitle="подробнее о базе репетиций" />}
        </div>
        <CaseCards solution={caseOne?.solution} feature={caseOne?.features} />
        {caseOne?.type === 'тур' && <EquipmentUsed equipment={caseOne?.equipment.length > 0 && caseOne.equipment[0]} />}
        <ContactSection title="Рассчитать такое же событие" />
      </div>
    </div>
  )
}

export default CaseEvent