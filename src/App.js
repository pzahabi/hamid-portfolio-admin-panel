import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout';
import { Login } from './components/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<AdminLayout/>}/>
        <Route path='/admin/login/*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
