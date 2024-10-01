import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Slider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MobileCheckBox, MobileSelectBox } from "../../../components/Inputs";
import { BlackButton, OutLinedButton } from "../../../components/Buttons";

const CustomSlider = styled(Slider)({
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

export const MobileFilterSection = ({ progress, checkText, fieldInfo }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <div
                style={{ width: "100%" }}
                id="demo-positioned-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <label style={{ color: "#FFFFFF" }}>Фильтр</label>
                <div className="custom-select">
                    <select className="selectBox">
                        <option value="Все кейсы">Все кейсы</option>
                    </select>
                </div>
            </div>
            <Menu
                id="demo-positioned-menu"
                className="mobileHidden"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {fieldInfo.map((item, index) => (
                    <MenuItem key={index} sx={{ p: 0, m: 0 }}>
                        <MobileSelectBox item={item} />
                    </MenuItem>
                ))}
                {progress && (
                    <div style={{ padding: "10px 0", width: "90%", margin: "auto" }}>
                        <label style={{ color: "rgba(104, 104, 104, 1)" }}>{progress}</label>
                        <CustomSlider
                            min={-30} max={60} defaultValue={0} />
                        <div className="spaceBetween">
                            <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>30</p>
                            <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>1k</p>
                            <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>10k</p>
                            <p className="slideNumber" style={{ color: "rgba(104, 104, 104, 1)" }}>60k</p>
                        </div>
                    </div>
                )}
                {checkText &&
                    checkText.map((title, index) => (
                        <MenuItem key={index}>
                            <MobileCheckBox title={title} />
                        </MenuItem>
                    ))}
                <MenuItem sx={{ mt: 2, gap: "10px" }}>
                    <BlackButton title="применить" />
                    <OutLinedButton title="сбросить" />
                </MenuItem>
            </Menu>
        </div>
    )
}