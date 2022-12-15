const Order = require('./model/order.model');
const order = require('./orderdata');

(async () => {
    for (let orderData of order) {
        const x = await Order.create({
            user_id: orderData.user_id,
            payment_id: orderData.payment_id,
            total: orderData.total,
            status: orderData.status
        }).then();
    }
})();

