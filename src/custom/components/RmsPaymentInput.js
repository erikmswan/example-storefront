import React, { Component } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";

const IconLockSpan = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const Span = styled.span`
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, sans-serif;
  vertical-align: super;
`;

class RmsPaymentInput extends Component {
  static propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Secured lock icon
       */
      iconLock: PropTypes.node,
      /**
       * Pass either the Reaction RmsForm component or your own component that
       * accepts compatible props.
       */
      RmsForm: PropTypes.object.isRequired
    }),
    /**
     * Pass true while the input data is in the process of being saved.
     * While true, the form fields are disabled.
     */
    isSaving: PropTypes.bool,
    /**
     * When this action's input data switches between being
     * ready for saving and not ready for saving, this will
     * be called with `true` (ready) or `false`
     */
    onReadyForSaveChange: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object may have `data`, `displayName`,
     * and `amount` properties.
     */
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    onReadyForSaveChange() {},
    onSubmit() {}
  };

  componentDidMount() {
    const { onReadyForSaveChange } = this.props;
    onReadyForSaveChange(false);
  }

  async submit() {
    const { onSubmit } = this.props;

    // TODO: Fifo request here?

    await onSubmit({
      // displayName: `${token.card.brand} ending in ${token.card.last4}`,
      displayName: "credit card test",
      data: {
        test: "test.id"
      }
    });
  }

  handleChangeReadyState = (isReady) => {
    const { onReadyForSaveChange } = this.props;

    if (isReady !== this.lastIsReady) {
      onReadyForSaveChange(isReady);
    }
    this.lastIsReady = isReady;
  };

  render() {
    const {
      className,
      components: { iconLock, RmsForm }
    } = this.props;

    return (
      <div className={className}>
        <RmsForm isComplete={this.handleChangeReadyState} />
        <div>
          <IconLockSpan>{iconLock}</IconLockSpan> <Span>Your Information is private and secure.</Span>
        </div>
      </div>
    );
  }
}

export default withComponents(RmsPaymentInput);
