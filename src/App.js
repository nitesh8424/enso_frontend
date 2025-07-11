import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './components/addUser';
import DisplayPage from './components/displayPage';

function App() {
  
  return (
     <BrowserRouter>
      <Routes>
          <Route path='/' Component={AddUser}/>
          <Route path='/displayPage' Component={DisplayPage}/>
      </Routes>
     </BrowserRouter>
     
  );

}

export default App;
