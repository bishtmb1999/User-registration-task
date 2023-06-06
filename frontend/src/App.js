import './App.css';
import Register from './components/register/register';
import {BrowserRouter , Routes ,Route} from 'react-router-dom' ;

function App() {
  return (
    <div className="App">
       <BrowserRouter> 
       <Routes>
       < Route path='/' element ={<Register/>} /> 
    
    
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
