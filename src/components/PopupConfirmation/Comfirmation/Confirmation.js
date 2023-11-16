import './Confirmation.scss'
import confirmLogo from '../../../img/eye-icon.svg'

function Confirmation() {
	return (
		<div className="confirmation">
			<img
				src={confirmLogo}
				alt="confirm popup icon"
				className="confirmation__image"
			/>
			<div className="confirmation__buttons">
				<button
					className="confirmation__button"
					type="button"
					label="button"
				>
					Выйти без сохранения
				</button>

				<button
					className="confirmation__button"
					type="button"
					label="button"
				>
					Сохранить и выйти
				</button>
			</div>
		</div>
	)
}

export default Confirmation
