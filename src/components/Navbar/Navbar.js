import { Badge, Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cards/ContextReducer";

function Navbar() {
  const [open, setOpen] = useState(false);
  console.log(localStorage.getItem("token"));
  const cartData = useCart();
  console.log("🚀 ~ Navbar ~ cartData:", cartData);

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
          {cartData.length > 0 ? (
            <>
              <thead style={{ color: "black", fontWeight: "bold" }}>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody style={{ color: "black", fontWeight: "normal" }}>
                {cartData?.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <p>{row.name}</p>
                    </td>
                    <td>{row.qty}</td>
                    <td>{row.size}</td>
                    <td>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <div>
              <p>Cart is Empty</p>
            </div>
          )}
        </table>
        <div className="d-flex justify-content-end">
          <p style={{ fontWeight: "bold" }}>
            Total Price:{" "}
            {cartData.length > 0
              ? cartData.reduce((acc, curr) => acc + curr.price, 0)
              : 0}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
