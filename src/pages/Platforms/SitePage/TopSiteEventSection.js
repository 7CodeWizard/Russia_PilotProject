import { positionIcon, userIcon, worldIcon } from "../../../assets"
import { CaseButton } from "../../../components/Buttons"

const TopSiteEventSection = ({ siteOne }) => {
    return (
        <section className="section1">
            <div className="caseTopSection">
                <p className='x12' style={{ fontWeight: '700', color: 'var(--secondaryWhiteColor)' }} onClick={() => { window.history.back() }} >← ВСЕ ПЛОЩАДКИ</p>
                <div className='flexWrap caseTopWrapper'>
                    <div className="caseTitleWrapper">
                        <p className='caseTitle'>{siteOne?.name}</p>
                        <CaseButton title="Банкетный зал" />
                    </div>
                    <div className='caseTopItem spaceBetween'>
                        <div className='caseTopGap'>
                            <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='flagImg' src={positionIcon} />{siteOne?.address}</div>
                            <div className="spaceBetween">
                                <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='flagImg' src={worldIcon} />test.ru</div>
                                <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='flagImg' src={userIcon} />{siteOne?.capacity} гостей</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopSiteEventSection