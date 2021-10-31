
import { Link, Switch, Route, Redirect } from 'react-router-dom'

import './App.css';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Hamster Wars</h2>
        <nav className="menuSection">
          <Link to='/'>Startsida</Link>
          <Link to='/Tävla'>Tävla</Link>
          <Link to='/Galleri'>Galleri</Link>
        </nav>
      </header>
      <main>

        <Switch>
          <Route path="/" exact> Home </Route>
          <Route path="/Gallery/:id"> <Gallery /> </Route>
          <Route path="/match">  Tävlling </Route>


        </Switch>
      </main>

    </div>
  );
}

export default App;
