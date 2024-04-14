import React from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FoodSection from "./Components/FoodSection";
import  FoodStoreProvider  from'./store/FoodStoreContext.jsx'

function App() {
  return (
    <FoodStoreProvider>
      <Header />
      <FoodSection />
      <Footer />
    </FoodStoreProvider>
  );
}

export default App;