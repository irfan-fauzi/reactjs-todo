import Dashboard from '../Dashboard';
import Login from '../Login';
import Regster from '../Register';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';


//  REDUX PART ---------------------

// END REDUX PART ------------------------
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Regster} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
