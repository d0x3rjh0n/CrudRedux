
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Projects from "./pages/Projects"
import NewClient from './pages/NewClient'
import NewProject from './pages/NewProject'
import Clients from './pages/Clients'
import { Toaster } from './components/ui/toaster'
import { Container } from "@chakra-ui/react"

//redux-toolkit
import { store } from './store'
import { Provider } from 'react-redux'
import Header from './components/Header'


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Toaster />
        <Header />
        <Container pt={'10'}>
        <Routes>
            <Route path='/' element={<Clients />} />
            <Route path='/newClient' element={<NewClient />} />
            <Route path='/editClient/:id' element={<NewClient />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/newProject' element={<NewProject />} />
            <Route path='/editProject/:id' element={<NewProject />} />
        </Routes>
        </Container>
      </Provider>
    </Router>
  )
}

export default App
