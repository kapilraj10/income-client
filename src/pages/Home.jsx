import React from "react";

export default function Home() {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex flex-col justify-between">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-800 mb-6">
                Income & Expense Tracker
              </h1>

              <div className="mb-8">
                <div className="inline-block bg-indigo-100 rounded-full px-6 py-2">
                  <p className="text-lg sm:text-xl text-indigo-700">
                    You are logged in as <span className="font-bold capitalize">{role}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-1.5 rounded-full mb-10"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="bg-white border-2 border-dashed border-indigo-300 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center text-indigo-500 font-bold">
                      {item}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-2">
                      Feature {item}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      This is a placeholder for feature highlights and descriptions.
                    </p>
                  </div>
                ))}
              </div>

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-10 rounded-full transition transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-600 text-sm bg-white shadow-inner">
        <p>© {new Date().getFullYear()} Kapilraj KC. All rights reserved.</p>
        <p className="mt-1">Designed and developed with ❤️</p>
      </footer>
    </div>
  );
}
