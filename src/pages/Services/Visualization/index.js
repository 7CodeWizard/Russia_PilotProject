import WorkProcess from './WorkProcess'
import HeroSample from '../../../components/HeroSample/HeroSample'
import SwiperSection from '../../../components/Swiper/Swiper'
import ExampleCase from './ExampleCase'
import { heroSectionInfo, workProcessInfo } from '../../../constant/group'
import ContactSection from '../../home/ContactSection'
import BlogSection from '../../home/BlogSection'
import { Big3DBox } from '../../../components/Boxes'
import { stage3d } from '../../../assets'
import './visualization.css'
import useScrollToTop from '../../../scrollTo/ScrollToTop'

const Visualization = () => {

  useScrollToTop()
  return (
    <div className="wrapper visualization">
      <div className='container '>
        <HeroSample heroSectionInfo={heroSectionInfo[0]} />
        <Big3DBox item={{ title: 'Cцена', subTitle: 'Смоделируем несколько вариантов оформления сцены и выберем наиболее подходящий под требования', src: stage3d }} />
        <WorkProcess title1='3D-визуализация' title2='Наш процесс работы' data={workProcessInfo} fileName='3D' />
        <ExampleCase />
      </div>
      <SwiperSection displayType='3Д' />
      <div className='container '>
        <ContactSection title="Заказать расчёт 3D" />
        <BlogSection />
      </div>
    </div>
  )
}

export default Visualization