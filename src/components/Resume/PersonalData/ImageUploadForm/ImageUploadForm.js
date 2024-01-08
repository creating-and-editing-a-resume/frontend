/* eslint-disable jsx-a11y/label-has-associated-control */
import './ImageUploadForm.scss'
import React from 'react'
import PropTypes from 'prop-types'
import Tip from '../../ResumeComponents/Tip/Tip'
// import defaultAvatar from '../../../../img/photo-plug.svg'

const ImageUploadForm = ({
  label,
  tip,
  tipText,
  name,
  image,
  setImage,
  imageValues,
}) => {
  function handleChange(e) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      context.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL(e.target.files[0].type)
      setImage(dataUrl)
    }
    img.src = URL.createObjectURL(e.target.files[0])
  }

  return (
    <section className="image-upload">
      <div className="image-upload__form">
        <div className="image-upload__label-container">
          <label className="image-upload__label" htmlFor="image-label">
            {label}
          </label>
          {tip && <Tip text={tipText} />}
        </div>
        <div
          className={`image-upload__photo-container ${
            image && 'image-upload__photo-container_background-none'
          }`}
        >
          {image && (
            <img
              className="image-upload__photo"
              alt="user avatar"
              src={imageValues || image}
            />
          )}
          <label className="image-upload__button" htmlFor={name}>
            <input
              className="image-upload__input"
              name={name}
              id={name}
              type="file"
              accept=".png,.jpg,.jpeg,"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </section>
  )
}
ImageUploadForm.propTypes = {
  label: PropTypes.string,
  tip: PropTypes.bool,
  tipText: PropTypes.node,
  name: PropTypes.string.isRequired,
  values: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.string, PropTypes.number)
    ),
    jobs: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
  }),
  image: PropTypes.string,
  setImage: PropTypes.func.isRequired,
  imageValues: PropTypes.string,
}
ImageUploadForm.defaultProps = {
  label: '',
  tip: false,
  tipText: '',
  values: {},
  image: '',
  imageValues: undefined,
}
export default ImageUploadForm
