import React from "react";
import "./StellarFormation.css";

const StellarFormation = () => {
  return (
    <div className="stellar-formation">
      <header className="stellar-header">
        <h1>Stellar Formation</h1>
        <p>Create stars and generate cosmic energy to evolve your universe.</p>
      </header>

      <div className="stellar-content">
        {/** Left Panel: Resource Information */}
        <aside className="stellar-resources">
          <h2>Resources</h2>
          <ul>
            <li>
              Stars: <span id="star-count">0</span>
            </li>
            <li>
              Cosmic Energy: <span id="energy-count">0</span>
            </li>
            <li>
              Stellar Cores: <span id="core-count">0</span>
            </li>
          </ul>
        </aside>

        {/** Main Panel: Interaction */}
      </div>
    </div>
  );
};

export default StellarFormation;
