import React, { useEffect, useState } from "react";
import API from "../Api";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";

export default function IncomeExpense({ role }) {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ type: "income", amount: "", description: "" });
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const { data } = await API.get("/income");
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleClose = () => {
    setShow(false);
    setForm({ type: "income", amount: "", description: "" });
    setEditId(null);
    setError("");
  };

  const handleShow = (item) => {
    if (item) {
      setEditId(item._id);
      setForm({ type: item.type, amount: item.amount, description: item.description });
    }
    setShow(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.amount || isNaN(form.amount)) {
      setError("Please enter a valid amount");
      return;
    }
    try {
      if (editId) {
        await API.put(`/income/${editId}`, form);
      } else {
        await API.post("/income", form);
      }
      fetchItems();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.msg || "Error saving data");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await API.delete(`/income/${id}`);
      fetchItems();
    } catch (err) {
      alert("Error deleting");
    }
  };

  return (
    <>
      <h3>Income & Expense</h3>
      {role === "admin" && (
        <Button className="mb-3" onClick={() => handleShow()}>
          Add Income/Expense
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Created At</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>{item.description}</td>
              <td>{item.createdBy?.username || "Unknown"}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              {role === "admin" && (
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleShow(item)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => deleteItem(item._id)}>
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit" : "Add"} Income/Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleChange} required>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
