import './App.css';
import ProductDetails from './components/pdp/ProductDetails';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Cart from './components/cart/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProductDetails />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/cart"
            element={<Cart />}
            exact
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
