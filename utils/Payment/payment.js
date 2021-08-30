const {Client, Environment, CreatePaymentRequest} = require('square');

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

const paymentsApi = client.paymentsApi;

exports.processCreditCardInfo = async (req) => {
    try {
        return true
    } catch (err) {
        console.log(err)
    }
}