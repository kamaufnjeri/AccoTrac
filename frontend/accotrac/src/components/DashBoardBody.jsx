import React from 'react'
import { Link } from 'react-router-dom'

const DashBoardBody = () => {
  return (
    <main className="row flex-grow-1 overflow-auto">
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
                        <i className="bi bi-cart-plus" /> Income
                      </h5>
                      <canvas id="chartjs-pie" width={500} height={200} />
                      <p className="h2 mb-0">$10,000</p>
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
                      <p className="h2 mb-0">$15,000</p>
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
                      <p className="h2 mb-0">$5,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-4">
            <div className="card rounded border shadow-sm">
              <div className="card-header bg-primary text-white fw-bold">
                Accounts Payabla/Receivale
              </div>
              <div className="card-body">
                <p>
                  <Link to="#">Account Payable</Link> |<Link to="#">Account Receivable</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
  )
}

export default DashBoardBody
