const Font = () => {
  return <div>
    {/* menu */}
    <div>
      <div className="menuBar">КОМАНДА</div>
    </div>
    <hr />

    {/* first */}
    <div className="pageTitle">Технический продакшн<br />частных мероприятий</div>
    <div className="sectionTitle">Лучшие кейсы из портфолио</div>
    <hr />

    {/* CardS */}
    <div>
      <div className="x16">Название мероприятия</div>
      <div className="x12">Место его проведения</div>
    </div>
    <h2 className="whiteColor">Спроектируем и настроим</h2>
    <hr />

    {/* table2 */}
    <h2 className="darkColor">Проверьте идею заранее<br /> и сократите риски</h2>
    <div >
      <div className="x30Font">3D-визуализация</div>
      <div className="x18Font">Смоделируем несколько вариантов<br /> оформления сцены и выберем наиболее<br /> подходящий под требования</div>
    </div>
    <hr />

    {/* table6 */}
    <h2 className="whiteColor">Работаем на площадках</h2>
    <div className="x24Font_2">1930 Moscow</div>
    <div className="x12">Россия, Москва</div>
    <hr />

    {/* contact */}
    <div className="flex">
      <h2 className="whiteColor">У вас есть вопросы?</h2>
      <div className="x18Font">Оставьте заявку, и мы свяжемся<br /> с вами в ближайшее время</div>
    </div>
    <div className="x16Font">ФИО</div>
    <hr />

    {/* placefolder */}
    <input className="x14Gray" placeholder="Иванов Иван Иванович"></input>
    <div className="x14">Изображения<br /> и архивы до 150 Мб</div>
    <hr />

    {/* phonenumber */}
    <div className="flex">
      <div>
        <div className="x18">Алексей Седов</div>
        <div className="x14">Генеральный продюсер</div>
      </div>
      <div>
        <div className="x18">info@zavodshow.ru</div>
        <div className="x18">+7 906 065-28-33</div>
      </div>
      <div className="x14">Задать вопрос напрямую<br /> генеральному директору</div>
    </div>
    <hr />

    {/* Cards3 */}
    <h2 className="whiteColor">Блог #ЗаводШоу</h2>
    <div>
      <div className="x18">Площадки ЗАВОД ШОУ - Площадки | Ивент | Концерт | Мероприятия | Решения и концепции</div>
      <div className="x18Font">481 подписчик</div>
    </div>
    <div>
      <div className="x12_2">Площадки ЗАВОД ШОУ - Площадки | Ивент | Концерт | Мероприятия | Решения и концепции</div>
      {/* img */}
      <div className="x14">Всем привет! Делимся прошедшим туром с Ириной<br /> Круг. Ребята снимают целые влоги, делимся<br /> частичкой 🤝</div>
      <div className="x12_2">ЧИТАТЬ ПОСТ</div>
    </div>
    <hr />

    {/* down */}
    <div className="flex">
      <div className="menuBar">КОМАНДА</div>

      <div className="x12_2">РАЗРАБОТКА ШОУ</div>
      <div className="x12">3D-визуализация</div>
    </div>
    <hr />

    {/* bottom */}
    <div className="flex">
      <div>
        <div className="x18">info@zavodshow.ru</div>
        <div className="x18">+7 906 065-28-33</div>
      </div>

      <div>
        <div className="x18">Москва, г. Реутов, ул. Победы, 20</div>
        <div className="x18">Пн-Сб:10-19 МСК</div>
      </div>

      <div className="x12_2">
        © Завод Шоу<br />
        Политика конфиденциальности<br />
        Разработка сайта<br />
        СОУТ<br />
      </div>
    </div>
  </div>


};

export default Font;