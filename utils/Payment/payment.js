const {Client, Environment, CreatePaymentRequest} = require('square');

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

const paymentsApi = client.paymentsApi;

exports.processCreditCardInfo = async (req) => {
    try {
        const response = await client.paymentsApi.createPayment({
            sourceId: 'cnon:card-nonce-ok',
            idempotencyKey: 'fb029cd7-0a28-484b-9c33-49d66f34f5c6',
            amountMoney: {
                amount: 1111,
                currency: 'USD'
            }
        });
        if (response.result.payment.status === 'COMPLETED'){
            return {
                paymentProcess: true,
                paymentResults: response.result.payment
            }
        } else {
            return {
                paymentProcess: false,
                paymentResults: response.result.payment
            }

        }
    } catch (error) {
        console.log(error);
    }
}