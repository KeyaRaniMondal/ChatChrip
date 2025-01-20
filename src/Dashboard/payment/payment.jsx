import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./checkout";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <h2>Payment Page</h2>
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default Payment;

