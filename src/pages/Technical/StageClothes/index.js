import { Svideo3 } from "../../../assets"
import { BigVideoBox } from "../../../components/Boxes"
import HeroSample from "../../../components/HeroSample/HeroSample"
import SwiperSection from "../../../components/Swiper/Swiper"
import { equipmentsCardInfo, heroSectionInfo } from "../../../constant/group"
import useScrollToTop from "../../../scrollTo/ScrollToTop"
import BlogSection from "../../home/BlogSection"
import ContactSection from "../../home/ContactSection"
import GallerySection from "../../home/GallerySection"
import EquipmentCard from "../Light/EquipmentCard"
import Covering from "./Covering"
import Kabuki from "./Kabuki"
import SlidingCurtain from "./SlidingCurtain"

import "./stageclothes.css"
import TransCurtain from "./TransCurtail"

const StageClothes = () => {
  useScrollToTop()

  return (
    <section className="wrapper technical">
      <div className="container">
        <HeroSample heroSectionInfo={heroSectionInfo[8]} />
        <GallerySection title="Наши кейсы по одежде сцены" galleryType="Stage" />
        <EquipmentCard data={equipmentsCardInfo.stage} title="Одежда сцены" />
        <BigVideoBox item={{ src: Svideo3, videoTitle: 'Тайм-лапс возведение сцены', videoDescription: 'Перед концертом Кипелова' }} />
        <Covering />
        <SlidingCurtain />
        <TransCurtain />
        <Kabuki />
      </div>
      <SwiperSection displayType='Технический' />
      <div className="container">
        <ContactSection title="Рассчитать одежду сцены" />
        <BlogSection />
      </div>

    </section>
  )
}

export default StageClothes