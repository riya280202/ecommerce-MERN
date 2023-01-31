import './App.css';
import HomePage from './containers/HomePage';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductListPage from './containers/ProductListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/:slug" element={<ProductListPage />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
