
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Projects from "./pages/Projects"
import NewClient from './pages/NewClient'
import NewProject from './pages/NewProject'
import Clients from './pages/Clients'
import { Toaster } from './components/ui/toaster'
import { store } from './store'
import { Provider } from 'react-redux'
import { Center } from '@chakra-ui/react'
import Layout from './components/Layout'


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Toaster />
          <Layout>
          <Center w={'full'}>
            <Routes>
                <Route path='/' element={<Clients />} />
                <Route path='/newClient' element={<NewClient />} />
                <Route path='/editClient/:id' element={<NewClient />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/newProject' element={<NewProject />} />
                <Route path='/editProject/:id' element={<NewProject />} />
            </Routes>
          </Center>
          </Layout>        
      </Provider>
    </Router>
  )
}

export default App
