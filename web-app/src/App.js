import './main.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Telas
import Registrar from './screens/register-book/register-book';
import Lista from './screens/books-list/books-list';
import Livro from './screens/book-view/book-view';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Lista} />
        <Route path="/registrar-livro" component={Registrar} />
        <Route path="/livro" component={Livro} />
      </Switch>
    </Router>
  );
}

export default App;
