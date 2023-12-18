import React from "react";
import NavBar from "./components/Navbar";
import Table from "./components/Table";
import Graphs from "./components/Graph";

function App() {
  return (
    <>
    <NavBar></NavBar>
    <div className="container">
      <div className="row">
      <Graphs></Graphs>
        <div className="col-12">
        <Table></Table>   
        </div> 
      </div>
    </div>
    </>
  );
}

export default App;
