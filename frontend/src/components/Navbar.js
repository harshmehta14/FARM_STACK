import React, { useState } from "react";
import api from "../api.js";

function NavBar() {
  const [formData, setFormData] = useState({
    uid:"",
    title: "",
    category:"",
    description: "",
    quantity:"",
    price:""
  });
  
  const handleChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/api/inventory", formData);
    setFormData({
      uid:"",
      title: "",
      category:"",
      description: "",
      quantity:"",
      price:"",
    });
  };

  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h3>Inventory Management</h3>
          </a>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addinventory">
            Add Inventory 
          </button>
        </div>
      </nav>

      <div
        className="modal fade"
        id="addinventory"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Inventory
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={formData.title} />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input type="text" className="form-control" id="category" name="category" onChange={handleChange} value={formData.category} />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={formData.description} />
                </div>

                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input type="number" className="form-control" id="quantity" name="quantity" onChange={handleChange} value={formData.quantity} />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input type="number" className="form-control" id="price" name="price" onChange={handleChange} value={formData.price} />
                </div>
                <div className="text-center">
                <button type="submit" className="btn btn-success " data-bs-dismiss="modal">
                  Submit
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
