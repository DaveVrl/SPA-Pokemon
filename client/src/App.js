import './App.css';
// import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import { Routes , Route } from 'react-router-dom';


function App() {
  

  return (
    <div className="App">
      <Nav/>
      <Routes>
      <Route path="/home" element={<Cards/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
