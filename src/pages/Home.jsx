import React, { useState, useEffect } from "react";

export default function Home() {
  const [role, setRole] = useState("user");
  const [activeTab, setActiveTab] = useState("overview");
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    // Simulate fetching user role
    const storedRole = localStorage.getItem("role") || "user";
    setRole(storedRole);
    
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  // Sample financial data
  const financialData = {
    income: 4250,
    expenses: 1980,
    savings: 2270,
    transactions: [
      { id: 1, name: "Salary", amount: 3200, type: "income", date: "2023-06-15" },
      { id: 2, name: "Rent", amount: -1200, type: "expense", date: "2023-06-10" },
      { id: 3, name: "Groceries", amount: -350, type: "expense", date: "2023-06-12" },
      { id: 4, name: "Freelance Work", amount: 1050, type: "income", date: "2023-06-08" },
      { id: 5, name: "Utilities", amount: -180, type: "expense", date: "2023-06-05" },
      { id: 6, name: "Investment", amount: 250, type: "income", date: "2023-06-02" },
    ]
  };

  // Calculate financial summary
  const summary = {
    income: financialData.transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    expenses: Math.abs(financialData.transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)),
    savings: financialData.income - financialData.expenses
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <span className="ml-2 text-xl font-bold text-indigo-800">FinTrack</span>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 px-1 pt-1 text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">Reports</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">Budget</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">Accounts</a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-indigo-100 rounded-full px-3 py-1 text-sm font-medium text-indigo-800">
                  <span className="capitalize">{role}</span>
                </div>
              </div>
              <div className="ml-3 relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Good {timeOfDay}, <span className="capitalize">{role}</span>!</h1>
            <p className="mt-2 text-gray-600">Track and manage your finances efficiently</p>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Income</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(summary.income)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <span>↑ 12% from last month</span>
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(summary.expenses)}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span>↑ 5% from last month</span>
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Savings</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(summary.savings)}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-blue-600 flex items-center">
                <span>↑ 18% from last month</span>
              </p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button 
                  onClick={() => setActiveTab("overview")}
                  className={`${
                    activeTab === "overview" 
                      ? "border-indigo-500 text-indigo-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } py-4 px-6 text-center border-b-2 font-medium text-sm`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab("transactions")}
                  className={`${
                    activeTab === "transactions" 
                      ? "border-indigo-500 text-indigo-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } py-4 px-6 text-center border-b-2 font-medium text-sm`}
                >
                  Transactions
                </button>
                <button 
                  onClick={() => setActiveTab("reports")}
                  className={`${
                    activeTab === "reports" 
                      ? "border-indigo-500 text-indigo-600" 
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } py-4 px-6 text-center border-b-2 font-medium text-sm`}
                >
                  Reports
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Financial Overview</h2>
                    <div className="flex space-x-3">
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Last 30 days
                      </button>
                      <button className="inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                        Add Transaction
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Income vs Expenses</h3>
                      <div className="h-64 flex items-end space-x-2">
                        {/* Income bars */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-green-500 rounded-t" style={{ height: '70%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">Jan</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-green-500 rounded-t" style={{ height: '85%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">Feb</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-green-500 rounded-t" style={{ height: '65%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">Mar</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-green-500 rounded-t" style={{ height: '90%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">Apr</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-green-500 rounded-t" style={{ height: '75%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">May</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-green-500 rounded-t" style={{ height: '100%' }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">Jun</span>
                        </div>
                        
                        {/* Expense bars */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-red-500 rounded-t" style={{ height: '40%' }}></div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-red-500 rounded-t" style={{ height: '45%' }}></div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-red-500 rounded-t" style={{ height: '50%' }}></div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-red-500 rounded-t" style={{ height: '35%' }}></div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-red-500 rounded-t" style={{ height: '55%' }}></div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center">
                            <div className="w-10 bg-red-500 rounded-t" style={{ height: '60%' }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-4 space-x-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                          <span className="text-sm text-gray-600">Income</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                          <span className="text-sm text-gray-600">Expenses</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">Recent Transactions</h3>
                      <div className="bg-white shadow rounded-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                          {financialData.transactions.slice(0, 4).map(transaction => (
                            <li key={transaction.id} className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`p-2 rounded-lg ${
                                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                  }`}>
                                    {transaction.type === 'income' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{transaction.name}</p>
                                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className={`text-sm font-medium ${
                                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {formatCurrency(transaction.amount)}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                            View all transactions →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "transactions" && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Transaction History</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-center text-gray-500">Transaction history will be displayed here</p>
                  </div>
                </div>
              )}
              
              {activeTab === "reports" && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Financial Reports</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-center text-gray-500">Financial reports will be generated here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Powerful Features</h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Manage your finances effectively with our comprehensive set of tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Tracking</h3>
                <p className="text-gray-600">
                  Easily track all your expenses across different categories and get insights into your spending patterns.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Income Management</h3>
                <p className="text-gray-600">
                  Record all your income sources, track payments, and analyze your earnings over time.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h3>
                <p className="text-gray-600">
                  Generate detailed financial reports, visualize your data with charts, and export for further analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Kapilraj KC. All rights reserved.</p>
            </div>
            <div className="mt-4 flex justify-center md:mt-0">
              <p className="text-gray-500 text-sm flex items-center">
                Designed and developed with
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
