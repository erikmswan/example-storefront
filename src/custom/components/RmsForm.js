import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";

const Field = styled.div`
  -webkit-font-smoothing: antialiased;
  background-color: #fafafa;
  border-color: "#cccccc";
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  color: "#3c3c3c";
  line-height: 1;
  border-radius: 2px;
  margin-bottom: 20px;
  outline: none;
  padding: 8px 10px;
`;

const AcceptedPaymentMethods = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;

const Span = styled.span`
  margin-left: 5px;
`;

class RmsForm extends Component {
  static propTypes = {
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Visa icon as SVG
       */
      iconVisa: PropTypes.node,
      /**
       * American Express icon as SVG
       */
      iconAmericanExpress: PropTypes.node,
      /**
       * Discover icon as SVG
       */
      iconDiscover: PropTypes.node,
      /**
       * Mastercard icon as SVG
       */
      iconMastercard: PropTypes.node
    }).isRequired,
    /**
     *  Used to determined if all form fields have been completed
    */
    isComplete: PropTypes.func.isRequired,
  };

  state = {
    cardNumberComplete: false,
    cardExpiryComplete: false,
    cardCvcComplete: false,
    postalCodeComplete: false,
  }

  handleOnChange = component => event => {
    this.setState({ [`${component}Complete`]: true }, this.isComplete);
  }

  isComplete = () => {
    // const { cardNumberComplete, cardExpiryComplete, cardCvcComplete, postalCodeComplete } = this.state;
    const { cardNumberComplete } = this.state;
    // if (cardNumberComplete && cardExpiryComplete && cardCvcComplete && postalCodeComplete) {
      if (cardNumberComplete) {
      this.props.isComplete(true);
    } else {
      this.props.isComplete(false);
    }
  }

  renderIcons = (ccIcons) => (
    <div>
      {ccIcons.map((icon, index) => <Span key={index}>{icon}</Span>)}
    </div >
  );

  render() {
    const ccIcons = [
      this.props.components.iconVisa,
      this.props.components.iconAmericanExpress,
      this.props.components.iconMastercard,
      this.props.components.iconDiscover
    ];

    const {
      cardNumberPlaceholder,
      cardExpiryPlaceholder,
      cardCvcPlaceholder,
      postalCodePlaceholder
    } = this.props;

    const {
      cardNumberIsFocused,
      cardExpiryIsFocused,
      cardCvcIsFocused,
      postalCodeIsFocused
    } = this.state;

    const commonProps = {
      style: {
        base: {
          "fontSize": "14px",
          "color": "#3c3c3c",
          "fontFamily": "'Source Sans Pro', 'Helvetica Neue', Helvetica, sans-serif",
          "::placeholder": {
            color: "#cccccc"
          }
        }
      },
      onFocus: this.handleOnFocus,
      onBlur: this.handleOnBlur
    };

    return (
      <Fragment>
        <AcceptedPaymentMethods>
          {this.renderIcons(ccIcons)}
        </AcceptedPaymentMethods>
        <Field>
          <input {...commonProps} onChange={this.handleOnChange('cardNumber')} placeholder="Card Number" />
        </Field>
      </Fragment>
    );
  }
}

// We should be using `withTheme` here, but it seems to cause serious errors in the
// deployed app, and does not work anyway. Need to investigate why `withComponents`
// works and does not cause errors but `withTheme` does not work. It is surely
// something related to the iframes that Stripe uses.
export default withComponents(RmsForm);