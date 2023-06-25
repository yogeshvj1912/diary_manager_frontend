import './App.css';
import "./sb-admin-2.min.css"
import Login from './Login';
import Portal from './Portal';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import SignUp from './SignUp';








const App = () => {
  

  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/signup" element={<SignUp/>}/>
  <Route path="/portal" element={<Portal/>}/>
  </Routes>
  </BrowserRouter>
  );
};

export default App;
