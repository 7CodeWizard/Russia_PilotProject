import useScrollToTop from '../../scrollTo/ScrollToTop';
import ContactSection from '../home/ContactSection';
import GoogleMap from './GoogleMap';
import MemberSection from './MemberSection';
import './teamOffice.css'

const TeamOffice = () => {
  useScrollToTop()
  return (
    <div className="wrapper">
      <div className='container' >
        <div className='sectionWrapper'>
          <div className='section2 flexWrap alignCenter' >
            <MemberSection />
            <GoogleMap />
          </div>
        </div>
        <div className='sectionWrapper'>
          <ContactSection title='Остались вопросы?' />
        </div>
      </div>
    </div >
  );
};

export default TeamOffice;