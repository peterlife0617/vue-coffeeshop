<script setup>
import { ref } from "vue";
import ModalPopup from "@/components/ModalPopup.vue";
import { useAlertStore } from "@/stores/alert.js";
import { getOrders, updateOrder, deleteOrder } from "@/utils/utilsOrder.js";
import { stringify } from "postcss";

const list = ref(getOrders());
const isShowDetail = ref(false);
const showDetail = (value = true) => {
  isShowDetail.value = value;
};

const detail = ref({
  id: null,
  price: 1,
  name: "",
  size: "",
  notes: "",
});
// add/edit
const addData = () => {
  detail.value = {
    id: null,
    price: 1,
    name: "",
    size: "",
    notes: "",
  };
  showDetail();
};
const editData = (data) => {
  detail.value = { ...data };
  showDetail();
};

const save = () => {
  const { id } = detail.value;
  updateOrder(id, detail.value);
  list.value = getOrders();
  showDetail(false);
};

// delete
const alertStore = useAlertStore();
const deleteData = (id) => {
  alertStore.showAlert(true, "是否刪除此訂單?", () => {
    deleteOrder(id);
    list.value = getOrders();
    showDetail(false);
  });
};

const sizeConvert = (size) => {
  return size.toUpperCase();
};
const moneyConvert = (money) => {
  return String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div class="container-fluid">
    <div class="row align-items-baseline">
      <div class="col-6"><h1>CoffeeShop</h1></div>
      <div class="col-6 text-right">
        <button class="btn btn-primary" @click="addData">新增</button>
      </div>
    </div>
    <table class="table table-rwd">
      <thead>
        <tr>
          <th width="80"></th>
          <th>品項</th>
          <th>價格</th>
          <th>L/M/S</th>
          <th width="200">備註</th>
          <th width="130" class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.id">
          <td v-text="index + 1" data-th=""></td>
          <td v-text="item.name" data-th="品項"></td>
          <td
            v-text="moneyConvert(item.price)"
            data-th="價格"
          ></td>
          <td v-text="sizeConvert(item.size)" data-th="L/M/S"></td>
          <td v-text="item.notes" data-th="備註"></td>
          <td data-th="">
            <button class="btn btn-icon" title="編輯" @click="editData(item)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              class="btn btn-icon"
              title="刪除"
              @click="deleteData(item.id)"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-show="list.length === 0">
          <td colspan="6" class="text-center">沒有訂單資料</td>
        </tr>
      </tbody>
    </table>
  </div>
  <ModalPopup v-model="isShowDetail">
    <div>
      <h2 class="modal-title">{{ detail.id ? "編輯" : "新增" }}</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <div class="row mb-2">
            <div class="col-auto">
              <label for="edit-name" class="form-label">品項</label>
            </div>
            <div class="col-md">
              <input
                id="edit-name"
                type="text"
                class="form-control"
                v-model="detail.name"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-auto">
              <label for="edit-price" class="form-label">價格</label>
            </div>
            <div class="col-md">
              <input
                id="edit-price"
                type="number"
                class="form-control"
                min="0"
                v-model="detail.price"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-auto">
              <label for="edit-size" class="form-label">尺寸</label>
            </div>
            <div class="col-md">
              <select id="edit-size" class="form-control" v-model="detail.size">
                <option value="">請選擇</option>
                <option value="l">L</option>
                <option value="m">M</option>
                <option value="s">S</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-auto">
              <label for="edit-notes" class="form-label">備註</label>
            </div>
            <div class="col-md">
              <textarea
                id="edit-notes"
                rows="5"
                class="form-control"
                v-model="detail.notes"
              >
              </textarea>
            </div>
          </div>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary mx-1">確認</button>
        </div>
      </form>
    </div>
  </ModalPopup>
</template>
<style lang="scss" scoped>
.form-label {
  width: 100px;
}
</style>
