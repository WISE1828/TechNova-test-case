import Grid from '@mui/material/Grid2';
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CityWeatherItem from "./CityWeatherItem";

interface CityWeatherListProps {
  temperature: number;
  isSliderUsed: boolean;
}

const CityWeatherList: FC<CityWeatherListProps> = ({ temperature, isSliderUsed }) => {
  const weatherList = useSelector((state: RootState) => state.weather.list);

  let sortedWeatherList = weatherList;

  if (isSliderUsed) {
    const aboveTemperature = weatherList.filter(weather => weather.main.temp >= temperature);
    const belowTemperature = weatherList.filter(weather => weather.main.temp < temperature);

    const sortedAboveTemperature = aboveTemperature.sort((a, b) => b.main.temp - a.main.temp);
    const sortedBelowTemperature = belowTemperature.sort((a, b) => b.main.temp - a.main.temp);

    sortedWeatherList = [...sortedAboveTemperature, ...sortedBelowTemperature];
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      {sortedWeatherList.map((weather) => (
        <Grid key={weather.id} size={{ xs: 2, sm: 4, md: 4 }} >
          <CityWeatherItem weather={weather} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CityWeatherList
