import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

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
      // iconMastercard: PropTypes.node
    }),
    /**
     *  Used to determined if all form fields have been completed
     */
    isComplete: PropTypes.func.isRequired
  };

  state = {
    cardNumberComplete: false,
    cardExpiryComplete: false,
    cardCvcComplete: false,
    postalCodeComplete: false
  };

  handleOnChange = (component) => (event) => {
    console.log("handle on change event: ", event);
    this.setState({ [`${component}Complete`]: true }, this.isComplete);
  };

  isComplete = () => {
    const { cardNumberComplete, cardExpiryComplete, cardCvcComplete, postalCodeComplete } = this.state;
    console.log("is complete? state: ", this.state);
    if (cardNumberComplete && cardExpiryComplete && cardCvcComplete && postalCodeComplete) {
      this.props.isComplete(true);
    } else {
      this.props.isComplete(false);
    }
  };

  render() {
    const { wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

    return (
      <Fragment>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input
            {...getCardNumberProps({
              onChange: this.handleOnChange("cardNumber")
            })}
          />
          <input
            {...getExpiryDateProps({
              onChange: this.handleOnChange("cardExpiry")
            })}
          />
          <input
            {...getCVCProps({
              onChange: this.handleOnChange("cardCvc")
            })}
          />
        </PaymentInputsWrapper>
      </Fragment>
    );
  }
}

// We should be using `withTheme` here, but it seems to cause serious errors in the
// deployed app, and does not work anyway. Need to investigate why `withComponents`
// works and does not cause errors but `withTheme` does not work. It is surely
// something related to the iframes that Stripe uses.
export default withComponents(RmsForm);
