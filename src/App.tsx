
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import Gallery from './components/gallery/Gallery';
import Play from './components/Play';
import StartSida from './components/start/StartSida';

function App() {
  return (
    <div className="App">
      <header>
        <nav >
          <Link to='/' className="menuSection">Home</Link>
          <Link to='/Play' className="menuSection">Playing</Link>
          <Link to='/Gallery' className="menuSection">Gallery</Link>
        </nav>
      </header>
      <main>
      
        <Switch>
          <Route exact path="/" > <StartSida /> </Route>
          <Route path="/Gallery"> <Gallery /> </Route>
          <Route path="/Play"> <Play /> </Route>
        </Switch>
      </main>

    </div>
  );
}

export default App;
