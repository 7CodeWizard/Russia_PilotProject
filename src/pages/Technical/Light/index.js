import { Svideo5 } from "../../../assets"
import { BigVideoBox } from "../../../components/Boxes"
import HeroSample from "../../../components/HeroSample/HeroSample"
import SwiperSection from "../../../components/Swiper/Swiper"
import { equipmentsCardInfo, heroSectionInfo } from "../../../constant/group"
import useScrollToTop from "../../../scrollTo/ScrollToTop"
import BlogSection from "../../home/BlogSection"
import ContactSection from "../../home/ContactSection"
import GallerySection from "../../home/GallerySection"
import EquipmentCard from "./EquipmentCard"
import EquipmentCategorySection from "./EquipmentCategorySection"

const Light = () => {
  useScrollToTop()

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[5]} />
        <GallerySection title="Наши кейсы по свету" galleryType="Light" />
        <EquipmentCard data={equipmentsCardInfo.light} title="Cвет" />
        <BigVideoBox item={{ src: Svideo5, videoTitle: 'Cветовой Меч', videoDescription: 'Световой концерт' }} />
        <EquipmentCategorySection type="свет" />
      </div>
      <SwiperSection displayType='Технический' />
      <div className="container">
        <ContactSection title="Рассчитать cвет" />
        <BlogSection />
      </div>
    </section>
  )
}

export default Light