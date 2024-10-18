import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Card, CardContent, Box, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import backgroundImage from '..//src/assets/weather.jpg'; 

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'e09734f3b752c538010dac621e4ade0c';

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Please check the city name.');
      setWeatherData(null);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // opacity: 0.5,
          zIndex: -1,
        },
      }}
    >

      <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px' }}>
          <Typography variant="h5" gutterBottom align="center">
            Weather App
          </Typography>
          <TextField
            placeholder='Enter the city'
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
  variant="contained"
  color="success"
  onClick={fetchWeather}
  sx={{ 
    mb: 3, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: '30px', // Adjust the radius for a more pronounced curve
    padding: '10px 20px', // Adjust padding for a better appearance
    boxShadow: '0 4px 20px rgba(0, 128, 0, 0.5)', // Optional shadow for a modern touch
    transition: '0.3s', // Smooth transition for hover effect
    '&:hover': {
      backgroundColor: 'darkgreen', // Darker shade on hover
      boxShadow: '0 8px 30px rgba(0, 128, 0, 0.7)', // Enhanced shadow on hover
    }
  }}
  fullWidth
  endIcon={<SearchIcon />}
>
  Search
</Button>


          {error && <Typography color="error" align="center">{error}</Typography>}

          {weatherData && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                    alt={weatherData.weather[0].description} 
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  <Typography variant="h5">
                    {weatherData.name}, {weatherData.sys.country}
                  </Typography>
                </Box>
                <Typography variant="body1">Temperature: {weatherData.main.temp.toFixed(2)} °C</Typography>
                <Typography variant="body1">Weather: {weatherData.weather[0].description}</Typography>
                <Typography variant="body1">Humidity: {weatherData.main.humidity} %</Typography>
                <Typography variant="body1">Wind Speed: {weatherData.wind.speed.toFixed(2)} m/s</Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Weather;
