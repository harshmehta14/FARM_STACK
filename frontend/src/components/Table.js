import React, { useState, useEffect } from "react";
import api from "../api.js";

function Table() {
  const [inventorydata, settododata] = useState([]);

  const getList = async () => {
    const response = await api.get("/api/inventory");
    settododata(response.data);
  };
  useEffect(() => {
    getList();
  }, []);

  

  const deletedoc = async (uid) => {
    await api.delete(`/api/inventory/${uid}`);
    getList();
  };

  const [formData, setFormData] = useState({
    uid:"",
    title: "",
    category:"",
    description: "",
    quantity:"",
    price:""
  });
  
  const setdata = (event) => {
    setFormData({
      "uid":event.uid,
      "title":event.title,
      "category":event.category,
      "description":event.description,
      "quantity":event.quantity,
      "price":event.price,
    });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.put(`/api/inventory/${formData.uid}`, formData);
    setFormData({
      uid:"",
      title: "",
      category:"",
      description: "",
      quantity:"",
      price:"",
    });
    getList();
  };


  return (
    <>
      <div className="alert alert-info" role="alert">
        <h3 className='text-center'>Inventory Data</h3>
    </div>
    <table className="table table-striped table-bordered table-hover mt-3">
      <thead>
        <tr className="text-center">
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
          <th scope="col">Description</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Modify/Delete</th>
        </tr>
      </thead>
      <tbody>
        {inventorydata.map((data,index) => (
          <tr className="text-center" key={data.id}>
            <td key={data.id}>{index+1}</td>
            <td key={data.id}> {data.title}</td>
            <td key={data.id}>{data.category}</td>
            <td key={data.id}>{data.description}</td>
            <td key={data.id}>{data.quantity}</td>
            <td key={data.id}>{data.price}</td>
            <td key={data.id}>
            <button
                className="btn btn-outline-warning mx-3"
                onClick={() => setdata(data)}
                data-bs-toggle="modal"
                data-bs-target="#updateinventory">
                Update
              </button>
              <button
                className="btn btn-outline-danger "
                onClick={() => deletedoc(data)}>
                Delete
              </button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="modal fade"
        id="updateinventory"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Inventory
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
export default Table;
