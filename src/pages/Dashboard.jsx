import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import IncomeExpense from "./IncomeExpense";
import Loan from "./Loan";
import Home from "./Home";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <>
      <NavBar role={role} />
      <Container fluid className="dashboard-container py-4 px-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="income" element={<IncomeExpense role={role} />} />
          <Route path="loan" element={<Loan role={role} />} />
        </Routes>
      </Container>
    </>
  );
}
