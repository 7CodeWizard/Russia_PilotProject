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

const Sound = () => {
  useScrollToTop()

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[6]} />
        <GallerySection title="Наши кейсы по звуку" galleryType="Sound" />
        <EquipmentCard data={equipmentsCardInfo.sound} title="Звук" />
        <BigVideoBox item={{ src: Svideo5, videoTitle: 'Звуковая волна', videoDescription: 'Рейв-фестиваль' }} />
        <EquipmentCategorySection type="звук" />
      </div>
      <SwiperSection displayType='Технический' />
      <div className="container">
        <ContactSection title="Рассчитать звук" />
        <BlogSection />
      </div>
    </section>
  )
}

export default Sound