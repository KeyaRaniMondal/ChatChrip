import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./checkout";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Make Payments Securely !!</h2>
            <div className="w-[600px] mx-auto mt-20  h-80 pt-20">
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
            </div>
            
        </div>
    );
};

export default Payment;

