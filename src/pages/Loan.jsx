import React, { useEffect, useState } from "react";
import API from "../Api";
import { Table, Button, Modal, Form, Alert, Card, Row, Col } from "react-bootstrap";

export default function Loan({ role }) {
  const [loans, setLoans] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    duration: "",
    interestRate: "",
    paidAmount: "",
    totalInterest: 0,
    totalPayable: 0,
    remainingAmount: 0
  });
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalLoans: 0,
    totalAmount: 0,
    totalPaid: 0,
    totalRemaining: 0
  });

  const fetchLoans = async () => {
    try {
      const { data } = await API.get("/loan");
      setLoans(data);
      
      // Calculate statistics
      const totalLoans = data.length;
      const totalAmount = data.reduce((sum, loan) => sum + parseFloat(loan.amount), 0);
      const totalPaid = data.reduce((sum, loan) => sum + parseFloat(loan.paidAmount || 0), 0);
      const totalRemaining = data.reduce((sum, loan) => sum + parseFloat(loan.remainingAmount || 0), 0);
      
      setStats({
        totalLoans,
        totalAmount: totalAmount.toFixed(2),
        totalPaid: totalPaid.toFixed(2),
        totalRemaining: totalRemaining.toFixed(2)
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Recalculate loan metrics when form values change
  useEffect(() => {
    if (editId) {
      const amount = parseFloat(form.amount) || 0;
      const duration = parseInt(form.duration, 10) || 0;
      const interestRate = parseFloat(form.interestRate) || 0;
      const paidAmount = parseFloat(form.paidAmount) || 0;
      
      const totalInterest = (amount * duration * interestRate) / 100;
      const totalPayable = amount + totalInterest;
      const remainingAmount = Math.max(0, totalPayable - paidAmount);
      
      setForm(prev => ({
        ...prev,
        totalInterest,
        totalPayable,
        remainingAmount
      }));
    }
  }, [form.amount, form.duration, form.interestRate, form.paidAmount, editId]);

  const handleClose = () => {
    setShow(false);
    setForm({ 
      name: "", 
      amount: "", 
      duration: "", 
      interestRate: "",
      paidAmount: "",
      totalInterest: 0,
      totalPayable: 0,
      remainingAmount: 0
    });
    setEditId(null);
    setError("");
  };

  const handleShow = (loan) => {
    if (loan) {
      setEditId(loan._id);
      setForm({
        name: loan.name,
        amount: loan.amount,
        duration: loan.duration,
        interestRate: loan.interestRate,
        paidAmount: loan.paidAmount || "",
        totalInterest: loan.totalInterest || 0,
        totalPayable: loan.totalPayable || 0,
        remainingAmount: loan.remainingAmount || 0
      });
    } else {
      setEditId(null);
      setForm({
        name: "",
        amount: "",
        duration: "",
        interestRate: "",
        paidAmount: "",
        totalInterest: 0,
        totalPayable: 0,
        remainingAmount: 0
      });
    }
    setShow(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    const validations = [
      { field: "amount", message: "Please enter a valid amount" },
      { field: "duration", message: "Please enter valid duration (months)" },
      { field: "interestRate", message: "Please enter valid interest rate" }
    ];
    
    for (const val of validations) {
      const value = form[val.field];
      if (!value || isNaN(value) || value <= 0) {
        setError(val.message);
        return;
      }
    }
    
    try {
      // Convert to numbers
      const payload = {
        name: form.name,
        amount: parseFloat(form.amount),
        duration: parseInt(form.duration, 10),
        interestRate: parseFloat(form.interestRate),
        paidAmount: form.paidAmount ? parseFloat(form.paidAmount) : 0
      };
      
      if (editId) {
        await API.put(`/loan/${editId}`, payload);
      } else {
        await API.post("/loan", payload);
      }
      fetchLoans();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.msg || "Error saving data");
    }
  };

  const deleteLoan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) return;
    try {
      await API.delete(`/loan/${id}`);
      fetchLoans();
    } catch (err) {
      alert("Error deleting loan");
    }
  };

  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="loan-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">Loan Management</h3>
        {role === "admin" && (
          <Button variant="primary" onClick={() => handleShow()}>
            <i className="bi bi-plus-circle me-2"></i>Add New Loan
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <Card.Title>Total Loans</Card.Title>
              <Card.Text className="display-6">{stats.totalLoans}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <Card.Title>Total Amount</Card.Title>
              <Card.Text className="display-6"> रु{stats.totalAmount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <Card.Title>Amount Paid</Card.Title>
              <Card.Text className="display-6"> रु{stats.totalPaid}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <Card.Title>Amount Due</Card.Title>
              <Card.Text className="display-6"> रु{stats.totalRemaining}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Loans Table */}
      <div className="table-responsive">
        <Table striped bordered hover className="loan-table">
          <thead>
            <tr>
              <th>Loan Name</th>
              <th>Amount</th>
              <th>Duration (months)</th>
              <th>Interest Rate</th>
              <th>Paid Amount</th>
              <th>Remaining</th>
              <th>Total Interest</th>
              <th>Total Payable</th>
              <th>Created By</th>
              <th>Created At</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.name}</td>
                <td> रु{formatCurrency(loan.amount)}</td>
                <td>{loan.duration}</td>
                <td>{loan.interestRate}%</td>
                <td> रु{formatCurrency(loan.paidAmount || 0)}</td>
                <td> रु{formatCurrency(loan.remainingAmount || 0)}</td>
                <td> रु{formatCurrency(loan.totalInterest || 0)}</td>
                <td> रु{formatCurrency(loan.totalPayable || 0)}</td>
                <td>{loan.createdBy?.username || "System"}</td>
                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                {role === "admin" && (
                  <td className="actions-cell">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => handleShow(loan)}
                      className="me-2"
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => deleteLoan(loan._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi ${editId ? "bi-pencil" : "bi-plus-circle"} me-2`}></i>
            {editId ? "Edit Loan" : "Create New Loan"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Loan Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter loan name"
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount ( रु)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (months)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Loan duration"
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control
                type="number"
                name="interestRate"
                value={form.interestRate}
                onChange={handleChange}
                placeholder="Enter interest rate"
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
            
            {editId && (
              <>
                <h5 className="mt-4 mb-3">Repayment Details</h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Paid Amount ( रु)</Form.Label>
                      <Form.Control
                        type="number"
                        name="paidAmount"
                        value={form.paidAmount}
                        onChange={handleChange}
                        placeholder="Enter paid amount"
                        min="0"
                        step="0.01"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Remaining Amount ( रु)</Form.Label>
                      <Form.Control
                        type="number"
                        value={form.remainingAmount.toFixed(2)}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Total Interest (रु)</Form.Label>
                      <Form.Control
                        type="number"
                        value={form.totalInterest.toFixed(2)}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Total Payable ( रु)</Form.Label>
                      <Form.Control
                        type="number"
                        value={form.totalPayable.toFixed(2)}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
            
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" size="lg">
                {editId ? "Update Loan" : "Create Loan"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      <style jsx>{`
        .loan-container {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .stat-card {
          border-radius: 10px;
          border: none;
          transition: transform 0.3s;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
        }
        .stat-card:hover {
          transform: translateY(-5px);
        }
        .stat-card .card-title {
          font-size: 1rem;
          color: #6c757d;
        }
        .stat-card .display-6 {
          font-weight: 600;
          color: #343a40;
        }
        .loan-table {
          border-radius: 8px;
          overflow: hidden;
        }
        .actions-cell {
          min-width: 100px;
        }
        .table th {
          background-color: #343a40;
          color: white;
          font-weight: 500;
        }
        .table td {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}