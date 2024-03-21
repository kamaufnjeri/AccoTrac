import React from 'react'
import { Link } from 'react-router-dom'

const UserLowerHeader = ({ logoutUser }) => {
  return (
    <div className="container">
    <div className="row ">
      <div className="slid-containerww ">
        <div id="menu" className="col-lg-12 d-none d-lg-block ">
          <ul className="float-end mul fs-7 text-white d-inline-block">
            <li className="float-md-start p-4">
                <Link className="text-white fw-bold" onClick={logoutUser}>
                    Sign Out
                </Link>
            </li>
            <li className="float-md-start p-4">
            <Link className="text-white fw-bold"
              >
                My profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserLowerHeader
