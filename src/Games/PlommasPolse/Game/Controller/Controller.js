import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./Controller.css"

class Controller extends Component {
  render() {
    const {
      playerName,
    } = this.props;

    return (
        <div className="Controller">
          <div className="input-fields">
            <input ref={(input) => { this.textInput = input; }} type="text"/>
            <button
                className="send-button"
                onClick={() => {
                  let event = new CustomEvent("gameDataChanged", {
                    detail: {
                      playerName,
                      event: {
                        type: "sendButtonClick",
                        data: this.textInput.value
                      }
                    }
                  });
                  window.dispatchEvent(event);
                }}
            >
              Send
            </button>
          </div>
        </div>
    );
  }
}

Controller.propTypes = {
  playerName: PropTypes.string.isRequired,
};

Controller.defaultProps = {};

export default Controller;
