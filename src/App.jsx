import { Box, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

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
    wind: "",
    description: "",
    icon: "",
    conditionText: ""
  })

  let descriptionEs = {
    'clear sky': 'Cielo despejado',
    'few clouds': 'Pocas nubes',
    'scattered clouds': 'Nubosidad dispersa',
    'broken clouds': 'Nubosidad rota',
    'overcast clouds': 'Cielo nublado',
    'light rain': 'Lluvia ligera',
    'moderate rain': 'Lluvia moderada',
    'mist': 'Neblina'
  }

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
      
      // if (data.error) throw { message: data.error.message }
      if (data.cod && data.cod === "404") {
        throw { message: "Ingrese una ciudad válida" }
      }

      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: (data.main.temp - 273.15).toFixed(0),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: (data.wind.speed * 3.6).toFixed(1),
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        conditionText: data.weather[0].main
      })

      if (weather.description in descriptionEs) {
        descriptionEs = descriptionEs[weather.description]
      } else {
        descriptionEs = data.weather[0].description
      }

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
    <div className='app-container'>
      <Navbar />
        <Container component="main">
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant='h2' component='h1' align='center' sx={{mt: "5px", mb: "30px"}}>Clima View</Typography>
            <Box component="img" alt="Logo clima" width="80px" src="/logo.png" sx={{ textAlign: "center" }}/>
          </Box>
          <Typography variant='h5' component='h2' align='center' sx={{ display: "flex" }} gutterBottom>Tiempo en ...</Typography>
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
              sx={{ paddingLeft: 2.5, paddingRight: 2.5 }}
            >
              Buscar
            </LoadingButton>
          </Box>

          {weather.city && (
            <Box className="card" sx={{ 
              mt: 2, 
              pb: 3, 
              display: "flex", 
              flexDirection: "column", 
              gap: 2, 
              textAlign: "center",
              borderRadius: "5px" }}>
              <Typography variant='h3' component="h2" sx={{ mt: 2}}>Tiempo en {weather.city}, {weather.country}</Typography>
              <Box sx={{ display:"flex", justifyContent: "center" , alignItems: "center" }}>
                <Box component="img" alt={weather.conditionText} width="80px" src={weather.icon} sx={{ textAlign: "center" }}/>
                <Typography variant='h2' component="h3">{weather.temp}°</Typography>
              </Box>
              <Typography variant='h5' component="h3"><strong>{descriptionEs[weather.description || weather.description]}</strong></Typography>
              <Typography variant='h6' component="h3">Humedad de un {weather.humidity}%</Typography>
              <Typography variant='h6' component="h3">Presión de {weather.pressure} hPa</Typography>
              <Typography variant='h6' component="h3">Viento a {weather.wind} km/h</Typography>
            </Box>
          )}          
        </Container>
        <Footer />
    </div>
  )
}

export default App
