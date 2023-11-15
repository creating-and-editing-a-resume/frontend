import './ResumeName.scss'

function PopupResumeName() {
	return (
		<div className="resume-name">
			<form action="submit" className="resume-name__form">
				<label
					htmlFor="resume-name-input"
					className="resume-name__label"
				>
					Для удобства организации ваших резюме предлагаем добавить к
					каждому из них уникальное название
					<input
						name="resume-name"
						id="resume-name-input"
						type="text"
						className="resume-name__input"
						placeholder="Название резюме"
					/>
				</label>
			</form>
			<div className="resume-name__buttons">
				<button
					className="resume-name__button"
					type="button"
					label="button"
				>
					Очистить
				</button>

				<button
					className="resume-name__button"
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
