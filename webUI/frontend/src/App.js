//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import ReadAsset from './components/ReadAsset';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/readAsset" exact component={ReadAsset} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
