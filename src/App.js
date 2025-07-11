import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AddUser from './components/addUser';
import DisplayPage from './components/displayPage';

function App() {
  
  return (
     <HashRouter>
      <Routes>
          <Route path='/' Component={AddUser}/>
          <Route path='/displayPage' Component={DisplayPage}/>
      </Routes>
    </HashRouter>
     
  );

}

export default App;
