import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';
import Logins from './components/Login-Registration/Logins'
import Test from './components/Test/Test'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Logins} />

      </Switch>
    </BrowserRouter>
  );
};

export default App;