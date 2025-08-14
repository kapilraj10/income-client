// src/Home.jsx
import React, { useState, useEffect } from 'react';

const Home = () => {
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
      case 'Housing': return '🏠';
      case 'Food': return '🛒';
      case 'Utilities': return '💡';
      case 'Transportation': return '🚌';
      case 'Entertainment': return '🎬';
      case 'Healthcare': return '❤️';
      case 'Education': return '📚';
      case 'Salary': return '💰';
      case 'Investment': return '📈';
      default: return '💳';
    }
  };

  // Styles
  const styles = {
    app: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#343a40'
    },
    navbar: {
      backgroundColor: '#0d6efd',
      color: 'white',
      padding: '0.5rem 1rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    navbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'white'
    },
    navLinks: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    },
    navLink: {
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    activeNavLink: {
      color: 'white',
      fontWeight: '500'
    },
    userBadge: {
      backgroundColor: 'white',
      color: '#212529',
      padding: '0.25rem 0.75rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    avatar: {
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    main: {
      flexGrow: 1,
      padding: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    header: {
      marginBottom: '1.5rem'
    },
    headerTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginBottom: '0.25rem'
    },
    headerSubtitle: {
      color: '#6c757d'
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '4px solid'
    },
    cardIncome: {
      borderLeftColor: '#198754'
    },
    cardExpense: {
      borderLeftColor: '#dc3545'
    },
    cardSavings: {
      borderLeftColor: '#0dcaf0'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem'
    },
    cardTitle: {
      fontSize: '0.75rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: '#6c757d',
      letterSpacing: '0.5px'
    },
    cardValue: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      margin: '0.5rem 0'
    },
    cardIcon: {
      backgroundColor: 'rgba(25, 135, 84, 0.1)',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardExpenseIcon: {
      backgroundColor: 'rgba(220, 53, 69, 0.1)'
    },
    cardSavingsIcon: {
      backgroundColor: 'rgba(13, 202, 240, 0.1)'
    },
    cardBadge: {
      backgroundColor: 'rgba(25, 135, 84, 0.1)',
      color: '#198754',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    badgeExpense: {
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      color: '#dc3545'
    },
    badgeSavings: {
      backgroundColor: 'rgba(13, 202, 240, 0.1)',
      color: '#0dcaf0'
    },
    contentContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '1.5rem'
    },
    mainCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
      overflow: 'hidden'
    },
    cardHeaderTabs: {
      display: 'flex',
      borderBottom: '1px solid #dee2e6',
      padding: '0 1.25rem'
    },
    tabButton: {
      padding: '1rem 1.25rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#6c757d',
      position: 'relative'
    },
    activeTabButton: {
      color: '#0d6efd',
      fontWeight: 500
    },
    activeTabIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      backgroundColor: '#0d6efd'
    },
    cardBody: {
      padding: '1.5rem'
    },
    cardHeaderRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 500,
      margin: 0
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem'
    },
    button: {
      padding: '0.375rem 0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #dee2e6',
      backgroundColor: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.875rem'
    },
    primaryButton: {
      backgroundColor: '#0d6efd',
      color: 'white',
      border: 'none'
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2rem'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      alignItems: 'center'
    },
    chartLegend: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    colorIndicator: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    chartBars: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '200px',
      gap: '0.5rem'
    },
    chartBarGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    },
    barContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      width: '100%',
      height: '100%',
      gap: '0.25rem'
    },
    incomeBar: {
      backgroundColor: '#198754',
      opacity: 0.8,
      borderRadius: '0.25rem 0.25rem 0 0',
      flex: 1
    },
    expenseBar: {
      backgroundColor: '#dc3545',
      opacity: 0.8,
      borderRadius: '0.25rem 0.25rem 0 0',
      flex: 1
    },
    monthLabel: {
      color: '#6c757d',
      fontSize: '0.75rem',
      marginTop: '0.25rem'
    },
    transactionList: {
      marginTop: '1.5rem'
    },
    transactionItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid #e9ecef'
    },
    transactionIcon: {
      backgroundColor: '#e9ecef',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      marginRight: '1rem',
      fontSize: '1.25rem'
    },
    incomeIcon: {
      backgroundColor: 'rgba(25, 135, 84, 0.1)',
      color: '#198754'
    },
    expenseIcon: {
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      color: '#dc3545'
    },
    transactionDetails: {
      flexGrow: 1
    },
    transactionName: {
      fontWeight: 500,
      marginBottom: '0.25rem'
    },
    transactionMeta: {
      color: '#6c757d',
      fontSize: '0.875rem'
    },
    transactionAmount: {
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    incomeAmount: {
      color: '#198754'
    },
    expenseAmount: {
      color: '#dc3545'
    },
    viewAllButton: {
      display: 'block',
      textAlign: 'center',
      padding: '1rem',
      color: '#0d6efd',
      textDecoration: 'none',
      fontWeight: 500
    },
    sidebarCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    },
    sidebarCardHeader: {
      padding: '1rem 1.25rem',
      borderBottom: '1px solid #dee2e6',
      fontSize: '1.125rem',
      fontWeight: 500
    },
    sidebarCardBody: {
      padding: '1.25rem'
    },
    progressContainer: {
      marginBottom: '1rem'
    },
    progressLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      color: '#6c757d',
      fontSize: '0.875rem'
    },
    progressBar: {
      height: '10px',
      backgroundColor: '#e9ecef',
      borderRadius: '5px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#dc3545',
      borderRadius: '5px'
    },
    budgetDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e9ecef',
      color: '#6c757d',
      fontSize: '0.875rem'
    },
    budgetAmount: {
      fontWeight: 'bold',
      color: '#212529'
    },
    quickActions: {
      display: 'grid',
      gap: '0.75rem'
    },
    actionButton: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #dee2e6',
      backgroundColor: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textAlign: 'left',
      fontSize: '1rem',
      fontWeight: 500,
      color: '#0d6efd'
    },
    footer: {
      backgroundColor: 'white',
      borderTop: '1px solid #dee2e6',
      padding: '1.5rem',
      marginTop: 'auto'
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerText: {
      color: '#6c757d',
      fontSize: '0.875rem'
    },
    heartIcon: {
      color: '#dc3545',
      margin: '0 0.25rem'
    }
  };

  return (
    <div style={styles.app}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContainer}>
          <a href="#" style={styles.brand}>
            <span>💰</span>
            <span style={{ marginLeft: '0.5rem' }}>FinTrack</span>
          </a>
          
          <div style={styles.navLinks}>
            <a href="#" style={{ ...styles.navLink, ...styles.activeNavLink }}>
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a href="#" style={styles.navLink}>
              <span>📈</span>
              <span>Reports</span>
            </a>
            <a href="#" style={styles.navLink}>
              <span>💼</span>
              <span>Budget</span>
            </a>
            <a href="#" style={styles.navLink}>
              <span>💳</span>
              <span>Accounts</span>
            </a>
            
            <div style={styles.userBadge}>
              <span>👤</span>
              <span style={{ textTransform: 'capitalize' }}>{role}</span>
            </div>
            
            <div style={styles.avatar}>
              <span>👤</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            Good {timeOfDay}, <span style={{ textTransform: 'capitalize' }}>{role}</span>!
          </h1>
          <p style={styles.headerSubtitle}>Track and manage your finances efficiently</p>
        </div>

        {/* Financial Summary Cards */}
        <div style={styles.cardsContainer}>
          {/* Income Card */}
          <div style={{ ...styles.card, ...styles.cardIncome }}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>Total Income</div>
                <div style={styles.cardValue}>{formatCurrency(summary.income || 0)}</div>
              </div>
              <div style={styles.cardIcon}>
                <span>📈</span>
              </div>
            </div>
            <div style={{ ...styles.cardBadge }}>
              <span>⬆️</span>
              <span>12% from last month</span>
            </div>
          </div>
          
          {/* Expense Card */}
          <div style={{ ...styles.card, ...styles.cardExpense }}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>Total Expenses</div>
                <div style={styles.cardValue}>{formatCurrency(summary.expenses || 0)}</div>
              </div>
              <div style={{ ...styles.cardIcon, ...styles.cardExpenseIcon }}>
                <span>📉</span>
              </div>
            </div>
            <div style={{ ...styles.cardBadge, ...styles.badgeExpense }}>
              <span>⬆️</span>
              <span>5% from last month</span>
            </div>
          </div>
          
          {/* Savings Card */}
          <div style={{ ...styles.card, ...styles.cardSavings }}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>Current Savings</div>
                <div style={styles.cardValue}>{formatCurrency(summary.savings || 0)}</div>
              </div>
              <div style={{ ...styles.cardIcon, ...styles.cardSavingsIcon }}>
                <span>💰</span>
              </div>
            </div>
            <div style={{ ...styles.cardBadge, ...styles.badgeSavings }}>
              <span>⬆️</span>
              <span>18% from last month</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={styles.contentContainer}>
          {/* Left Column */}
          <div style={styles.mainCard}>
            <div style={styles.cardHeaderTabs}>
              <button 
                style={{ 
                  ...styles.tabButton, 
                  ...(activeTab === 'overview' ? styles.activeTabButton : {}) 
                }}
                onClick={() => setActiveTab('overview')}
              >
                Overview
                {activeTab === 'overview' && <div style={styles.activeTabIndicator}></div>}
              </button>
              <button 
                style={{ 
                  ...styles.tabButton, 
                  ...(activeTab === 'transactions' ? styles.activeTabButton : {}) 
                }}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
                {activeTab === 'transactions' && <div style={styles.activeTabIndicator}></div>}
              </button>
              <button 
                style={{ 
                  ...styles.tabButton, 
                  ...(activeTab === 'reports' ? styles.activeTabButton : {}) 
                }}
                onClick={() => setActiveTab('reports')}
              >
                Reports
                {activeTab === 'reports' && <div style={styles.activeTabIndicator}></div>}
              </button>
            </div>
            
            <div style={styles.cardBody}>
              {activeTab === 'overview' && (
                <div>
                  <div style={styles.cardHeaderRow}>
                    <h2 style={styles.cardTitle}>Financial Overview</h2>
                    <div style={styles.buttonGroup}>
                      <button style={styles.button}>
                        Last 30 days <span>⬇️</span>
                      </button>
                      <button style={{ ...styles.button, ...styles.primaryButton }}>
                        <span>➕</span> Add Transaction
                      </button>
                    </div>
                  </div>
                  
                  <div style={styles.chartContainer}>
                    <div style={{ flex: 1 }}>
                      <div style={styles.chartHeader}>
                        <div style={{ color: '#6c757d' }}>Income vs Expenses</div>
                        <div style={styles.chartLegend}>
                          <div style={styles.legendItem}>
                            <span style={{ ...styles.colorIndicator, backgroundColor: '#198754' }}></span>
                            <span style={{ fontSize: '0.875rem' }}>Income</span>
                          </div>
                          <div style={styles.legendItem}>
                            <span style={{ ...styles.colorIndicator, backgroundColor: '#dc3545' }}></span>
                            <span style={{ fontSize: '0.875rem' }}>Expenses</span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.chartBars}>
                        {[70, 85, 65, 90, 75, 100].map((height, idx) => (
                          <div key={idx} style={styles.chartBarGroup}>
                            <div style={styles.barContainer}>
                              <div style={{ ...styles.incomeBar, height: `${height}%` }}></div>
                              <div style={{ ...styles.expenseBar, height: `${height/2}%` }}></div>
                            </div>
                            <div style={styles.monthLabel}>
                              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <h2 style={styles.cardTitle}>Recent Transactions</h2>
                  <div style={styles.transactionList}>
                    {transactions.map(transaction => (
                      <div key={transaction.id} style={styles.transactionItem}>
                        <div style={{ 
                          ...styles.transactionIcon, 
                          ...(transaction.type === 'income' ? styles.incomeIcon : styles.expenseIcon)
                        }}>
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div style={styles.transactionDetails}>
                          <div style={styles.transactionName}>{transaction.name}</div>
                          <div style={styles.transactionMeta}>
                            {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                          </div>
                        </div>
                        <div style={{ 
                          ...styles.transactionAmount,
                          ...(transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount)
                        }}>
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <a href="#" style={styles.viewAllButton}>
                    View all transactions →
                  </a>
                </div>
              )}
              
              {activeTab === 'transactions' && (
                <div>
                  <h2 style={styles.cardTitle}>Transaction History</h2>
                  <div style={{ ...styles.cardHeaderRow, marginBottom: '1.5rem' }}>
                    <div style={styles.buttonGroup}>
                      <button style={{ ...styles.button, ...styles.primaryButton }}>All</button>
                      <button style={styles.button}>Income</button>
                      <button style={styles.button}>Expenses</button>
                    </div>
                    <div style={styles.buttonGroup}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <input 
                          type="text" 
                          placeholder="Search transactions..." 
                          style={{
                            padding: '0.375rem 0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #dee2e6',
                            fontSize: '0.875rem'
                          }}
                        />
                        <button style={styles.button}>
                          <span>🔍</span>
                        </button>
                      </div>
                      <button style={{ ...styles.button, ...styles.primaryButton }}>
                        <span>➕</span> New
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 500 }}>Description</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 500 }}>Category</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 500 }}>Date</th>
                          <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 500 }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {financialData?.transactions.map(transaction => (
                          <tr key={transaction.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                            <td style={{ padding: '0.75rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '0.5rem' }}>
                                  {getCategoryIcon(transaction.category)}
                                </span>
                                {transaction.name}
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span style={{ 
                                backgroundColor: '#e9ecef', 
                                padding: '0.25rem 0.5rem', 
                                borderRadius: '0.5rem', 
                                fontSize: '0.875rem' 
                              }}>
                                {transaction.category}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              {new Date(transaction.date).toLocaleDateString()}
                            </td>
                            <td style={{ 
                              padding: '0.75rem', 
                              textAlign: 'right', 
                              fontWeight: 'bold',
                              color: transaction.type === 'income' ? '#198754' : '#dc3545'
                            }}>
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
                  <h2 style={styles.cardTitle}>Financial Reports</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={styles.sidebarCard}>
                      <div style={styles.sidebarCardHeader}>Expense Breakdown</div>
                      <div style={styles.sidebarCardBody}>
                        {['Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment'].map((cat, idx) => (
                          <div key={cat} style={{ marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.875rem' }}>{cat}</span>
                              <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                                {idx === 0 ? '48%' : idx === 1 ? '22%' : idx === 2 ? '15%' : idx === 3 ? '10%' : '5%'}
                              </span>
                            </div>
                            <div style={styles.progressBar}>
                              <div 
                                style={{ 
                                  ...styles.progressFill, 
                                  width: `${idx === 0 ? 48 : idx === 1 ? 22 : idx === 2 ? 15 : idx === 3 ? 10 : 5}%`,
                                  backgroundColor: idx === 0 ? '#0d6efd' : idx === 1 ? '#6610f2' : 
                                                 idx === 2 ? '#6f42c1' : idx === 3 ? '#d63384' : '#fd7e14'
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={styles.sidebarCard}>
                      <div style={styles.sidebarCardHeader}>Income Sources</div>
                      <div style={styles.sidebarCardBody}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'center',
                          position: 'relative',
                          height: '200px',
                          alignItems: 'center'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total</div>
                            <div>{formatCurrency(summary.income || 0)}</div>
                          </div>
                          {/* Pie chart representation would go here */}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ ...styles.colorIndicator, backgroundColor: '#0d6efd' }}></div>
                            <div style={{ fontSize: '0.875rem' }}>Salary: 75%</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ ...styles.colorIndicator, backgroundColor: '#198754' }}></div>
                            <div style={{ fontSize: '0.875rem' }}>Freelance: 20%</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ ...styles.colorIndicator, backgroundColor: '#0dcaf0' }}></div>
                            <div style={{ fontSize: '0.875rem' }}>Investments: 5%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarCardHeader}>Monthly Budget</div>
              <div style={styles.sidebarCardBody}>
                <div style={styles.progressContainer}>
                  <div style={styles.progressLabel}>
                    <span>Spent this month</span>
                    <span>{formatCurrency(summary.expenses || 0)}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{ 
                        ...styles.progressFill, 
                        width: `${((summary.expenses || 0) / (financialData?.budget || 2500) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div style={styles.budgetDetails}>
                  <span>Remaining</span>
                  <span style={styles.budgetAmount}>
                    {formatCurrency((financialData?.budget || 2500) - (summary.expenses || 0))}
                  </span>
                </div>
                
                <div style={styles.budgetDetails}>
                  <span>Budget limit</span>
                  <span style={styles.budgetAmount}>
                    {formatCurrency(financialData?.budget || 2500)}
                  </span>
                </div>
                
                <button style={{ 
                  ...styles.button, 
                  width: '100%',
                  marginTop: '1rem',
                  justifyContent: 'center'
                }}>
                  <span>✏️</span> Edit Budget
                </button>
              </div>
            </div>
            
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarCardHeader}>Quick Actions</div>
              <div style={styles.sidebarCardBody}>
                <div style={styles.quickActions}>
                  <button style={styles.actionButton}>
                    <span>➕</span> Add Income
                  </button>
                  <button style={styles.actionButton}>
                    <span>➖</span> Add Expense
                  </button>
                  <button style={styles.actionButton}>
                    <span>💳</span> Manage Accounts
                  </button>
                  <button style={styles.actionButton}>
                    <span>📊</span> Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} Kapilraj KC. All rights reserved.
          </p>
          <p style={styles.footerText}>
            Designed and developed with <span style={styles.heartIcon}>❤️</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
