import { Badge, Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  console.log(localStorage.getItem("token"));

  const showModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand text-white fs-2 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("token") ? (
              <div className="d-flex">
                <div
                  className="btn bg-white text-success mx-1"
                  onClick={showModal}
                >
                  My Cart
                  <Badge count={2} />
                </div>
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="btn bg-white text-danger mx-1"
                >
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
      <Modal open={open} onCancel={() => setOpen(false)}>
        <table className="table">
          <thead style={{ color: "black", fontWeight: "bold" }}>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody style={{ color: "black", fontWeight: "normal" }}>
            {[
              { item: "Burger", quantity: 2, price: "$5.99" },
              { item: "Pizza", quantity: 1, price: "$8.99" },
            ].map((row, index) => (
              <tr key={index}>
                <td>
                  <p>{row.item}</p>
                </td>
                <td>{row.quantity}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
}

export default Navbar;
