import { Box, Container, TextField, Typography } from '@mui/material'
import './App.css'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'

function App() {

  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <>
      <Container>
        <Typography variant='h1' align='center'>App Clima</Typography>
        <Box component='form' autoComplete='off' onSubmit={onSubmit}>
          <TextField id='city' label='Ciudad' variant='outlined' value={city} onChange={(e) => setCity(e.target.value)} fullWidth required></TextField>
          <LoadingButton type='submit' variant='contained' loading={loading} loadingIndicator="Cargando...">Buscar</LoadingButton>
        </Box>
      </Container>
    </>
  )
}

export default App
