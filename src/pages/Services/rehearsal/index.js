import { heroSectionInfo, userListInfo } from "../../../constant/group";
import HeroSample from "../../../components/HeroSample/HeroSample";
import Auditorium from "./Auditorium";
import Scene from "./Scene";
import Electricity from "./Electricity";
import UserList from "./UserList";
import ContactSection from "../../home/ContactSection";
import BlogSection from "../../home/BlogSection";
import RentalCost from "./RentalCost";
import './rehearsal.css'
import useScrollToTop from "../../../scrollTo/ScrollToTop";
import { useEffect, useState } from "react";
import { getShowParticipant } from "../../../api/participantAPI";

const Rehearsal = () => {

  const [participant, setParticipant] = useState([])
  useEffect(() => {
    getShowParticipant(8).then((data) => {
      data && setParticipant(data)
    })
  }, [])

  useScrollToTop()

  return (
    <div className="wrapper">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[1]} />
        <div className="sectionWrapper" style={{ display: 'grid', gap: 'clamp(20px, 2vw, 40px)' }}>
          <Auditorium />
          <Scene />
          <Electricity />
        </div>
        <UserList title='Создавали шоу вместе с нами' userListInfo={participant} />
        <RentalCost />
        <ContactSection title="Заказать расчёт аренды" />
        <BlogSection />
      </div>
    </div>
  )
}

export default Rehearsal;