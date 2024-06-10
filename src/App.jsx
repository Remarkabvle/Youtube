import { useState } from 'react';
import Products from './components/Products/Products';
import './App.css';

function App() {
  const [selectedCategory] = useState('All');

  return (
    <>
      <Products selectedCategory={selectedCategory} />
    </>
  );
}

export default App;
