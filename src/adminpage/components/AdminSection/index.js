import { Box, Button, ButtonGroup, Typography } from "@mui/material"
import { ChichaBox } from "../../../components/ChichaBox"
import DataTable from "../table/Tables"
import useScrollToTop from "../../../scrollTo/ScrollToTop"
import { BlackButtonBorderWhite, DefaultButton, OutLinedButton, TabButton } from "../../../components/Buttons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRental, insertRental } from "../../../api/rentalAPI"
import { Input } from "../../../components/Inputs"
import { darkAdd } from "../../../assets"

const AdminPageWrapper = ({ content }) => {
  useScrollToTop()

  const navigate = useNavigate()
  return (
    <div className="wrapper" style={{ paddingTop: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <Button color="success" sx={{ mb: 5 }} onClick={() => navigate('/admin')}>
            <p className="pageTitle">Добро пожаловать на страницу администратора!</p>
          </Button>
        </div>
        {content}
      </div>
    </div>
  )
}

const AdminSection = ({ title, columns, data, handleNewCreate, id }) => {
  const [rental, setRental] = useState({ cost: '', files: [] })
  useEffect(() => {
    getRental().then((data) => {
      setRental(data)
    })
  }, [])
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    // setRental((prevState) => ({ ...prevState, files: { ...prevState.files, [index]: file, } }));
    setRental((prevState) => {
      const updatedFiles = [...prevState.files];
      updatedFiles[index] = file;
      return {
        ...prevState,
        files: updatedFiles,
      };
    });
  };
  const inputinfo = { title: 'Стоимость аренды', name: 'cost', type: 'text', placeholder: 'Введите Стоимость аренды' }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental({ ...rental, [name]: value, });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormData = new FormData()
    Object.keys(rental).forEach(key => {
      if (key === "files") {
        rental[key].forEach((file) => newFormData.append("files", file))
      } else {
        newFormData.append(key, rental[key])
      }
    })
    insertRental(newFormData).then((data) => {
      console.log("data", data)
    })
  }
  const fileList = ['3D-макеты сцены', 'Тех.райдер площадки', ' Архив фото']
  return (
    <ChichaBox content={
      <Box id={id}>
        <div className="sectionHeader">
          <p className="sectionTitle" style={{ color: `var(--primaryBgColor)` }}>{title}</p>
        </div>
        <DataTable columns={columns} data={data} />
        <Button color="primary" sx={{ mt: 1 }} variant="contained" onClick={handleNewCreate}>
          Новый {title}
        </Button>
        {title === 'Репетиционная база' && <div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '18px' }} className="itemCenter">
            <div style={{ display: 'flex', gap: '10px' }} className="itemCenter">
              <p className='x16'>{inputinfo.title}:</p>
              <Input value={rental.cost} item={inputinfo} handleChange={handleChange} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {fileList.map((item, index) => (
                <div key={index}>
                  <TabButton icon={darkAdd} title={item} onChange={(e) => handleFileChange(e, index)} />
                  {rental.files[index] && <Typography> Выбранный файл: {rental.files[index].name}</Typography>}
                </div>
              ))}
            </div>
            <OutLinedButton type='submit' title='Применять' />
          </form>
        </div>}
      </Box>
    } />
  )
}

const CreatePageWrapper = ({ title, content, handleSubmit }) => {
  const navigate = useNavigate()
  return (
    <AdminPageWrapper
      content={
        <div className="sectionWrapper section1" style={{ color: `var(--secondaryWhiteColor)` }}>
          <div className="sectionHeader">
            <p className="sectionTitle">{title}</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
            {content}
            <ButtonGroup sx={{ gap: '10px' }}>
              <DefaultButton type='submit' title='Представлять на рассмотрение' />
              <BlackButtonBorderWhite title='Назад' onClick={() => { navigate('/admin') }} />
            </ButtonGroup>
          </form>
        </div>
      }
    />
  )
}

export { AdminPageWrapper, AdminSection, CreatePageWrapper }