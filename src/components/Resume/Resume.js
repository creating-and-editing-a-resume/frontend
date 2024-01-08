/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import './Resume.scss'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import FormPage from './FormPage/FormPage'
import ProgressBar from './ResumeComponents/ProgressBar/ProgressBar'
import { locationArr } from '../../constants/constants'

function Resume({
  arrValues,
  setArrValues,
  values,
  setValues,
  setIsEditMod,
  isEditMod,
  isLoggedIn,
  onOpenPopup,
  setCompletedStepsPersonalData,
  setCompletedStepsExperience,
  setCompletedStepsQualification,
  setCompletedStepsEducation,
  setCompletedStepsPortfolio,
  setCompletedStepsSkills,
  setCompletedStepsAbout,
  handleResumeNamePopupOpen,
  inputsAreNotEmpty,
  // setCompletedLayouts,
  onClick,
  duties,
  qualifications,
  portfolio,
  about,
  isValid,
  handleConfirmRegPopupOpen,
  setHasExperience,
  setHasQualification,
  onClickMyProfile,
  setAllTillPresent,
}) {
  const location = useLocation()
  // Находим индекс элемента в массиве с локациями
  const currentIndex = locationArr.indexOf(
    location.pathname.replace('/resume/', '')
  )
  // При нажатии на кнопку пробрасываем поользователя на локацию вперёд
  const nextPage = locationArr[currentIndex + 1]
  // Изменяем степ компонента ProgressBar
  const step = currentIndex + 1

  const setCompletedSteps = () => {
    const locationToFanctionMap = {
      '/resume/personal-data': setCompletedStepsPersonalData,
      '/resume/experience': setCompletedStepsExperience,
      '/resume/qualification': setCompletedStepsQualification,
      '/resume/education': setCompletedStepsEducation,
      '/resume/portfolio': setCompletedStepsPortfolio,
      '/resume/skills': setCompletedStepsSkills,
      '/resume/about': setCompletedStepsAbout,
      // '/resume/layouts': setCompletedLayouts,
    }
    const setCompletedFunction = locationToFanctionMap[location.pathname]

    if (setCompletedFunction) {
      setCompletedFunction(true)
    }
  }

  return (
    <>
      <Header
        arrValues={arrValues}
        setArrValues={setArrValues}
        values={values}
        setValues={setValues}
        setIsEditMod={setIsEditMod}
        isEditMod={isEditMod}
        isValid={isValid}
        isLoggedIn={isLoggedIn}
        nextPage={nextPage}
        onOpenPopup={onOpenPopup}
        setCompletedSteps={setCompletedSteps}
        onClick={onClick}
        handleResumeNamePopupOpen={handleResumeNamePopupOpen}
        inputsAreNotEmpty={inputsAreNotEmpty}
        handleConfirmRegPopupOpen={handleConfirmRegPopupOpen}
        setHasExperience={setHasExperience}
        setHasQualification={setHasQualification}
        onClickMyProfile={onClickMyProfile}
        setAllTillPresent={setAllTillPresent}
      />
      <main className="resume">
        {location.pathname === '/resume/result' ? (
          ''
        ) : (
          <ProgressBar step={step} totalSteps={locationArr.length - 1} />
        )}
        <FormPage
          duties={duties}
          qualifications={qualifications}
          portfolio={portfolio}
          about={about}
        />
      </main>
    </>
  )
}

Resume.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
    ])
  ),
  arrValues: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(
              PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
              ])
            ),
          ])
        ),
      ])
    )
  ),
  setArrValues: PropTypes.func,
  setValues: PropTypes.func,
  setIsEditMod: PropTypes.func,
  isEditMod: PropTypes.bool,
  isLoggedIn: PropTypes.bool.isRequired,
  onOpenPopup: PropTypes.func.isRequired,
  setCompletedStepsPersonalData: PropTypes.func.isRequired,
  setCompletedStepsExperience: PropTypes.func.isRequired,
  setCompletedStepsQualification: PropTypes.func.isRequired,
  setCompletedStepsEducation: PropTypes.func.isRequired,
  setCompletedStepsPortfolio: PropTypes.func.isRequired,
  setCompletedStepsSkills: PropTypes.func.isRequired,
  setCompletedStepsAbout: PropTypes.func.isRequired,
  // setCompletedLayouts: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  handleResumeNamePopupOpen: PropTypes.func,
  duties: PropTypes.bool,
  qualifications: PropTypes.bool,
  portfolio: PropTypes.bool,
  about: PropTypes.bool,
  inputsAreNotEmpty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  setHasExperience: PropTypes.func.isRequired,
  setHasQualification: PropTypes.func.isRequired,
  setAllTillPresent: PropTypes.func.isRequired,
}

Resume.defaultProps = {
  arrValues: [],
  setArrValues: () => {},
  values: {},
  setValues: () => {},
  isEditMod: false,
  duties: false,
  qualifications: false,
  portfolio: false,
  about: false,
  handleResumeNamePopupOpen: () => {},
  setIsEditMod: () => {},
}

export default Resume
