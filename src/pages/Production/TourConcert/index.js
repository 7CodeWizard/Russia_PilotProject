import { useEffect, useState } from "react"
import { BigVideoBox } from "../../../components/Boxes"
import HeroSample from "../../../components/HeroSample/HeroSample"
import SwiperSection from "../../../components/Swiper/Swiper"
import { heroSectionInfo, workProcessInfo4 } from "../../../constant/group"
import BlogSection from "../../home/BlogSection"
import ContactSection from "../../home/ContactSection"
import GallerySection from "../../home/GallerySection"
import PendingSection from "../../home/PendingSection"
import WorkProcess from "../../Services/Visualization/WorkProcess"
import { getCasesByType } from "../../../api/caseAPI"
import endpoint from "../../../config/config"
import useScrollToTop from "../../../scrollTo/ScrollToTop"

const TourConcert = () => {
  useScrollToTop()
  const [caseData, setCaseData] = useState({})
  useEffect(() => {
    getCasesByType('тур').then((data) => {
      data && setCaseData(data[0])
    })
  }, [])
  return (
    <section className="wrapper tourConcert">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[4]} />
        <GallerySection title="Лучшие кейсы по турам" galleryType="Tours" />
        <WorkProcess arrowWidth='210px' title1='Тур' title2='Наш процесс работы' data={workProcessInfo4} fileName='tour' />
        <BigVideoBox item={{ titleCenter: false, title: 'Видео из тура', src: `${endpoint}/uploads/cases/${caseData?.video}`, videoTitle: caseData?.venue, videoDescription: caseData?.name }} />
      </div>
      <SwiperSection displayType='Концерты' />
      <div className="container">
        <PendingSection />
        <ContactSection title="Рассчитать концерт/тур" />
        <BlogSection />
      </div>
    </section>
  )
}

export default TourConcert