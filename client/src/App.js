import './App.css';
// import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import { Routes , Route } from 'react-router-dom';


function App() {
  

  return (
    <div className="App">
      <Nav/>
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Cards/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/form" element={<Form/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
