import { useState } from 'react'
import { DefaultButton, TabButton } from '../../components/Buttons'
import { Input, TextArea } from '../../components/Inputs'
import { darkAdd, smallFatUser, whiteMail, whitePhone } from '../../assets'
import { SmallAvatar } from '../../components/Avatars'
import { Typography } from '@mui/material'
import { sendEmail } from '../../api/emailAPI'

const inputinfo = [
  {
    title: 'ФИО',
    name: 'name',
    type: 'text',
    placeholder: 'Иванов Иван Иванович',
  },
  {
    title: 'Контакты',
    name: 'email',
    type: 'email',
    placeholder: 'Email, социальные сети, телефон',
  },
]

const ContactHeader = ({ title }) => (
  <div className="contactTop" >
    <div className='flexWrapBetween'>
      <p className='sectionTitle'>{title}</p>
      <p className='x18Font_2 chichaShow' style={{ maxWidth: '290px' }}>Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>
    </div>
    <hr className='hrStyle' />
    <p className='x18Font_2 chichaHidden' style={{ maxWidth: '290px', marginBottom: '30px' }}>Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>
  </div>
)

const ContactMiddle = ({ sendData, handleChange, handleSubmit, setError, error }) => (
  <form className="contactMiddle flexWrap" onSubmit={handleSubmit}>
    <div className="formLeft">
      {inputinfo.map((item, index) => (
        <div key={index}>
          <p className='x16' style={{ marginBottom: '12px' }}>{item.title}</p>
          <Input item={item} handleChange={handleChange} />
        </div>
      ))}
    </div>
    <div className="formRight">
      <p className='x16' style={{ marginBottom: '12px' }}>Краткая информация о мероприятии</p>
      <TextArea
        name="content"
        value={sendData.content}
        onChange={handleChange}
        placeholder={'Какое хотите провести: частное, корпоративное, \nделовое, государственное?'}
      />
    </div>

    <div className="formLeft">
      <p className='x16' style={{ marginBottom: '12px' }}>Прикрепить файл</p>
      <div className='spaceBetween'>
        <div>
          <TabButton icon={darkAdd} title='Выбрать файл' onChange={handleChange} setError={setError} error={error} />
          {
            error && (
              <Typography color="error" variant="body2">
                Please select a file
              </Typography>
            )
          }
        </div>
        <p className='x14 uploadDescription' style={{ width: 'clamp(160px, 16vw, 167px)' }}>Файлы до 3 МБ. DOC,<br /> PDF, JPG, форматы Exel</p>
      </div>
    </div>
    <div className="formRight" style={{ display: 'flex', alignItems: 'flex-end' }}>
      <DefaultButton title='ОТПРАВИТЬ ЗАЯВКУ' />
    </div>
  </form>
)

const ContactFooter = () => (
  <div className='contactFooter spaceBetween' style={{ gap: '30px' }}>
    <div className='alignCenter' style={{ gap: '20px' }}>
      <SmallAvatar url={smallFatUser} />
      <div>
        <p className='x18' >Алексей Седов</p>
        <p className='x14' >Генеральный продюсер</p>
      </div>
    </div>
    <div style={{ display: 'grid', gap: '3px' }} >
      <p className='x18 alignCenter' style={{ gap: '11px' }}><img src={whiteMail} alt='icon' />info@zavodshow.ru</p>
      <p className='x18 alignCenter' style={{ gap: '11px' }}><img src={whitePhone} alt='icon' />+7 906 065-28-33</p>
    </div>
    <p className='x14 alignCenter'>
      Задать вопрос напрямую<br /> генеральному директору
    </p>
  </div>
)
const ContactSection = ({ title }) => {
  const [sendData, setSendData] = useState({
    name: '',
    email: '',
    content: ''
  })

  const [error, setError] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'video') {
      setSendData({ ...sendData, video: e.target.files[0], });
      if (e.target.files[0]) {
        setError(false);
      }
    } else {
      setSendData({ ...sendData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!sendData.video) {
      setError(true);
    } else {
      let newFormData = new FormData()
      Object.keys(sendData).forEach(key => {
        newFormData.append(key, sendData[key]);
      });
      sendEmail(newFormData).then((data) => {
        data && alert(data.message)
        setSendData({ ...sendData, video: null })
      })
    }
  }

  return (
    <div id="contactSection" className='sectionWrapper section2'>
      <ContactHeader title={title} />
      <ContactMiddle sendData={sendData} handleChange={handleChange} setError={setError} error={error} handleSubmit={handleSubmit} />
      <hr className='hrStyle' />
      <ContactFooter />
    </div>
  )
}



export default ContactSection