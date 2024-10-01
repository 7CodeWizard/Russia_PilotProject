import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, Select } from '@mui/material'
import { greySearch } from '../../assets'
import './input.css'

export const Input = ({ item, value, handleChange }) => {
  return (
    <input
      className="InputText x14 alignCenter"
      placeholder={item.placeholder}
      name={item.name}
      onChange={handleChange}
      value={value}
      required
    />
  )
}


export const TextArea = ({ name, placeholder, onChange, value }) => {
  return (
    <textarea
      className="textArea"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      required />
  )
}


export const DetailDataInput = ({ item, index }) => (
  <div key={index} className="spaceBetween auditoriumContentCard auditoriumTextSize" style={{ paddingTop: index === 0 && 0 }}>
    <p>{item.text}</p>
    <p style={{ fontWeight: '700' }}>{item.number}</p>
  </div>
)

export const DetailDataInput1 = ({ item, index, length }) => (
  <div key={index} className="spaceBetween auditoriumContentCard auditoriumTextSize"
    style={{
      paddingTop: index === 0 && 0,
      paddingBottom: index === length - 1 ? 0 : item.text && '14px',
      borderBottom: index === length - 1 && 'none'
    }}
  >
    <div>
      <div className='alignCenter'>
        {item.img && <img src={item.img} alt="questionImg" className="questionImg" style={{ marginRight: '10px' }} />}
        <p>{item.title}</p>
      </div>
      {item.text && <p className="graySceneText" style={{}}>&nbsp;</p>}
    </div>
    <div>
      <p className="auditoriumTextSize" style={{ fontWeight: '700', textAlign: 'right' }}>
        {item.scene}
      </p>
      <p className="graySceneText" style={{}}>{item.text}</p>
    </div>
  </div>
)

export const SearchInputBasic = ({ onChange, placeholder }) => {
  return (
    <div className="searchSquare alignCenter">
      <img src={greySearch} alt="greySearch" />
      <input type="text" className="searchInput" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export const CheckBox1 = ({ title }) => (
  <FormControlLabel
    sx={{ color: `var(--secondaryWhiteColor)` }}
    control={
      <Checkbox
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "20px",
            color: "#CFCFCF",
          },
        }}
        color="default"
      />
    }
    label={title}
  />
);

export const SelectBox1 = ({ item, value, handleSelect }) => {
  return (
    <Box sx={{ mb: 3.5 }}>
      <label style={{ color: '#FFFFFF' }}>{item?.label}</label>
      <FormControl fullWidth>
        <Select
          displayEmpty
          name={item.name}
          onChange={handleSelect}
          value={value}
          variant="standard"
          className="selectBox"
        >
          <MenuItem value="" disabled hidden>
            Все
          </MenuItem>
          {item?.option.map((optionValue, optionIndex) => (
            optionValue &&
            <MenuItem key={optionIndex} value={optionValue} style={{ color: '#686868' }}>{optionValue}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
export const SelectBox2 = ({ item, value, handleSelect }) => {

  return (
    <Box>
      <FormControl fullWidth>
        <Select
          displayEmpty
          name={item.name}
          onChange={handleSelect}
          value={value}
          variant="standard"
          className="selectBox"
        >
          <MenuItem value="" disabled hidden>
            Все
          </MenuItem>
          {item?.option.map((optionValue, optionIndex) => (
            optionValue &&
            <MenuItem key={optionIndex} value={optionValue} style={{ color: '#686868' }}>{optionValue}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export const SelectBox = ({ item, value, handleSelect }) => (
  <Box>
    <label style={{ color: '#FFFFFF' }}>{item?.label}</label>
    <FormControl fullWidth>
      <Select
        displayEmpty
        name={item.name}
        onChange={handleSelect}
        value={value}
        variant="standard"
        className="selectBox"
        sx={{ height: '50px' }}
      >
        <MenuItem value="" disabled hidden>
          Все
        </MenuItem>
        {item?.option.map((optionValue, optionIndex) => (
          optionValue &&
          <MenuItem key={optionIndex} value={optionValue} style={{ color: '#686868' }}>{optionValue}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
)

export const MobileSelectBox = ({ item }) => (
  <div className="custom-select">
    <select className="selectBox" style={{ border: 'none', margin: 0 }}>
      {item.option.map((optionValue, optionIndex) => (
        <option key={optionIndex} value={optionValue} style={{ color: '#686868' }}>
          {optionValue}
        </option>
      ))}
    </select>
  </div>
)

export const CheckBox = ({ title, name, value, handleCheck }) => (
  <FormControlLabel
    sx={{ color: `var(--secondaryWhiteColor)` }}
    control={
      <Checkbox
        onChange={handleCheck}
        checked={value ? true : false}
        value={title}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '20px',
            color: '#CFCFCF',
          },
        }} color="default" />}
    label={title} name={name} />
)

export const MobileCheckBox = ({ title }) => (
  <FormControlLabel
    control={<Checkbox sx={{

      fontSize: '20px',
      color: '#686868'
    }} color="default"
    />} label={title} />
)
