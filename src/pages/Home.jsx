// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [role, setRole] = useState('user');
  const [activeTab, setActiveTab] = useState('overview');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [financialData, setFinancialData] = useState(null);
  
  useEffect(() => {
    // Simulate fetching user data
    const storedRole = localStorage.getItem('role') || 'user';
    setRole(storedRole);
    
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
    
    // Sample financial data
    const sampleData = {
      income: 4250,
      expenses: 1980,
      savings: 2270,
      budget: 2500,
      transactions: [
        { id: 1, name: "Salary", amount: 3200, type: "income", date: "2023-06-15", category: "Salary" },
        { id: 2, name: "Rent", amount: -1200, type: "expense", date: "2023-06-10", category: "Housing" },
        { id: 3, name: "Groceries", amount: -350, type: "expense", date: "2023-06-12", category: "Food" },
        { id: 4, name: "Freelance Work", amount: 1050, type: "income", date: "2023-06-08", category: "Work" },
        { id: 5, name: "Utilities", amount: -180, type: "expense", date: "2023-06-05", category: "Utilities" },
        { id: 6, name: "Investment", amount: 250, type: "income", date: "2023-06-02", category: "Investment" },
        { id: 7, name: "Dining Out", amount: -120, type: "expense", date: "2023-06-01", category: "Food" },
        { id: 8, name: "Online Course", amount: -85, type: "expense", date: "2023-05-29", category: "Education" }
      ]
    };
    
    setFinancialData(sampleData);
    setTransactions(sampleData.transactions.slice(0, 4));
  }, []);

  // Calculate financial summary
  const calculateSummary = () => {
    if (!financialData) return {};
    
    return {
      income: financialData.transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
      expenses: Math.abs(financialData.transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)),
      savings: financialData.income - financialData.expenses
    };
  };

  const summary = calculateSummary();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Housing': return 'bi-house-door';
      case 'Food': return 'bi-cart';
      case 'Utilities': return 'bi-lightning';
      case 'Transportation': return 'bi-bus-front';
      case 'Entertainment': return 'bi-film';
      case 'Healthcare': return 'bi-heart-pulse';
      case 'Education': return 'bi-book';
      case 'Salary': return 'bi-cash';
      case 'Investment': return 'bi-graph-up';
      default: return 'bi-wallet';
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <i className="bi bi-cash-coin fs-3 me-2"></i>
            <span className="fw-bold">FinTrack</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#"><i className="bi bi-speedometer2 me-1"></i> Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="bi bi-graph-up me-1"></i> Reports</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="bi bi-wallet me-1"></i> Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="bi bi-credit-card me-1"></i> Accounts</a>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <div className="badge bg-light text-dark me-3 px-3 py-2">
                <i className="bi bi-person me-1"></i>
                <span className="text-capitalize">{role}</span>
              </div>
              <div className="dropdown">
                <button className="btn btn-light rounded-circle p-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                  <div className="bg-light border rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-person fs-5"></i>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 py-4">
        <div className="container">
          {/* Welcome Header */}
          <div className="row mb-4">
            <div className="col">
              <h1 className="fw-bold text-dark mb-1">Good {timeOfDay}, <span className="text-capitalize">{role}</span>!</h1>
              <p className="text-muted">Track and manage your finances efficiently</p>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card border-start border-4 border-success h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-uppercase text-muted small fw-bold">Total Income</h6>
                      <h3 className="fw-bold mt-2">{formatCurrency(summary.income || 0)}</h3>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <i className="bi bi-arrow-up-circle fs-3 text-success"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="badge bg-success bg-opacity-10 text-success">
                      <i className="bi bi-arrow-up me-1"></i>12% from last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-start border-4 border-danger h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-uppercase text-muted small fw-bold">Total Expenses</h6>
                      <h3 className="fw-bold mt-2">{formatCurrency(summary.expenses || 0)}</h3>
                    </div>
                    <div className="bg-danger bg-opacity-10 p-3 rounded">
                      <i className="bi bi-arrow-down-circle fs-3 text-danger"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="badge bg-danger bg-opacity-10 text-danger">
                      <i className="bi bi-arrow-up me-1"></i>5% from last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-start border-4 border-info h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-uppercase text-muted small fw-bold">Current Savings</h6>
                      <h3 className="fw-bold mt-2">{formatCurrency(summary.savings || 0)}</h3>
                    </div>
                    <div className="bg-info bg-opacity-10 p-3 rounded">
                      <i className="bi bi-piggy-bank fs-3 text-info"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="badge bg-info bg-opacity-10 text-info">
                      <i className="bi bi-arrow-up me-1"></i>18% from last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('transactions')}
                      >
                        Transactions
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reports')}
                      >
                        Reports
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  {activeTab === 'overview' && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="card-title mb-0">Financial Overview</h5>
                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-secondary btn-sm">
                            Last 30 days <i className="bi bi-chevron-down ms-1"></i>
                          </button>
                          <button className="btn btn-primary btn-sm">
                            <i className="bi bi-plus me-1"></i> Add Transaction
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">Income vs Expenses</span>
                          <div className="d-flex gap-3">
                            <span className="d-flex align-items-center">
                              <span className="d-inline-block bg-success rounded me-1" style={{ width: '10px', height: '10px' }}></span>
                              <small className="text-muted">Income</small>
                            </span>
                            <span className="d-flex align-items-center">
                              <span className="d-inline-block bg-danger rounded me-1" style={{ width: '10px', height: '10px' }}></span>
                              <small className="text-muted">Expenses</small>
                            </span>
                          </div>
                        </div>
                        
                        <div className="d-flex align-items-end" style={{ height: '200px' }}>
                          {[70, 85, 65, 90, 75, 100].map((height, idx) => (
                            <div key={idx} className="flex-fill d-flex flex-column align-items-center me-2">
                              <div className="d-flex align-items-end" style={{ height: '100%', width: '100%' }}>
                                <div 
                                  className="bg-success rounded-top" 
                                  style={{ 
                                    width: '100%', 
                                    height: `${height}%`,
                                    opacity: 0.8
                                  }}
                                ></div>
                                <div 
                                  className="bg-danger rounded-top ms-1" 
                                  style={{ 
                                    width: '100%', 
                                    height: `${height/2}%`,
                                    opacity: 0.8
                                  }}
                                ></div>
                              </div>
                              <small className="text-muted mt-1">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <h5 className="card-title mb-3">Recent Transactions</h5>
                      <div className="list-group">
                        {transactions.map(transaction => (
                          <div 
                            key={transaction.id} 
                            className="list-group-item list-group-item-action border-0 py-3"
                          >
                            <div className="d-flex align-items-center">
                              <div className={`bg-${transaction.type === 'income' ? 'success' : 'danger'}-subtle p-2 rounded me-3`}>
                                <i className={`bi ${getCategoryIcon(transaction.category)} fs-4 text-${transaction.type === 'income' ? 'success' : 'danger'}`}></i>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-0">{transaction.name}</h6>
                                <small className="text-muted">{new Date(transaction.date).toLocaleDateString()} • {transaction.category}</small>
                              </div>
                              <div className={`fw-bold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                {formatCurrency(transaction.amount)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-3">
                        <button className="btn btn-link text-decoration-none">
                          View all transactions <i className="bi bi-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'transactions' && (
                    <div>
                      <h5 className="card-title mb-4">Transaction History</h5>
                      <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-primary">All</button>
                          <button className="btn btn-outline-secondary">Income</button>
                          <button className="btn btn-outline-secondary">Expenses</button>
                        </div>
                        <div className="d-flex gap-2">
                          <div className="input-group input-group-sm">
                            <input type="text" className="form-control" placeholder="Search transactions..." />
                            <button className="btn btn-outline-secondary">
                              <i className="bi bi-search"></i>
                            </button>
                          </div>
                          <button className="btn btn-primary btn-sm">
                            <i className="bi bi-plus me-1"></i> New
                          </button>
                        </div>
                      </div>
                      
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Category</th>
                              <th>Date</th>
                              <th className="text-end">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {financialData?.transactions.map(transaction => (
                              <tr key={transaction.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className={`bi ${getCategoryIcon(transaction.category)} me-2 text-${transaction.type === 'income' ? 'success' : 'danger'}`}></i>
                                    {transaction.name}
                                  </div>
                                </td>
                                <td>
                                  <span className="badge bg-light text-dark">{transaction.category}</span>
                                </td>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className={`fw-bold text-end ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                  {formatCurrency(transaction.amount)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'reports' && (
                    <div>
                      <h5 className="card-title mb-4">Financial Reports</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                              <h6 className="card-title text-muted">Expense Breakdown</h6>
                              <div className="mt-4">
                                {['Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment'].map((cat, idx) => (
                                  <div key={cat} className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                      <span className="small">{cat}</span>
                                      <span className="small fw-bold">{idx === 0 ? '48%' : idx === 1 ? '22%' : idx === 2 ? '15%' : idx === 3 ? '10%' : '5%'}</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                      <div 
                                        className="progress-bar" 
                                        role="progressbar" 
                                        style={{ 
                                          width: `${idx === 0 ? 48 : idx === 1 ? 22 : idx === 2 ? 15 : idx === 3 ? 10 : 5}%`,
                                          backgroundColor: idx === 0 ? '#0d6efd' : idx === 1 ? '#6610f2' : idx === 2 ? '#6f42c1' : idx === 3 ? '#d63384' : '#fd7e14'
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border-0 shadow-sm">
                            <div className="card-body">
                              <h6 className="card-title text-muted">Income Sources</h6>
                              <div className="d-flex justify-content-center mt-4">
                                <div className="position-relative" style={{ width: '200px', height: '200px' }}>
                                  <div className="position-absolute top-50 start-50 translate-middle">
                                    <h5 className="mb-0">Total</h5>
                                    <p className="mb-0 text-center">{formatCurrency(summary.income || 0)}</p>
                                  </div>
                                  <canvas id="incomeChart" height="200"></canvas>
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="d-flex justify-content-around">
                                  <div className="text-center">
                                    <span className="d-inline-block rounded-circle bg-primary" style={{ width: '10px', height: '10px' }}></span>
                                    <small className="ms-1">Salary: 75%</small>
                                  </div>
                                  <div className="text-center">
                                    <span className="d-inline-block rounded-circle bg-success" style={{ width: '10px', height: '10px' }}></span>
                                    <small className="ms-1">Freelance: 20%</small>
                                  </div>
                                  <div className="text-center">
                                    <span className="d-inline-block rounded-circle bg-info" style={{ width: '10px', height: '10px' }}></span>
                                    <small className="ms-1">Investments: 5%</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="col-lg-4">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h5 className="card-title mb-0">Monthly Budget</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Spent this month</span>
                    <span className="fw-bold">{formatCurrency(summary.expenses || 0)}</span>
                  </div>
                  <div className="progress mb-2" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: `${((summary.expenses || 0) / (financialData?.budget || 2500) * 100}%` }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Remaining</span>
                    <span className="fw-bold">{formatCurrency((financialData?.budget || 2500) - (summary.expenses || 0))}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Budget limit</span>
                      <span className="fw-bold">{formatCurrency(financialData?.budget || 2500)}</span>
                    </div>
                  </div>
                  
                  <button className="btn btn-outline-primary w-100 mt-3">
                    <i className="bi bi-pencil me-2"></i>Edit Budget
                  </button>
                </div>
              </div>
              
              <div className="card shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h5 className="card-title mb-0">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary text-start">
                      <i className="bi bi-plus-circle me-2"></i> Add Income
                    </button>
                    <button className="btn btn-outline-primary text-start">
                      <i className="bi bi-dash-circle me-2"></i> Add Expense
                    </button>
                    <button className="btn btn-outline-primary text-start">
                      <i className="bi bi-credit-card me-2"></i> Manage Accounts
                    </button>
                    <button className="btn btn-outline-primary text-start">
                      <i className="bi bi-graph-up me-2"></i> Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top mt-auto py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted">
                © {new Date().getFullYear()} Kapilraj KC. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0 text-muted">
                Designed and developed with <i className="bi bi-heart-fill text-danger"></i>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
