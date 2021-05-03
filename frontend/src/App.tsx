import NavBar from "components/NavBar";
import Footer from "components/Footer"
import React from "react";
import DataTable from "components/DataTable";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary">Hello, World!</h1>
        <DataTable />
      </div>

      <Footer />
    </>
  );
}

export default App;
