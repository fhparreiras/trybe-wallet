import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletLogo from '../img/cash-flow.png';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <div className="container-header">
        <img src={ walletLogo } alt="Logo carteira" width="60" />
        <span className="header-title">TrybeWallet</span>
        <span className="header-email" data-testid="email-field">
          { email }
        </span>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
