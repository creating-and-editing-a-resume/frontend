export const handleGenerateLink = () => {
  // eslint-disable-next-line no-console
  console.log('тут должен быть другой код')
}

export const handleGeneratePdf = async (navigate, resumePath) => {
  await navigate(`${resumePath}`)
  window.print()
  navigate(-1)
}

export const handleEditProfile = (navigate, resumePath) => {
  navigate(`${resumePath}`)
}

export function handleOpenPopup(navigate, isLoggedIn, onOpenPopup) {
  return isLoggedIn ? navigate('/resume') : onOpenPopup()
}

export function cleanLocalStorage() {
  localStorage.removeItem('formData')
  localStorage.removeItem('hasExperience')
  localStorage.removeItem('isTillPresent')
  localStorage.removeItem('image')
  localStorage.removeItem('hasQualification')
  localStorage.removeItem('hasEducation')
  localStorage.removeItem('hasPortfolio')
}

export function copyToClipboard(
  resumePath,
  setPopupCopyLink,
  setPopupCopyLinkText
) {
  // navigator.clipboard.writeText(
  //   `http://localhost:3000${resumePath}#${resumePath}`
  // )
  navigator.clipboard.writeText(
    `https://creating-and-editing-a-resume.github.io/frontend/#${resumePath}`
  )
  setPopupCopyLink(true)
  setPopupCopyLinkText('Ссылка скопирована')
  setTimeout(() => {
    setPopupCopyLink(false)
  }, 2500)
}
