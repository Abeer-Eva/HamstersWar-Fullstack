
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';
import Gallery from './components/gallery/Gallery';
import StartSida from './components/StartSida';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="menuSection">
          <Link to='/'>Home</Link>
          <Link to='/Tävla'>Tävla</Link>
          <Link to='/Gallery'>Galleri</Link>
        </nav>
      </header>
      <main>

        <Switch>
          <Route exact path="/" > <StartSida /> </Route>
          <Route path="/Gallery"> <Gallery /> </Route>
          
        </Switch>
      </main>

    </div>
  );
}

export default App;
