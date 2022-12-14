const asyncHandler = require("express-async-handler");
const { where } = require("sequelize-date");
const Order = require("../model/order.model");
const OrderDetail = require("../model/orderDetails.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");
const sequelize = require("../model/Sequelize").sequelize;
const DataTypes = require("sequelize").DataTypes;

const curd = require("express-crud-router").crud;

const getOrderDetails = asyncHandler(async (req, res, next) => {
  // const orderID = req.body["orderId"];
  const orderId = req.params.id;
  // const order = await Order.findByPk(orderID);
  const data = await Product.findAll({
    include: {
      model: OrderDetail,
      where: {
        orderId: orderId,
      },
    },
  });
  return res.status(200).json(data);
});

const getAllOrder = asyncHandler(async (req, res, next) => {
  // const userId = req.body["userId"]
  // const id = req.params.id;
  const test = JSON.parse(req.query.range);
  console.log(test);
  const results = await Order.findAndCountAll({
    where: JSON.parse(req.query.filter),
    include: {
      model: Product,
    },
    order: [JSON.parse(req.query.sort)],
    offset: Object.values(test)[0],
    limit: Object.values(test)[1],
    distinct: true,
  });
  return res
    .status(200)
    .set("Access-Control-Expose-Headers", "X-total-count")
    .set("X-Total-Count", results.count)
    .set(
      "Content-Range",
      `orders ${Object.values(test)[0]}-${Object.values(test)[1]}/${
        results.count
      }`
    )
    .json(results.rows);
});

const createOrder = asyncHandler(async (req, res, next) => {
  const [body ,note] = [
    // req.body["_body.user_id"],
    // req.body["_body.total"],
    // req.body["_body.orderDetails"],
    req.body["_body"],
    req.body["note"]
  ];

    console.log(body["user_id"])
  
  await sequelize
  .transaction(async (t1) => {
    //tạo order
    let order = await Order.create(
        {
            user_id: body.user_id,
            total: body.total,
            status: "Chờ xét duyệt",
            UserId: body.user_id,
            note: note,
            create_at: DataTypes.NOW,
            update_at: DataTypes.NOW,
          },
          { transaction: t1 }
          );
          console.log(body.orderDetails)
          const data = await body.orderDetails.map((item) => ({
            orderId: order.id,
            productId: item.product_id,
            quantityOrdered: item.quantity,
            priceEach: item.priceEach,
          }));
          await OrderDetail.bulkCreate(data, { transaction: t1 });
      
    })
    .then(() => {
      return res.status(200).json({
        message: "Đặt hàng thành công",
        stastus: 200,
      });
    })
    .catch((err) => {
      const newErr = new Error('giao dịch không thành công')
      newErr.stack = err
      next(newErr, req, res, next)}
  )
});
const deleteOrder = asyncHandler(async (req, res, next) => {
  await Order.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json("XOA THANH CONG");
});

const editOrder = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  await Order.update(
    { status: req.query.status },
    { where: { id: req.params.id } }
  ).then((noti) => {
    return res.status(200).json(noti);
  });
});
const getAll = asyncHandler(async (req, res, next) => {
  const ress = await Order.findAndCountAll({
    include: {
      model: User,
    },
    // distinct: true,
  });
  console.log(ress);
  return res.status(200).json(ress);
});

module.exports = {
  getOrderDetails,
  createOrder,
  getAllOrder,
  deleteOrder,
  editOrder,
  getAll,
};