import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Logins from './components/Login-Registration/Logins'
import FuelQuote from './components/FuelQuote/FuelQuote';
import FuelQuoteHistory from './components/History/History';
import ProfileManagement from './components/Profile/ProfileManagement';
import Home from './components/Home/Home';

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Logins} />
        <Route path="/fuelquote" component={FuelQuote} />
        <Route path="/history" component={FuelQuoteHistory}/>
        <Route path="/profile" component={ProfileManagement}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;