import EventWorks from './EventWorks'
import useScrollToTop from '../../../scrollTo/ScrollToTop'
import HeroSample from '../../../components/HeroSample/HeroSample'
import GallerySection from '../../home/GallerySection'
import WorkProcess from "../../Services/Visualization/WorkProcess"
import SwiperSection from '../../../components/Swiper/Swiper'
import PendingSection from '../../home/PendingSection'
import ContactSection from '../../home/ContactSection'
import BlogSection from '../../home/BlogSection'
import { BigVideoBox } from '../../../components/Boxes'

import { workProcessInfo3, heroSectionInfo } from "../../../constant/group"
import { useEffect, useState } from 'react'
import { getCasesByType } from '../../../api/caseAPI'
import endpoint from '../../../config/config'

const Event = () => {
  useScrollToTop()

  const [caseData, setCaseData] = useState({})
  useEffect(() => {
    getCasesByType('частное').then((data) => {
      data && setCaseData(data[0])
    })
  }, [])
  useScrollToTop()

  return (
    <section className='wrapper events'>
      <div className='container'>
        <HeroSample heroSectionInfo={heroSectionInfo[3]} />
        <GallerySection title="Лучшие кейсы по событиям" galleryType="Events" />
        <EventWorks />
        <WorkProcess arrowWidth='210px' title1='Cобытие' title2='Наш процесс работы' data={workProcessInfo3} fileName='event' />
      </div>
      <SwiperSection displayType='Концерты' />
      <div className='container'>
        <PendingSection />
        <BigVideoBox item={{ titleCenter: false, title: 'Видео с мероприятия', src: `${endpoint}/uploads/cases/${caseData?.video}`, videoTitle: caseData?.venue, videoDescription: caseData?.name }} />
        <ContactSection title='Рассчитать продакшн' />
        <BlogSection />
      </div>
    </section>
  )
}

export default Event