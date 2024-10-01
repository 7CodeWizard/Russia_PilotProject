import { Svideo5 } from "../../../assets"
import { BigVideoBox } from "../../../components/Boxes"
import HeroSample from "../../../components/HeroSample/HeroSample"
import SwiperSection from "../../../components/Swiper/Swiper"
import { equipmentsCardInfo, heroSectionInfo } from "../../../constant/group"
import useScrollToTop from "../../../scrollTo/ScrollToTop"
import BlogSection from "../../home/BlogSection"
import ContactSection from "../../home/ContactSection"
import GallerySection from "../../home/GallerySection"
import EquipmentCard from "../Light/EquipmentCard"
import EquipmentCategorySection from "../Light/EquipmentCategorySection"

const VideoPage = () => {
  useScrollToTop()

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[7]} />
        <GallerySection title="Наши кейсы по видео" galleryType="Video" />
        <EquipmentCard data={equipmentsCardInfo.video} title="Видео" />
        <BigVideoBox item={{ src: Svideo5, videoTitle: 'Видео-драйв', videoDescription: 'Фэндом-концерт Райна Гослинга' }} />
        <EquipmentCategorySection type='видео' />
      </div>
      <SwiperSection displayType='Технический' />
      <div className="container">
        <ContactSection title="Рассчитать видео" />
        <BlogSection />
      </div>
    </section>
  )
}

export default VideoPage