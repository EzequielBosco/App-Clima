import { Box, Container, TextField, Typography } from '@mui/material'
import './App.css'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'

function App() {
  
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ error: false, message: "" })
  
  const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`
  
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    humidity: "", 
    pressure: "",
    condition: "",
    description: "",
    icon: "",
    conditionText: ""
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError({
      error: false,
      message: ""
    })

    try {
      if (!city.trim()) throw { message: "El campo no puede estar vacío" }

      const response = await fetch(`${API_WEATHER}`)
      const data = await response.json()
      if (data.error) throw { message: data.error.message }

      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        condition: data.weather[0].id,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        conditionText: data.weather[0].main
      })

    } catch (error) {
      setError({
        error: true,
        message: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Container>
        <Typography variant='h1' component='h2' align='center' gutterBottom>App Clima</Typography>
        <Box component='form' autoComplete='off' onSubmit={onSubmit}>
          <TextField sx={{ pb:"15px" }}
            id='city' 
            label='Ciudad' 
            variant='outlined' 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            error={error.error} 
            helperText={error.message}
            fullWidth 
            required>
          </TextField>
          <LoadingButton 
            type='submit' 
            variant='contained' 
            loading={loading} 
            loadingIndicator="Cargando.."
          >
            Buscar
          </LoadingButton>
        </Box>

        {weather.city && (
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2, textAlign: "center" }}>
            <Container sx={{ display:"flex", justifyContent: "center" , alignItems: "center" }}>
              <Typography variant='h3' component="h2">{weather.city}, {weather.country}</Typography>
              <Box component="img" alt={weather.conditionText} width="100px" src={weather.icon} sx={{ textAlign: "center" }}/>
            </Container>
            <Typography variant='h4' component="h3">Humedad = {weather.humidity}</Typography>
            <Typography variant='h5' component="h3">Presión = {weather.pressure}</Typography>
            <Typography variant='h5' component="h3">Temperatura = {weather.temp}</Typography>
            <Typography variant='h6' component="h3">Descripción = {weather.description}</Typography>
          </Box>
        )}
        
      </Container>
    </>
  )
}

export default App
