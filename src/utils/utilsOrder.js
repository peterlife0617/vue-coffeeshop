import { uuid } from "vue3-uuid";
/**
 * get order list
 * @returns {Array}
 */
export const getOrders = () => {
  const orderList = JSON.parse(localStorage.getItem("order-list") ?? "[]");
  return orderList;
};

/**
 * update order data
 * @param {string} id uuid
 * @param {object} detail update data
 */
export const updateOrder = (id, detail) => {
  const orderList = JSON.parse(localStorage.getItem("order-list") ?? "[]");
  const deleteIndex = orderList.findIndex((item) => item.id === id);
  if (deleteIndex > -1) {
    // edit
    orderList.splice(deleteIndex, 1, detail);
  } else {
    // add
    orderList.push({ ...detail, id: uuid.v4() });
  }
  localStorage.setItem("order-list", JSON.stringify(orderList));
};

/**
 * delete order data
 * @param {*} id  uuid
 */
export const deleteOrder = (id) => {
  const orderList = JSON.parse(localStorage.getItem("order-list") ?? "[]");
  const deleteIndex = orderList.findIndex((item) => item.id === id);
  if (deleteIndex > -1) {
    orderList.splice(deleteIndex, 1);
  }
  localStorage.setItem("order-list", JSON.stringify(orderList));
};
