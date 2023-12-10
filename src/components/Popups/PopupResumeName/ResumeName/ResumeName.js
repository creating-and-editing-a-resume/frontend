import './ResumeName.scss'

function PopupResumeName() {
  return (
    <div className="resume-name">
      <form action="submit" className="resume-name__form">
        <p className="resume-name__description">
          Для удобства организации ваших резюме предлагаем добавить к каждому из
          них уникальное название
        </p>
        <input
          name="resume-name"
          id="resume-name-input"
          type="text"
          className="resume-name__input"
          placeholder="Название резюме"
        />
      </form>
      <div className="resume-name__buttons">
        <button
          className="resume-name__button resume-name__button_delete"
          type="button"
          label="button"
        >
          Очистить
        </button>

        <button
          className="resume-name__button resume-name__button_save"
          type="button"
          label="button"
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default PopupResumeName
