// src/Home.jsx
import React, { useState, useEffect } from "react";

const Home = () => {
  const [role, setRole] = useState("user");
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "user");
    const hour = new Date().getHours();
    setTimeOfDay(hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening");
  }, []);

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1>Good {timeOfDay}, {role}!</h1>
        <p className="text-muted">Welcome to your personal finance dashboard</p>
      </header>

      <section className="my-4">
        <h3>Quick Links</h3>
        <div className="d-flex gap-3 mt-2">
          <button className="btn btn-primary">Dashboard</button>
          <button className="btn btn-outline-primary">Transactions</button>
          <button className="btn btn-outline-primary">Reports</button>
        </div>
      </section>

      <section className="my-4">
        <h3>Highlights</h3>
        <div className="d-flex gap-3 mt-2">
          <div className="p-3 bg-success text-white rounded flex-fill">Income: $4,250</div>
          <div className="p-3 bg-danger text-white rounded flex-fill">Expenses: $1,980</div>
          <div className="p-3 bg-info text-white rounded flex-fill">Savings: $2,270</div>
        </div>
      </section>

      <footer className="mt-5 text-muted">
        © {new Date().getFullYear()} Kapilraj KC
      </footer>
    </div>
  );
};

export default Home;
