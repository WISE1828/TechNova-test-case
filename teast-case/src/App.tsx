import { Container } from "@mui/material"
import ActionInput from "./components/ActionInput"
import Dashboard from "./components/Dashboard"

const App = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem'

      }}
    >
      <ActionInput />
      <Dashboard />
    </Container>
  )
}

export default App
