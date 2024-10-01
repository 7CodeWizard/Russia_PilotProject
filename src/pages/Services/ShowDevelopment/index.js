import { stage3d, Svideo3 } from "../../../assets"
import { Big3DBox, BigVideoBox } from "../../../components/Boxes"
import HeroSample from "../../../components/HeroSample/HeroSample"
import { heroSectionInfo, userListInfo, workProcessInfo2 } from "../../../constant/group"
import PendingSection from "../../home/PendingSection"
import WorkProcess from "../Visualization/WorkProcess"
import ShowCreation from "./ShowCreation"
import UserList from '../rehearsal/UserList'
import ContactSection from "../../home/ContactSection";
import BlogSection from '../../home/BlogSection'
import './showDevelopment.css'
import ShowConcept from "./showconcept"
import useScrollToTop from "../../../scrollTo/ScrollToTop"
import { useEffect, useState } from "react"
import { getShowParticipant } from "../../../api/participantAPI"

const ShowDevelopment = () => {

  useScrollToTop()
  const [participant, setParticipant] = useState([])
  useEffect(() => {
    getShowParticipant(4).then((data) => {
      data && setParticipant(data)
    })
  }, [])

  return (
    <div className="wrapper">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[2]} />
        <ShowCreation />
        <ShowConcept />
        <PendingSection />
        <Big3DBox item={{ titleCenter: true, title: 'Пример 3D-визуализации для шоу', src: stage3d }} />
        <WorkProcess arrowWidth='210px' title1='Подготовка, реализация и проведение шоу' data={workProcessInfo2} fileName='development' />
        <BigVideoBox item={{ titleCenter: true, title: 'Пример реальной установки сцены', src: Svideo3, videoTitle: 'Тайм-лапс возведение сцены', videoDescription: 'Перед концертом Кипелова' }} />
        <UserList title='Создавали шоу вместе с нами' userListInfo={participant} />
        <ContactSection title="Блог #ЗаводШоу" />
        <BlogSection />
      </div>
    </div>
  )
}

export default ShowDevelopment