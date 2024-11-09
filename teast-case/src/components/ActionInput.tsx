import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, Button, CircularProgress, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { cities } from '../data/data';
import { useAppDispatch } from '../hooks/hooks';
import { RootState } from '../store';
import { fetchWeatherData } from '../store/weatherSlice';


const ActionInput = () => {
  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const weatherList = useSelector((state: RootState) => state.weather.list);
  const status = useSelector((state: RootState) => state.weather.status);

  const handleAddCity = () => {
    if (value) {
      const cityExists = weatherList.some(weather => weather.name.toLowerCase() === value.toLowerCase());

      if (!cityExists) {
        dispatch(fetchWeatherData(value));
      } else {
        alert('Этот город уже добавлен.');
      }
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <Autocomplete
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={cities}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Выберите город" />}
      />
      <Button
        variant="outlined"
        sx={{
          height: '3.5rem',
        }}
        onClick={handleAddCity}
      >
        {status === 'loading' ? <CircularProgress size={24} /> : <AddIcon />}
      </Button>
    </Container>
  )
}

export default ActionInput
