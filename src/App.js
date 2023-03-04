import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import DashboardContainer from './containers/dashboard/DashboardContainer';
import './style.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="flex-column app-frame">
          <div className="flex-row align-center header container">
            <h5>Frontend React Test</h5>
          </div>
          <div className="flex flex-row app-main">
            <div className="flex-column sidebar container">
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="app-body flex">
              <Routes>
                <Route exact path="/dashboard" element={<DashboardContainer/>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}