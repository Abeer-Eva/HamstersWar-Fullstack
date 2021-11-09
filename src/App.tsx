
import { Link, Switch, Route } from 'react-router-dom'
import './App.css';
import Gallery from './components/gallery/Gallery';
import Fight from './components/play/Play';
import StartSida from './components/start/StartSida';
import Hamsterlogo from './logo/hamster-logo.png'

function App() {
  return (
    <div className="App">
      
      <header>
      <img className="hamster-logo" src={Hamsterlogo} alt="Hamster-wars logotype"  />
        <nav >
          <Link to='/' className="menuSection">Home</Link>
          <Link to='/Fight' className="menuSection">Playing</Link>
          <Link to='/Gallery' className="menuSection">Gallery</Link>
        </nav>
      </header>
      <main>
      
        <Switch>
          <Route exact path="/" > <StartSida /> </Route>
          <Route path="/Gallery"> <Gallery /> </Route>
          <Route path="/Fight"> < Fight /> </Route>
        </Switch>
      </main>

    </div>
  );
}

export default App;
