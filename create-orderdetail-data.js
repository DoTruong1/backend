const OrderDetail = require('./model/orderDetails.model');
const orderdetail = require('./orderdetaildata');

(async () => {
    for (let orderdt of orderdetail) {
        const x = await OrderDetail.create({
            order_id: orderdt.order_id,
            product_id: orderdt.product_id,
            payment_id: orderdt.payment_id,
            priceEach: orderdt.priceEach
        }).then();
    }
})();





