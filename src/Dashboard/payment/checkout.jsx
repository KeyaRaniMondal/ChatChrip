import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../shared/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext); 
    const [clientSecret, setClientSecret] = useState(null);
    const [transcationId, setTransactionId] = useState('');
    const price = 50; 
    useEffect(() => {
        if (price) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error('Error fetching clientSecret:', err));
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            console.error('Stripe.js has not loaded or clientSecret is missing');
            return;
        }

        const card = elements.getElement(CardElement); 

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            console.error('Payment Method Error:', paymentError);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        });

        if (confirmError) {
            console.error('Payment Confirmation Error:', confirmError);
            setTransactionId(paymentIntent.id);
            // Store the payment info to the database
            const payment = {
                email: user.email,
                price: price,
                transcationId: paymentIntent.id,
                date: new Date(),
                status: 'pending'
            };

            const res = await axiosSecure.post('/payments', payment);
            console.log(res);
        } else if (paymentIntent) {
            console.log('Payment Successful:', paymentIntent);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {transcationId && <p>Transaction ID: {transcationId}</p>}
        </form>
    );
};

export default CheckOutForm;
