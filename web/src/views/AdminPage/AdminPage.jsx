import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./AdminPage.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "../AdminPage/Routes";
import Logo from "../../components/Logo/Logo";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

export default function AdminPage() {
  return (
    <BrowserRouter>
      <div className="admin-page">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
