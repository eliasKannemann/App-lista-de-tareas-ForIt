import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header'
import './App.css'
import Home from './components/home';
import { Container } from 'react-bootstrap';
import About from './components/about';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Container>
        <Home />
      </ Container>
      <About />

    </>
  )
}

export default App
