import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div className="px-4 py-10 my-20 lg:my-40 lg:mb-60">
            <h2 className="text-2xl font-bold text-center">Make Payments Securely !!</h2>
            <p className="text-center">Make payment to create unlimited posts ...</p>
            <div className="w-full max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
