import { useState, useEffect } from "react"
import { deleteCase, getCases } from "../../api/caseAPI"
import { Button, } from "@mui/material"
import { deleteSite, getSite } from "../../api/siteAPI"
import { deleteEquip, getEquips } from "../../api/equipAPI"
import { deleteFactory, getFactorys } from "../../api/facAPI"
import { deleteThree, getThrees } from "../../api/threeAPI"
import { deleteReview, getReviews } from "../../api/reviewAPI"
import endpoint from "../../config/config"
import { useNavigate } from "react-router-dom"
import { AdminSection } from "./AdminSection"
import FormDialog from "./Modal"
import { deleteParticipant, getParticipant } from "../../api/participantAPI"
import { getTeam } from "../../api/teamAPI"

const Publist = () => {

  const navigate = useNavigate()

  const [cases, setCases] = useState([])
  const caseColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Имя", flex: 1 },
    { field: "queue", headerName: "Очередь", flex: 1 },
    { field: "type", headerName: "Тип", flex: 1 },
    { field: "venue", headerName: "Адрес", flex: 1 },
    { field: "guests", headerName: "Гости", flex: 0.5 },
    {
      field: "video",
      headerName: "Дело",
      flex: 1,
      renderCell: (params) => (
        <video
          src={`${endpoint}/uploads/cases/${params.value}`}
          alt="avatar"
          style={{ width: 80, height: 50, marginRight: 8, objectFit: 'cover' }}
          controls
        />
      ),
    },
    {
      field: "action",
      headerName: "Действие",
      flex: 3,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/case', Data: params.row })}
          >
            Редактировать
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
    {
      field: "addAction",
      headerName: "Добавить решение",
      flex: 1.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog(params.row._id)}
        >
          Добавить
        </Button>
      ),
    },
  ]

  const [sites, setSites] = useState([])
  const siteColums = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Имя", flex: 1 },
    { field: "queue", headerName: "Очередь", flex: 1 },
    { field: "type", headerName: "Тип", flex: 1 },
    { field: "capacity", headerName: "Вместимость", flex: 1 },
    { field: "address", headerName: "Адрес", flex: 1 },
    { field: "link_page", headerName: "Ссылка Страница", flex: 1 },
    {
      field: "video",
      headerName: "Сайт",
      flex: 1,
      renderCell: (params) => (
        <video
          src={`${endpoint}/uploads/site/${params.value}`}
          alt="avatar"
          style={{ width: 80, height: 80, marginRight: 8, objectFit: 'cover' }}
          controls
        />
      ),
    },
    {
      field: "action",
      headerName: "Действие",
      flex: 2,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/site', Data: params.row })}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleSiteDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const [equipment, setEquipment] = useState([])
  const equipmentColums = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Имя", flex: 1 },
    { field: "queue", headerName: "Очередь", flex: 1 },
    { field: "type", headerName: "Тип", flex: 1 },
    { field: "description", headerName: "Описание", flex: 2 },
    { field: "manufacturer", headerName: "Производитель", flex: 1 },
    {
      field: "images",
      headerName: "Оборудование",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${endpoint}/uploads/equipment/${params.value?.[0]}`}
          alt="avatar"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Действие",
      flex: 2,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/equipment', Data: params.row })}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleEquipDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const [factory, setFactory] = useState([])
  const factoryColums = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Название", flex: 2 },
    { field: "queue", headerName: "Очередь", flex: 1 },
    { field: "description", headerName: "Описание", flex: 3 },
    {
      field: "video",
      headerName: "Завод Показать",
      flex: 1,
      renderCell: (params) => (
        <video
          src={`${endpoint}/uploads/factory/${params.value}`}
          alt="avatar"
          style={{ width: 70, height: 50, marginRight: 8, objectFit: 'cover' }}
          controls
        />
      ),
    },
    {
      field: "action",
      headerName: "Действие",
      flex: 2,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/factory', Data: params.row })}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleFactoryDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const [revlist, setRevlist] = useState([])
  const reviewColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "type", headerName: "Тип", flex: 1 },
    { field: "name", headerName: "Имя", flex: 1 },
    { field: "queue", headerName: "Очередь", flex: 1 },
    { field: "displayType", headerName: "Тип", flex: 1 },
    { field: "content", headerName: "Содержание", flex: 2 },
    {
      field: "action",
      headerName: "Действие",
      flex: 2,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/review', Data: params.row })}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRevDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const [three, setThree] = useState([])
  const threeColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title1", headerName: "Название1", flex: 2 },
    { field: "title2", headerName: "Название2", flex: 2 },
    {
      field: "video",
      headerName: "3D-визуализация",
      flex: 2,
      renderCell: (params) => (
        <video
          src={`${endpoint}/uploads/three_d/${params.value}`}
          alt="avatar"
          style={{ width: 80, height: 50, marginRight: 8 }}
          controls
        />
      ),
    },
    {
      field: "action",
      headerName: "Действие",
      flex: 2,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/three', Data: params.row })}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleThreeDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]

  const [participant, setParticipant] = useState([])
  const participantColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Имя", flex: 4 },
    {
      field: "image",
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${endpoint}/uploads/participant/${params.value}`}
          alt="avatar"
          style={{ width: 50, height: 50, marginRight: 8, objectFit: 'cover' }}
          controls
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/participant', Data: params.row })}
          >
            Изменить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleParticipantDelete(params.row._id)}
          >
            Удалить
          </Button>
        </div>
      ),
    },
  ]
  const [team, setTeam] = useState([])
  const teamColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "tag1", headerName: "Тег1", flex: 1 },
    { field: "tag2", headerName: "Тег2", flex: 1 },
    { field: "tag3", headerName: "Тег3", flex: 1 },
    { field: "tag4", headerName: "Тег4", flex: 1 },
    { field: "tag5", headerName: "Тег5", flex: 1 },
    { field: "tag6", headerName: "Тег6", flex: 1 },
    { field: "tag7", headerName: "Тег7", flex: 1 },
    { field: "tag8", headerName: "Тег8", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="flexWrap itemCenter" style={{ height: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateClick({ url: '/admin/team', Data: params.row })}
          >
            Изменить
          </Button>
        </div>
      ),
    },
  ]

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const handleOpenDialog = (id) => {
    setSelectedId(id)  // Set the selected row ID
    setOpenDialog(true) // Open the dialog
  }

  const handleCloseDialog = () => {
    setOpenDialog(false) // Close the dialog
    setSelectedId(null)  // Reset the selected ID
  }

  const handleDelete = (index) => {
    deleteCase(index).then((data) => {
      const temp = addId(data)
      setCases(temp)
    })
  }

  const handleNewCreate = (url) => {
    navigate(url)
  }

  const handleUpdateClick = ({ url, Data }) => {
    // Navigate to the update page and pass the case data
    navigate(url, { state: { Data } })
  }

  const handleEquipDelete = (index) => {
    deleteEquip(index).then((data) => {
      const temp = addId(data)
      setEquipment(temp)
    })
  }

  const handleSiteDelete = (index) => {
    deleteSite(index).then((data) => {
      const temp = addId(data)
      setSites(temp)
    })
  }

  const handleRevDelete = (index) => {
    deleteReview(index).then((data) => {
      const temp = addId(data)
      setRevlist(temp)
    })
  }

  const handleFactoryDelete = (index) => {
    deleteFactory(index).then((data) => {
      const temp = addId(data)
      setFactory(temp)
    })
  }

  const handleThreeDelete = (index) => {
    deleteThree(index).then((data) => {
      const temp = addId(data)
      setThree(temp)
    })
  }

  const handleParticipantDelete = (index) => {
    deleteParticipant(index).then((data) => {
      const temp = addId(data)
      setParticipant(data)
    })
  }

  const addId = (data) => {
    let temp = []
    data.map(
      (item, index) => ((temp[index] = item), (temp[index].id = index + 1))
    )
    return temp
  }

  useEffect(() => {
    getCases().then((data) => {
      const temp = addId(data)
      setCases(temp)
    })
    getSite().then((data) => {
      const temp = addId(data)
      setSites(temp)
    })
    getEquips().then((data) => {
      const temp = addId(data)
      setEquipment(temp)
    })
    getThrees().then((data) => {
      const temp = addId(data)
      setThree(temp)
    })
    getFactorys().then((data) => {
      const temp = addId(data)
      setFactory(temp)
    })
    getReviews().then((data) => {
      const temp = addId(data)
      setRevlist(temp)
    })
    getParticipant().then((data) => {
      const temp = addId(data)
      setParticipant(temp)
    })
    getTeam().then((data) => {
      const temp = addId(data)
      setTeam(temp)
    })
  }, [])

  return (
    <div className="adminPage">

      <AdminSection id='newCase' title='Кейсы мероприятий' columns={caseColumns} data={cases} handleNewCreate={() => handleNewCreate('/admin/case')} />

      <AdminSection id='newSite' title='Каталог площадок' columns={siteColums} data={sites} handleNewCreate={() => handleNewCreate('/admin/site')} />

      <AdminSection id='newEquipment' title='Каталог оборудования' columns={equipmentColums} data={equipment} handleNewCreate={() => handleNewCreate('/admin/equipment')} />

      <AdminSection id='newReview' title='Отзывы (Нас рекомендуют)' columns={reviewColumns} data={revlist} handleNewCreate={() => handleNewCreate('/admin/review')} />

      <AdminSection id='newFactory' title='Блог #ЗаводШоу' columns={factoryColums} data={factory} handleNewCreate={() => handleNewCreate('/admin/factory')} />

      <AdminSection id='newParticipant' title='Репетиционная база' columns={participantColumns} data={participant} handleNewCreate={() => handleNewCreate('/admin/participant')} />

      <AdminSection id='newThree' title='3D-визуализация' columns={threeColumns} data={three} handleNewCreate={() => handleNewCreate('/admin/three')} />

      <AdminSection id='newTeam' title='Команда' columns={teamColumns} data={team} handleNewCreate={() => handleNewCreate('/admin/team')} />

      <FormDialog opened={openDialog} idd={selectedId} onClose={handleCloseDialog} />
    </div>
  )
}

export default Publist
