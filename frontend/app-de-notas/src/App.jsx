
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header'
import './App.css'
import Home from './components/home';
import About from './components/about';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/notFound';
import Notas from './components/notas';
import TaskList from './components/taskList';

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notas" element={<TaskList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
