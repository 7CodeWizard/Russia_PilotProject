import { useState } from "react";
import {
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { insertFactory, updateFactory } from "../../../api/facAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "../../../components/Buttons";
import { darkAdd } from "../../../assets";
import { Input, TextArea } from "../../../components/Inputs";
import { insertParticipant, updateParticipant } from "../../../api/participantAPI";

const NewParticipant = () => {

  const location = useLocation();
  const { Data } = location.state || {};

  const [formData, setFormData] = useState({
    name: Data?.name || "",
  });
  const inputinfo = { title: 'Имя', name: 'name', type: 'text', placeholder: 'Введите Имя' }
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0], });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let newFormData = new FormData()
    Object.keys(formData).forEach(key => {
      newFormData.append(key, formData[key]);
    });

    Data ? updateParticipant(Data?._id, newFormData).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        navigate('/admin')
      }
    }) : insertParticipant(newFormData).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        navigate('/admin')
      }
    })
  };

  return (
    <CreatePageWrapper title='Введите данные участника здесь' handleSubmit={handleSubmit}
      content={
        <>
          <TabButton icon={darkAdd} title='Выбрать видео' onChange={handleImageChange} />
          {formData.image && <Typography>Selected File: {formData.image.name}</Typography>}
          <Input value={formData.name} item={inputinfo} handleChange={handleChange} />
        </>
      } />
  );
};

export default NewParticipant;
