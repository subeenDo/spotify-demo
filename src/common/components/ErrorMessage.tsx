import { Alert } from '@mui/material'
import React from 'react'

interface ErrorMessageProps {
    errorMessage : string;
}

const ErrorMessage:React.FC<ErrorMessageProps>  = ({errorMessage}) => {
  return (
    <Alert severity="error">{errorMessage}</Alert>
  )
}

export default ErrorMessage