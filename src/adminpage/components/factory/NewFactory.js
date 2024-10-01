import { useState } from "react";
import { Slider, Typography } from "@mui/material";
import "react-datepicker/dist/react-datepicker.module.css";
import { insertFactory, updateFactory } from "../../../api/facAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { CreatePageWrapper } from "../AdminSection";
import { TabButton } from "../../../components/Buttons";
import { darkAdd } from "../../../assets";
import { Input, TextArea } from "../../../components/Inputs";

const NewFac = () => {

    const location = useLocation();
    const { Data } = location.state || {};

    const [formData, setFormData] = useState({
        title: Data?.title || "",
        description: Data?.description || "",
        queue: Data?.queue || 0,
        links: Data?.links || ""
    });
    const inputinfo = [
        { title: 'Заголовок', name: 'title', type: 'text', placeholder: 'Введите Заголовок' },
        { title: 'Описание', name: 'description', type: 'text', placeholder: 'Введите Описание' },
        { title: 'ссылок', name: 'links', type: 'text', placeholder: 'Введите ссылок' }
    ]
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleVideoChange = (e) => {
        setFormData({ ...formData, video: e.target.files[0], });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let newFormData = new FormData()
        Object.keys(formData).forEach(key => {
            newFormData.append(key, formData[key]);
        });

        Data ? updateFactory(Data?._id, newFormData).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                navigate('/admin')
            }
        }) : insertFactory(newFormData).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                navigate('/admin')
            }
        })
    };

    return (
        <CreatePageWrapper title='Введите свой #ЗаводШоу подробности здесь' handleSubmit={handleSubmit}
            content={
                <>
                    <TabButton icon={darkAdd} title='Выбрать видео' onChange={handleVideoChange} />
                    {formData.video && <Typography> Выбранный файл: {formData.video.name}</Typography>}
                    <Input value={formData.title} item={inputinfo[0]} handleChange={handleChange} />
                    <TextArea name={inputinfo[1].name} placeholder={inputinfo[1].placeholder} onChange={handleChange} value={formData.description} />
                    <div>
                        <p className='x16' style={{ marginBottom: '12px' }}>Очередь</p>
                        <Slider min={0} max={100} value={formData.queue} name="queue" onChange={handleChange} valueLabelDisplay="auto" />
                    </div>
                    <Input value={formData.links} item={inputinfo[2]} handleChange={handleChange} />
                </>
            } />
    );
};

export default NewFac;
