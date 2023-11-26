import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PeriodInput.scss'
import Tip from '../Tip/Tip'
import Checkbox from '../Checkbox/Checkbox'
import MonthPicker from './MonthPicker/MonthPicker'

const PeriodInput = ({
	labelOne,
	labelTwo,
	month,
	tip,
	tipText,
	disabled,
	i,
}) => {
	const [isTillPresent, setIsTillPresent] = useState(false)

	const handleCheckboxToggle = () => {
		setIsTillPresent(!isTillPresent)
	}

	return (
		<div className="period-input__container">
			<div className="form-input">
				<div className="form-input__label-container">
					<label className="form-input__label" htmlFor="form-input">
						{labelOne}
					</label>
					{tip && <Tip text={tipText} />}
				</div>
				<div className="period-input__inputs-container">
					{month && <MonthPicker />}
					<input
						type="text"
						placeholder="Год"
						id="year"
						className="period-input__field form-input__field"
						disabled={disabled}
					/>
				</div>
			</div>

			<div className="form-input">
				<div className="form-input__label-container">
					<label className="form-input__label" htmlFor="form-input">
						{labelTwo}
					</label>
					{tip && <Tip text={tipText} />}
				</div>
				<div className="period-input__inputs-container">
					{month && <MonthPicker />}
					<input
						type="text"
						placeholder="Год"
						id="year"
						className="period-input__field form-input__field"
						disabled={disabled || isTillPresent}
					/>
				</div>

				<div className="period-input__checkbox-container">
					<Checkbox
						checkboxText="Настоящее время"
						checkboxId={`period-checkbox${i}`}
						onClick={handleCheckboxToggle}
					/>
				</div>
			</div>
		</div>
	)
}

PeriodInput.propTypes = {
	labelOne: PropTypes.string.isRequired,
	labelTwo: PropTypes.string.isRequired,
	month: PropTypes.bool,
	tip: PropTypes.bool,
	tipText: PropTypes.node,
	disabled: PropTypes.bool,
	i: PropTypes.number.isRequired,
}

PeriodInput.defaultProps = {
	month: false,
	tip: false,
	tipText: '',
	disabled: false,
}

export default PeriodInput
