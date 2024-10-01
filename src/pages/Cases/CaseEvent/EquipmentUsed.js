import { ArrowDefaultButton, Banquet } from "../../../components/Buttons"
import endpoint from "../../../config/config"

const EquipmentUsed = ({ equipment }) => {
    return (
        <section className="section2">
            <div className="cristalRoomWrapper spaceBetween">
                <div className="itemCenter cristalLeft">
                    <img src={`${endpoint}/uploads/equipment/${equipment?.images[1]}`} alt="equipment" />
                </div>
                <div className="cristalRight flexWrapBetween">
                    <div className="cristalItem1">
                        <div>
                            <p className="eventTitle" style={{ marginBottom: '20px' }}>{equipment?.name}</p>
                            <Banquet title={`${equipment?.type === 'свет' ? "Световое оборудование" : equipment?.type === 'звук' ? "звук оборудование" : "видео оборудование"}`} />
                        </div>
                        <div style={{ gap: '10px', display: 'grid' }}>
                            <p className="cristalItem2Text">Светодиодный прожектор</p>
                        </div>
                    </div>
                    <div className="cristalItem2">
                        <ArrowDefaultButton title="подробнее о технике" />
                        <div style={{ width: '180px' }}>
                            <p className="cristalItem2Text">Использовали в кейсе:</p>
                            <p className="cristalItem2Text">12 едениц</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EquipmentUsed