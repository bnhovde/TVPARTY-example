import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Helpers
import games from './../../constants/games';

function GameWrapper(WrappedGame) {
  class GameWrapperHOC extends Component {
    constructor() {
      super();
      this.state = {
        count: 0,
      };
      this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    onClick(e) {}

    onCheckboxChange(e) {}

    render() {
      const countLabel =
        this.state.count > 0 ? <span>{this.state.count}</span> : null;

      return (
        <div>
          <div>{countLabel}</div>
          <div>
            <WrappedGame
              {...this.state}
              {...this.props}
              onCheckboxChange={this.onCheckboxChange}
            />
          </div>
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    // REDACTED
    return {};
  }

  function mapDispatchToProps(dispatch) {
    return {};
  }
  return connect(mapStateToProps, mapDispatchToProps)(GameWrapperHOC);
}

export default GameWrapper;
