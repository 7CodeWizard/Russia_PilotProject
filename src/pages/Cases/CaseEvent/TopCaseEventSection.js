import { dateIcon, flagIcon, lengthIcon, positionIcon, starIcon1, userIcon } from "../../../assets";
import { CaseButton } from "../../../components/Buttons";


const TopCaseEventSection = ({ caseOne }) => {

  const day = caseOne?.startDate?.split(' ')[0];
  return (
    <section className="section1">
      <div className='caseTopSection'>
        <p className='x12' style={{ fontWeight: '700', color: 'var(--secondaryWhiteColor)' }} onClick={() => { window.history.back() }}>← ВСЕ КЕЙСЫ</p>
        <div className='flexWrapBetween caseTopWrapper'>
          <div className="caseTitleWrapper">
            <p className='caseTitle'>{caseOne?.name}</p>
            <CaseButton title={caseOne?.type} />
          </div>
          <div className='caseTopItem spaceBetween'>
            <div className='caseTopGap'>
              <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='flagImg' src={caseOne.type === 'тур' ? positionIcon : flagIcon} />{caseOne.type === 'тур' ? `${caseOne?.cities.length} городов` : caseOne?.cities?.length > 0 && caseOne.cities[0]}</div>
              <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='positionImg' src={caseOne.type === 'тур' ? starIcon1 : positionIcon} />{caseOne?.venue}</div>
            </div>
            <div className='caseTopGap'>
              <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='dateIcon' src={dateIcon} />{caseOne.type === 'тур' ? `${day}-${caseOne?.endDate}` : caseOne?.startDate}</div>
              <div className='x24Font_5' style={{ color: 'var(--secondaryWhiteColor)' }}><img style={{ marginRight: 'clamp(6px, 2vw, 12px)' }} alt='userIcon' src={caseOne.type === 'тур' ? lengthIcon : userIcon} /> {caseOne.type === 'тур' ? `${caseOne?.guests}KM` : caseOne?.guests} </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopCaseEventSection;