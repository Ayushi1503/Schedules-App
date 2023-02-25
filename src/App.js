import './App.css';
import Header from './MyComponents/Header';
import { Footer } from './MyComponents/Footer';
import { Graph } from './MyComponents/Graph';
import React from "react";

function App() {

  return (
    <div style={{minHeight:100}}>
      <Header title="Schedules Assignment" />
      <Graph />
      <Footer />
    </div>
  );
}

export default App;
