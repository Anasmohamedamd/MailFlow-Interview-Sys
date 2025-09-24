import './App.css';
import NavigationBar from './Components/NavigationBar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AuthForm from './Pages/AuthForm';
import DashBoard from './Pages/DashBoard';

function App() {
  return (
    <div>
      <NavigationBar/>
      <Router>
        <Routes>
          <Route path='/auth' element={<AuthForm/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
