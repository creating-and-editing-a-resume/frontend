/* eslint-disable jsx-a11y/label-has-associated-control */
import './ImageUpload.scss'
import PropTypes from 'prop-types'

const ImageUpload = ({ image, setImage, name, currentImage }) => {
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
    <section className="image-upload-form">
      <div className="image-upload-form__form">
        <div className="image-upload-form__photo-container">
          {image && (
            <img
              className="image-upload-form__photo"
              alt={name}
              src={currentImage || image}
            />
          )}
          <label className="image-upload-form__button" htmlFor={name}>
            <input
              className="image-upload-form__input"
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

ImageUpload.propTypes = {
  image: PropTypes.string,
  setImage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  currentImage: PropTypes.string,
}

ImageUpload.defaultProps = {
  image: '',
  currentImage: undefined,
}

export default ImageUpload
