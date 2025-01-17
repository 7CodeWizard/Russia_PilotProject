import { useEffect, useState } from "react"
import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Slider, TextField, Typography, } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.module.css"
import { insertCase, updateCase } from "../../../api/caseAPI"
import { getSite } from "../../../api/siteAPI"
import { getEquips } from "../../../api/equipAPI"
import endpoint from "../../../config/config"
import MultipleValueTextInput from "react-multivalue-text-input"
import { Dropzone, FileMosaic } from "@files-ui/react"
import { getThrees } from "../../../api/threeAPI"
import { useLocation, useNavigate } from "react-router-dom"
import { CreatePageWrapper } from "../AdminSection"
import { TabButton } from "../../../components/Buttons"
import { darkAdd } from "../../../assets"
import { Input, SelectBox, TextArea } from "../../../components/Inputs"

const NewCase = () => {

  const [site, setSite] = useState([])
  const [dData, setDdata] = useState([])
  const [equipment, setEquipment] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getSite().then((data) => {
      setSite(data)
    })
    getEquips().then((data) => {
      setEquipment(data)
    })
    getThrees().then((data) => {
      setDdata(data)
    })
  }, [])

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const location = useLocation()
  const { Data } = location.state || {}
  const [formData, setFormData] = useState({
    cities: Data?.cities || [],
    name: Data?.name || "",
    type: Data?.type || "частное",
    startDate: Data?.startDate || "",
    endDate: Data?.endDate || "",
    guests: Data?.guests || "",
    venue: Data?.venue || "",
    tags: Data?.tags || [],
    checkbox: Data?.checkbox || [],
    d_id: Data?.d_id || "",
    features: Data?.features || "",
    site: Data?.site || '',
    equipment: Data?.equipment || [],
    queue: Data?.queue || 0,
    images: []
  })

  const [cities, setCities] = useState(Data?.cities || [])

  const options = [
    'Свет',
    'Звук',
    'Видео',
    '3D',
    'Одежда сцены',
    'Репетиционная база'
  ]
  const options2 = [
    'Home',
    'Light',
    'Sound',
    'Video',
    'Stage',
    'Events',
    'Tours',
    '3D',
  ]

  const handleItemAdded = (item) => {
    setCities([...cities, item])
  }

  const handleItemDeleted = (item) => {
    setCities(cities.filter((city) => city !== item))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value, })
  }

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0], })
  }

  const updateFiles = (incomingFiles) => {
    setFormData({ ...formData, images: incomingFiles })
  }

  const handleChangeDate = (date) => {
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).replace(' г.', '')
    setSelectedDate(date)
    setFormData({ ...formData, startDate: formattedDate })
  }

  const handleChangeEndDate = (date) => {
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).replace(' г.', '')
    setSelectedEndDate(date)
    setFormData({ ...formData, endDate: formattedDate })
  }

  const handleSiteChange = (event) => {
    setFormData({
      ...formData,
      site: event.target.value // Update the site value in formData
    })
  }

  const handle3DChange = (event) => {
    setFormData({
      ...formData,
      d_id: event.target.value
    })
  }

  const handleEquipmentChange = (e, equipmentId) => {
    const { checked } = e.target

    setFormData((prevState) => {
      const newEquipments = checked
        ? [...prevState.equipment, equipmentId] // Add equipment ID if checked
        : prevState.equipment.filter((id) => id !== equipmentId) // Remove if unchecked

      return { ...prevState, equipment: newEquipments }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newFormData = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === "tags") {
        formData[key].forEach(item => newFormData.append("tags[]", item))
      } else if (key === "equipment") {
        formData[key].forEach(item => newFormData.append("equipment[]", item))
      } else if (key === "images") {
        formData[key].forEach((file) => newFormData.append("images", file.file))
      } else if (key === "checkbox") {
        formData[key].forEach(item => newFormData.append("checkbox[]", item))
      } else if (key === "cities") {
        cities?.forEach(item => newFormData.append("cities[]", item))
      } else {
        newFormData.append(key, formData[key])
      }
    })
    Data ? updateCase(Data?._id, newFormData).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        navigate('/admin')
      }
    }) : insertCase(newFormData).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        navigate('/admin')
      }
    })
  }

  const inputinfo = [
    {
      title: 'ФИО',
      name: 'name',
      type: 'text',
      placeholder: 'ВХОДНАЯ ФИО',
    },
    {
      title: 'ТИП',
      name: 'type',
      type: 'text',
      placeholder: 'ВХОДНАЯ ТИП',
      option: ['частное', 'тур', 'корпоративное', 'городское'],
    },
    {
      title: 'Место проведения',
      name: 'venue',
      type: 'text',
      placeholder: 'ВХОДНАЯ Место проведения',
    },
    {
      title: 'Гости',
      name: 'guests',
      type: 'text',
      placeholder: 'ВХОДНАЯ Гости',
    },
    {
      title: 'Функции',
      name: 'features',
      type: 'text',
      placeholder: 'ВХОДНАЯ Функции',
    },
  ]

  return (
    <CreatePageWrapper title='Введите данные вашего сайта здесь' handleSubmit={handleSubmit}
      content={
        <>
          <TabButton icon={darkAdd} title='Выбрать файл' onChange={handleVideoChange} />
          {formData.video && <Typography> Выбранный файл: {formData.video.name}</Typography>}

          <Dropzone onChange={updateFiles} value={formData.images}>
            {formData.images.map((file) => (
              <FileMosaic {...file} preview />
            ))}
          </Dropzone>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>{inputinfo[0].title}</p>
            <Input value={formData[inputinfo[0].name]} item={inputinfo[0]} handleChange={handleChange} />
          </div>

          <div>
            <p className='x16'>{inputinfo[1].title}</p>
            <SelectBox value={formData[inputinfo[1].name]} item={inputinfo[1]} handleSelect={handleChange} />
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>Входные данные города</p>
            <MultipleValueTextInput
              className="InputText x14 alignCenter"
              onItemAdded={handleItemAdded}
              onItemDeleted={handleItemDeleted}
              name="city-input"
              placeholder="Введите названия городов, разделяя их ЗАПЯТОЙ или нажимая клавишу ENTER."
              values={cities}
            />
            <Typography variant="body1">Текущие города: {cities?.join(", ")}</Typography>
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>{formData.type === 'тур' ? 'Художник' : 'Место проведения'}</p>
            <Input value={formData[inputinfo[2].name]} item={inputinfo[2]} handleChange={handleChange} />
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>Очередь</p>
            <Input value={formData[inputinfo[2].name]} item={inputinfo[2]} handleChange={handleChange} />
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>Период : </p>
            <div className="alignCenter ">
              <DatePicker
                name="date"
                className="datePicker InputText x14 alignCenter"
                selected={selectedDate}
                onChange={handleChangeDate}
                value={formData.startDate}
                dateFormat="yyyy/MM/dd"
                required
              />
              &nbsp;~&nbsp;
              <DatePicker
                name="date"
                className="datePicker InputText x14 alignCenter"
                selected={selectedEndDate}
                onChange={handleChangeEndDate}
                value={formData.endDate}
                dateFormat="yyyy/MM/dd"
                required
              />
            </div>
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>{formData.type === 'тур' ? 'Расстояние' : 'Гости'}</p>
            <Input value={formData[inputinfo[3].name]} item={inputinfo[3]} handleChange={handleChange} />
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>Очередь</p>
            <Slider min={0} max={100} value={formData.queue} name="queue" onChange={handleChange} valueLabelDisplay="auto" />
          </div>

          <div>
            <p className='x16' style={{ marginBottom: '12px' }}>{inputinfo[4].title}</p>
            <TextArea
              name={inputinfo[4].name}
              value={formData[inputinfo[4].name]}
              onChange={handleChange}
              placeholder={inputinfo[4].placeholder}
            />
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Box sx={{ width: '100%' }}>
              <p className='x16' style={{ marginBottom: '12px' }}>Теги</p>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                value={formData?.tags}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, 'tags': newValue, })
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Click to Add more"
                    className="InputText x14 alignCenter"
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6">Event Cases CheckBox</Typography>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={options2}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                value={formData?.checkbox}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, 'checkbox': newValue, })
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Click to Add more"
                    className="InputText x14 alignCenter"
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box>
            <FormControl>
              <p className='x16' style={{ marginBottom: '12px' }}>Сайты</p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.site}
                onChange={handleSiteChange}
              >
                {site?.map((item, index) => (
                  <FormControlLabel key={index} value={item._id}
                    control={<Radio sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: '20px',
                        color: '#CFCFCF',
                      },
                    }} />}
                    label={<div className="alignCenter">
                      <video
                        src={`${endpoint}/uploads/site/${item.video}`}
                        alt={item.name}
                        style={{ width: 80, height: 80, marginRight: 8 }}
                        controls
                      >
                        Ваш браузер не поддерживает тег видео.
                      </video>
                    </div>} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box>
            <FormControl component="fieldset">
              <p className='x16' style={{ marginBottom: '12px' }}>Оборудование</p>
              <FormGroup aria-label="position" row>
                {equipment?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={formData.equipment?.includes(item._id)}
                        onChange={(e) => handleEquipmentChange(e, item._id)}
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: '20px',
                            color: '#CFCFCF',
                          },
                        }}
                      />
                    }
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={`${endpoint}/uploads/equipment/${item.images[0]}`}
                          alt={item.name}
                          style={{ width: 40, height: 40, marginRight: 8 }}
                        />
                      </div>
                    }
                    labelPlacement="end"
                  />
                ))}
              </FormGroup>
            </FormControl>

          </Box>

          <Box>
            <FormControl>
              <p className='x16' style={{ marginBottom: '12px' }}>3D визуализация</p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.d_id}
                onChange={handle3DChange}
              >
                {
                  dData?.map((item, index) => (
                    <FormControlLabel key={index} value={item._id}
                      control={<Radio sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: '20px',
                          color: '#CFCFCF',
                        },
                      }} />}
                      label={<div style={{ display: 'flex', alignItems: 'center' }}>
                        <video
                          src={`${endpoint}/uploads/three_d/${item.video}`}
                          alt={index}
                          style={{ width: 80, height: 80, marginRight: 8 }}
                          controls
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>} />
                  ))
                }
              </RadioGroup>
            </FormControl>
          </Box>
        </>
      }
    />
  )
}

export default NewCase
