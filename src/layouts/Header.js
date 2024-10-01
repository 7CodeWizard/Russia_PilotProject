import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@mui/material"
import { logo, search, darkVK, darkTelegram, hambuger } from "../assets"
import { CircleButton, DefaultButton, RectButton } from '../components/Buttons'
import HeaderLink from "./HeaderLink/HeaderLink"
import MobileHeaderLink from "./HeaderLink/MobileHeaderLink"
import { Link, } from "react-scroll"
import './layout.css'
import { getSearchData } from "../api/searchAPI"

const Header = () => {

  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(true)
  const componentRef = useRef(null)
  const [isHambuger, setIsHambuger] = useState(false)
  const isMobile = useMediaQuery('(max-width: 850px)')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [isShrunk, setIsShrunk] = useState(false)

  const handleClickOutSide = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShrunk(true)
      } else {
        setIsShrunk(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide)

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [])

  const handleClick = () => {
    isHambuger === false ? setIsHambuger(true) : setIsHambuger(false)
  }

  const handleChange = (e) => (
    setSearchTerm(e.target.value)
  )

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResult([]);
      setIsVisible(false);
      return;
    }
    getSearchData(searchTerm).then((data) => {
      if (data.length > 0) {
        setIsVisible(true)
        let temp = data
        data.map((item) => (
          temp.highlight = item.value.toLowerCase().indexOf(searchTerm.toLowerCase())
        ))
        setSearchResult(temp)
      } else {
        setIsVisible(false);
      }
    });
  }

  const BottomHeader = () => (
    <div className="spaceBetween">
      {!isMobile && <>
        <HeaderLink />
        <RectButton title="Наш мерч →" />
      </>}
    </div>
  )

  const headerSearchClick = (link, scrollSpy) => {
    navigate(link)

    if (scrollSpy) {
      setTimeout(() => {
        const section = document.getElementById(scrollSpy)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
          console.log('OK')
        }
      }, 300)
    }
    setIsVisible(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="scrollWrapper">
      <div className='headerScroll'>
        <div className="container">
          <div className={`spaceBetween topHeader ${isShrunk ? 'scrolled' : ''}`}>
            <img onClick={() => navigate('/')} src={logo} alt="logo" style={{ cursor: 'pointer' }} />
            <div className="headerInput">
              <div className="alignCenter">
                <img src={search} alt='search' style={{ cursor: 'pointer', marginRight: '5px' }} onClick={handleSearch} />
                <input placeholder="ПОИСК" onKeyDown={handleKeyDown} value={searchTerm} onChange={handleChange} style={{}} />
              </div>
              {isVisible && searchResult.length > 0 && (
                <div ref={componentRef} className="headerSearchPosition">
                  {searchResult.map((item, index) => {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const parts = item.value.split(regex);
                    return (
                      <React.Fragment key={index}>
                        <div className="x12_3" onClick={() => headerSearchClick(item.link, item.scrollSpy)} style={{ width: '475px', overflow: 'hidden' }}>
                          {parts.map((part, idx) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
                              <span key={idx} style={{ fontWeight: 700 }}>
                                {part}
                              </span>
                            ) : (
                              (part[0] === ' ' && part[part.length - 1] === ' ') ? `\u00A0${part}\u00A0` :
                                part[0] === ' ' ? `\u00A0${part}` :
                                  part[part.length - 1] === ' ' ? `${part}\u00A0` : part
                            )
                          )}
                        </div>
                        <div style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                          <hr style={{ borderColor: '#CFCFCF' }} />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>

            <p className="phoneNumber">+7 (495) 720-12-82</p>
            <div className="circleBtnWrapper">
              <a href="https://web.telegram.org" rel="noreferrer" target="_blank"><CircleButton scale='0.698' icon={darkTelegram} /></a>
              <a href="https://vk.com" rel="noreferrer" target="_blank"><CircleButton scale='0.698' icon={darkVK} /></a>
            </div>
            <div className="requestBtn">
              <Link to="contactSection" spy={true} smooth={true}><DefaultButton title="ОСТАВИТЬ ЗАЯВКУ" /></Link>
            </div>
            <img className="hambugerImg" src={hambuger} onClick={handleClick} alt="hambuger" />
          </div>
          <hr />
          <BottomHeader />
          {!isMobile && isShrunk && <hr />}
          {isHambuger && isMobile && <MobileHeaderLink />}
        </div>
      </div>
    </header>
  )
}

export default Header