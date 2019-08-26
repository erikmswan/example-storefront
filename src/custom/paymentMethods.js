import ExampleIOUPaymentForm from "@reactioncommerce/components/ExampleIOUPaymentForm/v1";
import StripePaymentInput from "@reactioncommerce/components/StripePaymentInput/v1";

const paymentMethods = [
  {
    displayName: "Stripe Credit Card",
    InputComponent: StripePaymentInput,
    name: "stripe_card",
    shouldCollectBillingAddress: true
  },
  {
    displayName: "IOU",
    InputComponent: ExampleIOUPaymentForm,
    name: "iou_example",
    shouldCollectBillingAddress: true
  },
  {
    displayName: "Fifo Credit Card",
    InputComponent: StripePaymentInput,
    name: "fifo_card",
    shouldCollectBillingAddress: true
  },
];

export default paymentMethods;
