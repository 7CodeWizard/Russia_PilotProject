import { useNavigate } from "react-router-dom"
import { Link as ScrollLink } from 'react-scroll'
import { logo } from "../assets"

const AdminHeader = ({ setIsAdminPage }) => {
  const navigate = useNavigate();
  const RouterName = [
    { title: 'Кейсы мероприятий', url: 'newCase' },
    { title: 'Каталог площадок', url: 'newSite' },
    { title: 'Каталог оборудования', url: 'newEquipment' },
    { title: 'Отзывы (Нас рекомендуют)', url: 'newReview' },
    { title: 'Блог #ЗаводШоу', url: 'newFactory' },
    { title: 'Репетиционная база', url: 'newParticipant' },
    { title: '3D-визуализация', url: 'newThree' },
    { title: 'Команда', url: 'newTeam' },
  ]

  const handleClick = (link, scrollSpy) => {
    const currentPath = window.location.pathname;
    if (currentPath !== link) {
      navigate(link);
    }
    if (scrollSpy) {
      setTimeout(() => {
        const section = document.getElementById(scrollSpy);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }

  return (
    <header className="scrollWrapper">
      <div className='headerScroll'>
        <div className="container alignCenter spaceBetween">
          <img onClick={() => { setIsAdminPage(false); navigate('/') }} src={logo} alt="logo" style={{ cursor: 'pointer' }} />
          <div className="alignCenter">
            <nav className="desktop-nav" >
              <ul className="menus alignCenter">
                {RouterName.map((items, index) => (
                  <li className="menu-items" key={index} style={{ cursor: 'pointer' }} onClick={() => handleClick('/admin', items.url)}>
                    <a href="#" onClick={(e) => e.preventDefault()}>{items.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader;