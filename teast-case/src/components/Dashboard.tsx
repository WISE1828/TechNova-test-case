import { Box, Container, Slider, Typography } from "@mui/material";
import { useState } from "react";
import { marks } from "../data/data";
import CityWeatherList from "./CityWeatherList";

const Dashboard = () => {
  const [temperature, setTemperature] = useState(0);
  const [isSliderUsed, setIsSliderUsed] = useState(false);

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setTemperature(newValue as number);
    setIsSliderUsed(true);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}
    >
      <Typography variant="h6">Что там с погодой?</Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaValueText={valuetext}
          defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          min={-15}
          max={15}
          marks={marks}
          valueLabelFormat={valuetext}
          track={false}
          onChange={handleChange}
        />
      </Box>
      <CityWeatherList temperature={temperature} isSliderUsed={isSliderUsed} />
    </Container>
  );
}

export default Dashboard;
