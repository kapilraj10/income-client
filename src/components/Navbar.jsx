import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function NavBar({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard">
          Income Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            {role === "admin" && (
              <>
                <Nav.Link as={Link} to="/dashboard/income">
                  Income/Expense
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/loan">
                  Loans
                </Nav.Link>
              </>
            )}

            {role === "user" && (
              <>
                <Nav.Link as={Link} to="/dashboard/income">
                  View Income/Expense
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/loan">
                  View Loans
                </Nav.Link>
              </>
            )}
          </Nav>
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
