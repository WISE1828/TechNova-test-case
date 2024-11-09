import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { deleteWeather } from '../store/weatherSlice';
import { IWeather } from "../types/types";

const CityWeatherItem = ({ weather }: { weather: IWeather }) => {
  const dispatch = useDispatch();


  return (
    <Paper
      sx={{
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h6"
        >
          {weather.name}
        </Typography>
        <IconButton
          aria-label="delete"
          size='small'
          onClick={() => dispatch(deleteWeather(weather.id))}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Box>
      <Box>
        <Typography
          variant="h4"
        >
          {Math.round(weather.main.temp)}°C
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
        >
          Ветер: {Math.round(weather.wind.speed)}м/с
        </Typography>
        <Typography
          variant="subtitle1"
        >
          Давление: {weather.main.pressure}мм
        </Typography>
      </Box>
    </Paper>
  )
}

export default CityWeatherItem
