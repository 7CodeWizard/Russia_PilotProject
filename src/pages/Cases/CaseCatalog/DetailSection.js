import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, ButtonGroup, FormGroup, Menu, MenuItem, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlackButton, BlackButtonBorderWhite, DefaultButton, OutLinedButton } from "../../../components/Buttons";
import { CaseCatalogCard } from "../../../components/Cards";
import { CheckBox, MobileCheckBox, SelectBox1, SelectBox2 } from "../../../components/Inputs";
import './caseCatalog.css';

const CustomSlider = styled(Slider)({
    color: "#1976d2",
    "& .MuiSlider-thumb": {
        backgroundColor: "#FFFFFF",
    },
    "& .MuiSlider-rail": {
        color: "var(--secondaryWhiteColor)",
        opacity: "1",
    },
    "& .MuiSlider-track": {
        color: "#FFFFFF",
    },
});

const MobileCustomSlider = styled(Slider)({
    color: "#1976d2", // Main color for the slider bar
    "& .MuiSlider-thumb": {
        backgroundColor: "rgba(104, 104, 104, 1)", // Thumb color
    },
    "& .MuiSlider-rail": {
        color: "rgba(104, 104, 104, 1)", // Rail color (unfilled part)
    },
    "& .MuiSlider-track": {
        color: "rgba(207, 207, 207, 1)", // Track color (filled part)
    },
});

const DetailSection = ({ type, data, progress, fieldInfo, checkText }) => {

    const moreTitle = type === 'case' ? 'КЕЙСЫ' : type === 'platform' ? 'ПЛОЩАДКИ' : 'ОБОРУДОВАНИЕ'
    const [result, setResult] = useState([]);
    const [sliceData, setSliceData] = useState([]);
    const [fieldData, setFieldData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchData, setSearchData] = useState({
        type: '',
        startDate: '',
        venue: '',
        city: '',
        equipment: '',
        name: '',
        categoryType: '',
        brand: '',
        visualization: false,
        generator: false,
    });
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        const newFieldInfo = fieldInfo.map((field) => {
            switch (field?.name) {
                case "type":
                case "startDate":
                case "venue":
                case "city":
                case "name":
                    return {
                        ...field,
                        option: Array.from(new Set(data.map(item => item[field.name]))),
                    };
                default:
                    return field;
            }
        });
        setResult(data);
        setFieldData(newFieldInfo);
        setSliceData(data.slice(0, 8))
    }, [data, fieldInfo]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setSearchData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSearchData({
            type: '',
            date: '',
            venue: '',
            city: '',
            equipment: '',
            name: '',
            visualization: false,
            generator: false,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        handleClose();
        const filteredData = data.filter((item) =>
            (!searchData.type || item.type.toUpperCase().includes(searchData.type.toUpperCase())) &&
            (!searchData.startDate || item.startDate.toUpperCase().includes(searchData.startDate.toUpperCase())) &&
            (!searchData.venue || item.venue.toUpperCase().includes(searchData.venue.toUpperCase())) &&
            (!searchData.city || item.city.toUpperCase().includes(searchData.city.toUpperCase())) &&
            (!searchData.equipment || item.equipment.toUpperCase().includes(searchData.equipment.toUpperCase())) &&
            (!searchData.name || item.name.toUpperCase().includes(searchData.name.toUpperCase())) &&
            (!searchData.visualization || item.visualization === searchData.visualization) &&
            (!searchData.generator || item.generator === searchData.generator)
        );
        setResult(filteredData);
        setSliceData(filteredData.slice(0, 8))
    };

    const addUsers = () => {
        setSliceData(result)
    }

    const reduceUsers = () => (
        setSliceData(result.slice(0, 8))
    )

    return (
        <section className="flexWrapBetween">
            <form className='selectBoxSquare'>
                <Box className='mobileShow'>
                    {fieldData && fieldData.map((item, index) => (
                        <SelectBox1
                            key={index}
                            item={item}
                            value={searchData[item.name]}
                            handleSelect={handleChange}
                        />
                    ))}
                    {progress && (
                        <div style={{ paddingBottom: "30px", width: "100%" }}>
                            <label style={{ color: "#FFFFFF" }}>{progress}</label>
                            <CustomSlider
                                min={-500} // Minimum value, shifting the slider left
                                max={0} // Maximum value
                                defaultValue={-500}
                            />
                            <div className="spaceBetween">
                                <p className="slideNumber">30</p>
                                <p className="slideNumber">1k</p>
                                <p className="slideNumber">10k</p>
                                <p className="slideNumber">60k</p>
                            </div>
                        </div>
                    )}
                    <FormGroup>
                        {/* <CheckBox title='С 3D-визуализацией' name='visualization' value={searchData['visualization']} handleCheck={handleChange} />
                        <CheckBox title='С генератором' name='generator' value={searchData['generator']} handleCheck={handleChange} /> */}
                        {
                            checkText &&
                            checkText.map((title, index) => (
                                <CheckBox key={index} title={title} />
                            ))
                        }
                    </FormGroup>
                    <ButtonGroup sx={{ mt: 4, gap: '10px' }}>
                        <DefaultButton onClick={handleSearch} title="применить" />
                        <BlackButtonBorderWhite onClick={handleReset} title="сбросить" />
                    </ButtonGroup>
                </Box>
                <Box className='selectBoxSquare mobileHidden'>
                    <div
                        style={{ width: '100%', marginBottom: '30px' }}
                        id="demo-positioned-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <label style={{ color: '#FFFFFF' }}>Фильтр</label>
                        <div className="custom-select">
                            <select className="selectBox">
                                <option value='Все кейсы'>Все кейсы</option>
                            </select>
                        </div>
                    </div>
                    <Menu
                        id="demo-positioned-menu"
                        className='mobileHidden'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {fieldInfo.map((item, index) => (
                            <MenuItem key={index} sx={{ p: 0, m: 0 }}>
                                <SelectBox2 key={index} item={item} value={searchData[item.name]} handleSelect={handleChange} />
                            </MenuItem>
                        ))}
                        {
                            progress && (
                                <div style={{ padding: "10px 0", width: "90%", margin: "auto" }}>
                                    <label style={{ color: "rgba(104, 104, 104, 1)" }}>
                                        {progress}
                                    </label>
                                    <MobileCustomSlider
                                        min={-30} // Minimum value, shifting the slider left
                                        max={60} // Maximum value
                                        defaultValue={0}
                                    />
                                    <div className="spaceBetween">
                                        <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>30</p>
                                        <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>1</p>
                                        <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>10k</p>
                                        <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>60k</p>
                                    </div>
                                </div>
                            )
                        }
                        {/* <MenuItem>
                            <CheckBox title='С 3D-визуализацией' name='visualization' value={searchData['visualization']} handleCheck={handleChange} />
                        </MenuItem>
                        <MenuItem>
                            <CheckBox title='С генератором' name='generator' value={searchData['generator']} handleCheck={handleChange} />
                        </MenuItem> */}
                        {checkText &&
                            checkText.map((title, index) => (
                                <MenuItem key={index}>
                                    <MobileCheckBox title={title} />
                                </MenuItem>
                            ))}
                        <MenuItem sx={{ mt: 2, gap: '10px' }}>
                            <BlackButton onClick={handleSearch} title="применить" />
                            <OutLinedButton onClick={handleReset} title="сбросить" />
                        </MenuItem>
                    </Menu>
                </Box>
            </form>

            <div
                className="caseImageSquare flexWrapBetween"
                style={{ gap: "clamp(20px, 1.5vw, 30px)" }}
            >
                {sliceData.map((item, index) => (
                    <CaseCatalogCard
                        key={index}
                        type={type}
                        item={item}
                        onClick={() => {
                            navigate(
                                type === 'case' ? `/case-one/${item?._id}` :
                                    type === 'platform' ? `/site-one/${item?._id}` :
                                        `/equipment-one/${item?._id}`
                            );
                        }}
                    />
                ))}
                <div className="itemCenter" style={{ paddingTop: "clamp(40px, 4vw, 45px)", width: "100%" }}>
                    {sliceData.length === result.length ?
                        <DefaultButton onClick={reduceUsers} title={`СКРЫТЬ БОЛЬШЕ ${moreTitle}`} /> :
                        <DefaultButton onClick={addUsers} title={`СМОТРЕТЬ ЕЩЁ ${moreTitle}`} />
                    }
                </div>
            </div>
        </section>
    );
};

export default DetailSection;
