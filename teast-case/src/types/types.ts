export interface IWeather {
  id: string;
  name: string;
  main: {
    temp: number;
    pressure: number;
  }
  weather: {
    main: string;
  }
  wind: {
    speed: number;
  }
}

export interface IWeatherState {
  list: IWeather[];
  status: 'idle' | 'loading' | 'resolved' | 'rejected';
  error: string | null;
}


