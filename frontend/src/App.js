import './App.css';
import NavigationBar from './Components/NavigationBar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AuthForm from './Pages/AuthForm';
import DashBoard from './Pages/DashBoard';
import Home from './Pages/Home';
import Campaign from './Pages/Campaign';
import Contacts from './Pages/Contacts';

function App() {
  return (
    <div>
      
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<AuthForm/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/campaign' element={<Campaign/>}/>
          <Route path="/contact" element={<Contacts/>} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
