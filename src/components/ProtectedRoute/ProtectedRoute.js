import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ProtectedRoute({ element: Component, ...props }) {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  )
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default ProtectedRoute
