import '../PersonalData/PersonalData.scss'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Experience.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import Job from './Job/Job'
import { JOB_TIP } from '../../../constants/tips'

const Experience = ({ setCompletedSteps }) => {
	// Если опыт есть, поля активны. Если нет, поля деактивируются:
	const [hasExperience, setHasExperience] = useState(true)
	// Если появился добавленный опыт, основная кнопка "Добавить" удаляется
	const [noAddedExperience, setNoAddedExperience] = useState(true)
	const [addedExperience, setAddedExperience] = useState([])

	const handleTitleCheckboxClick = () => {
		setHasExperience(!hasExperience)
		setAddedExperience([])
		setNoAddedExperience(true)
	}
	const deleteExperience = () => {
		console.log('delete experience')
	}

	const addExperience = () => {
		console.log('add experience')
		setNoAddedExperience(false)
		setAddedExperience(
			...addedExperience,
			<Job
				hasExperience={hasExperience}
				deleteExperience={deleteExperience}
				addExperience={addExperience}
				i={addedExperience.length + 1}
			/>
		)
	}

	React.useEffect(() => {
		setCompletedSteps(true)
	})

	console.log(addedExperience)
	return (
		<section className="personal-data">
			<ResumeTitle
				title="Опыт работы"
				checkbox
				checkboxText="Нет опыта"
				checkboxId="title-checkbox"
				onClick={handleTitleCheckboxClick}
			/>
			<div className="experience__form-container">
				<FormInput
					label="Название компании"
					disabled={!hasExperience}
				/>
				<FormInput label="Сайт компании" disabled={!hasExperience} />
				<FormInput
					label="Должность"
					tip
					tipText={JOB_TIP}
					disabled={!hasExperience}
				/>
				<PeriodInput
					labelOne="Дата начала работы"
					labelTwo="Дата окончания работы"
					month
					disabled={!hasExperience}
					i={0}
				/>
				<FormInput
					label="Обязанности"
					extraInputClass="responsibilities"
					disabled={!hasExperience}
				/>
				{addedExperience}
				{noAddedExperience && (
					<AddButton
						disabled={!hasExperience}
						handleClick={addExperience}
					/>
				)}
			</div>
		</section>
	)
}

Experience.propTypes = {
	setCompletedSteps: PropTypes.func.isRequired,
}

export default Experience
