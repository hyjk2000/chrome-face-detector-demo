import React, { Component } from 'react';
import './FaceDetectSettings.css';

class FaceDetectSettings extends Component {
  handleChange = e => {
    switch (e.target.name) {
      case 'interval':
        this.props.handleIntervalChange(e.target.value);
        break;
      case 'showFacialFeatures':
        this.props.handleShowFacialFeaturesChange(e.target.checked);
        break;
      default:
    }
  }

  render() {
    const { settings: { interval, showFacialFeatures } } = this.props;
    return (
      <div className="FaceDetectSettings">
        <label>
          Refresh Rate
          <select
            name="interval"
            value={interval}
            onChange={this.handleChange}>
              <option value={1000}>1 Hz</option>
              <option value={500}>2 Hz</option>
              <option value={250}>4 Hz</option>
              <option value={100}>10 Hz</option>
          </select>
        </label>
        <br />
        <label>
          Show Facial Features
          <input
            type="checkbox"
            name="showFacialFeatures"
            checked={showFacialFeatures}
            onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}

export default FaceDetectSettings;
