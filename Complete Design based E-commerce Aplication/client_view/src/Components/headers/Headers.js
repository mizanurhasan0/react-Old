import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

export const Headers = () => {
  const state = useContext(GlobalState);
  const [cart] = state.UserApi.cart;
  const [isLogged, setIsLogged] = state.UserApi.isLogged;
  const [isAdmin, setIsAdmin] = state.UserApi.isAdmin;

  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      setIsLogged(false);
      setIsAdmin(false);
    } catch (error) {
      alert(error);
    }
  };
  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };
  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin Dashboard" : " Software-BD"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <>
            <li>
              <Link to="/login">Login ✥ Register</Link>
            </li>
          </>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};
