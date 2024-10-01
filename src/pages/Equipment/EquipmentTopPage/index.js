import { darkDownloadIcon } from '../../../assets'
import { DownloadButton1 } from '../../../components/Buttons'
import endpoint from '../../../config/config'
import useScrollToTop from '../../../scrollTo/ScrollToTop'

import './serie.css'
const EquipmentTopPage = ({ equipment }) => {
  useScrollToTop()

  return (
    <div className='section2'>
      <div className='sectionWrapper'>
        <p className='x12_4' style={{ color: 'var(--secondaryWhiteColor)', paddingBottom: 'clamp(40px,4.5vw,51px)' }} onClick={() => { window.history.back() }}>←  ВСЁ ОБОРУДОВАНИЕ</p>
        <div className='flexWrapBetween' >
          <div className='equipmentGallery chichaShow' style={{ display: 'grid', gap: 'clamp(10px, 1vw, 20px)' }}>
            {/* Add conditional rendering to avoid errors */}
            {equipment.images && equipment.images.length > 0 && (
              <>
                <div className='bigEquipmentImageWrappper itemCenter'>
                  <img src={`${endpoint}/uploads/equipment/${equipment.images[0]}`} alt='cameraImg1' />
                </div>
                <div className='bigEquipmentImageWrappper itemCenter'>
                  <img src={`${endpoint}/uploads/equipment/${equipment.images[0]}`} alt='cameraImg2' />
                </div>
              </>
            )}
            <div className='equipmentSmallImage' style={{ gap: '17px' }}>
              {equipment.images && equipment.images.length > 1 && (
                <div className='smallEquipmentImageWrappper itemCenter'>
                  <img src={`${endpoint}/uploads/equipment/${equipment.images[1]}`} alt='smailCameraImg1' />
                </div>
              )}
              {equipment.images && equipment.images.length > 2 && (
                <div className='smallEquipmentImageWrappper itemCenter'>
                  <img src={`${endpoint}/uploads/equipment/${equipment.images[2]}`} alt='smailCameraImg2' />
                </div>
              )}
            </div>
          </div>

          <div className='equipmentContent'>
            <div>
              <p className='x30'>{equipment?.name}</p>
              <p className='x14' style={{ marginTop: '10px', fontWeight: '100' }}>{equipment?.categoryType}</p>
            </div>
            <div>
              <p className='x18Font_5'>{equipment?.description}</p>
            </div>
            <div className='equipmentGallery chichaHidden' style={{ display: 'grid', gap: 'clamp(10px, 1vw, 20px)' }}>
              {/* Add conditional rendering to avoid errors */}
              {equipment.images && equipment.images.length > 0 && (
                <div className='bigEquipmentImageWrappper itemCenter'>
                  <img src={`${endpoint}/uploads/equipment/${equipment.images[0]}`} alt='cameraImg2' />
                </div>
              )}
              <div className='equipmentSmallImage' style={{ gap: '17px' }}>
                {equipment.images && equipment.images.length > 1 && (
                  <div className='smallEquipmentImageWrappper itemCenter'>
                    <img src={`${endpoint}/uploads/equipment/${equipment.images[1]}`} alt='smailCameraImg1' />
                  </div>
                )}
                {equipment.images && equipment.images.length > 2 && (
                  <div className='smallEquipmentImageWrappper itemCenter'>
                    <img src={`${endpoint}/uploads/equipment/${equipment.images[2]}`} alt='smailCameraImg2' />
                  </div>
                )}
              </div>
            </div>
            <hr className='chichaShow' />
            <div className='flexWrap' style={{ gap: 'clamp(20px, 3.5vw, 30px' }}>
              <div style={{ width: '40%' }}>
                <p className='x16Font_4' style={{ marginBottom: '10px' }}>производитель</p>
                <p className='x18Font_4 '>{equipment?.manufacturer}</p>
              </div>
              <div style={{ width: '40%' }}>
                <p className='x16Font_4' style={{ marginBottom: '10px' }}>масса</p>
                <p className='x18Font_4 '>{equipment?.weight}кг</p>
              </div>
              <div style={{ width: '40%' }}>
                <p className='x16Font_4' style={{ marginBottom: '10px' }}>серия</p>
                <p className='x18Font_4 '>{equipment?.series}</p>
              </div>
              <div style={{ width: '40%' }}>
                <p className='x16Font_4' style={{ marginBottom: '10px' }}>габариты</p>
                {/* Add safe check for dimensions */}
                <p className='x18Font_4 '>
                  {equipment?.dimension && equipment.dimension.length > 0 &&
                    `${equipment.dimension[0]} * ${equipment.dimension[1]} * ${equipment.dimension[2]}`}
                </p>
              </div>
            </div>
            <hr />
            <div className='alignCenter' style={{ gap: 'clamp(16px, 2vw, 26px)' }}>
              <DownloadButton1 icon={darkDownloadIcon} title='Скачать инструкцию' height='34px' />
              <p className='x12_5' style={{ color: 'var(--badgeColor)' }}>PDF 2.1 Мб</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentTopPage;
