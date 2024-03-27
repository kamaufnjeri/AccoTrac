import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const DashBoardBody = () => {
  const { company } = useContext(UserContext);
  const [data, setData] = useState({
    total_revenue: 0,
    net_profit: 0,
    total_expense: 0,
    total_accounts_receivable: 0,
    total_accounts_payable: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard');
        console.log(response);
        if (response.status === 200) {
          if (response.data) {
            setData(response.data);
          }
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [setData]);

  return (
    <main className="row flex-grow-1 overflow-auto">
      {data && company && (
        <div className="col-md-6 p-4">
          <div className="card rounded border shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">
              Financial Summary
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card rounded border border-primary text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-cart-plus" /> Revenue
                    </h5>
                    <canvas id="chartjs-pie" width={500} height={200} />
                    <p className="h2 mb-0">{company.currency} {data.total_revenue}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card rounded border border-primary text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-cash-coin" /> Expenses
                    </h5>
                    <canvas id="chartjs-pie" width={500} height={200} />
                    <p className="h2 mb-0">{company.currency} {data.total_expense}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card rounded border border-primary text-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-graph-up" /> Net Profit
                    </h5>
                    <canvas id="chartjs-line" width={400} height={200} />
                    <p className="h2 mb-0">{company.currency} {data.net_profit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="col-md-6 p-4">
        <div className="card rounded border shadow-sm">
          <div className="card-header bg-primary text-white fw-bold">
            Accounts Payable/Receivable
          </div>
          <div className="card-body">
            <p>
              <h2>Account Payable</h2>
              <h4>{company && company.currency} {data.total_accounts_payable}</h4>
            </p>
          </div>
          <div className="card-body">
            <p>
              <h2>Account Receivable</h2>
              <h4>{company && company.currency} {data.total_accounts_receivable}</h4>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardBody;
