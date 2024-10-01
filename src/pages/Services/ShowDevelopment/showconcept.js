import React from "react";
import { bigChicha } from "../../../assets";
import CanvasComponent from "../../../components/canvas";
import { QuestionButton } from "../../../components/Buttons";
const ShowConcept = () => {

  const questionSqareInfo = [
    { title: 'Интервью с клиентом', button: ['Зачем проводится шоу?', 'Какие цели достигаются?', 'Чего ожидают от шоу?'] },
    { title: 'Анализ потребностей', button: ['Что будет темой события?', 'Какие этапы войдут в сценарий шоу?', 'Что будет основной идеей?'] },
  ]

  return (
    <div className="sectionWrapper section2" style={{ textAlign: 'center' }}>
      <div className="sectionHeader">
        <p className="sectionTitle">Как мы начинаем работу над шоу </p>
      </div>
      <div className="lampChichaSquare">
        <div className="chichaGroup1">
          <p className="showConceptQuestions">{questionSqareInfo[0].title}</p>
          <div className="questionButtonGroup">
            {questionSqareInfo[0].button.map((title, index) => (
              <div key={index} className={`${index === 1 && 'itemCenter'}`}><QuestionButton title={title} /></div>
            ))}
          </div>
        </div>

        <div className="chichaGroup" >
          <div className="chichaWrapper"></div>
          <img src={bigChicha} alt="bigchicha" style={{ position: 'relative', zIndex: '50' }} />
          <p className="showConceptsm">Концепция шоу</p>
          <p className="showConceptBasis">Основа для его разработки</p>
          <div className="canvasLine">
            <CanvasComponent />
          </div>
        </div>

        <div className="chichaGroup1">
          <p className="showConceptQuestions">{questionSqareInfo[1].title}</p>
          <div className="questionButtonGroup">
            {questionSqareInfo[1].button.map((title, index) => (
              <div key={index} className={`${index === 1 ? 'itemCenter' : 'itemEnd'}`}><QuestionButton title={title} /></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShowConcept;