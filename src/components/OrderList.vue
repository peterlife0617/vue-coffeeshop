<script setup>
import { ref } from "vue";
import ModalPopup from "@/components/ModalPopup.vue";
import { useAlertStore } from "@/stores/alert.js";
import { getOrders, updateOrder, deleteOrder } from "@/utils/utilsOrder.js";

const list = ref(getOrders());
const isShowDetail = ref(false);
const showDetail = (value = true) => {
  isShowDetail.value = value;
};

const detail = ref({
  id: null,
  price: 0,
  name: "",
  size: "",
  notes: "",
});
// add/edit
const addData = () => {
  detail.value = {
    id: null,
    price: 0,
    name: "",
    size: "",
    notes: "",
  };
  showDetail();
};
const editData = (data) => {
  detail.value = data;
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
    console.log("123");
    deleteOrder(id);
    list.value = getOrders();
    showDetail(false);
  });
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
          <th width="1%"></th>
          <th>name</th>
          <th>price</th>
          <th>size</th>
          <th>notes</th>
          <th width="160" class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.id">
          <td v-text="index + 1" data-th=""></td>
          <td v-text="item.name" data-th="name"></td>
          <td v-text="item.price" data-th="price"></td>
          <td v-text="item.size" data-th="size"></td>
          <td v-text="item.notes" data-th="notes"></td>
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
      <h2 class="modal-title">新增</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <div class="row mb-2">
            <div class="col-auto">
              <label for="edit-name" class="form-label">Name</label>
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
              <label for="edit-price" class="form-label">Price</label>
            </div>
            <div class="col-md">
              <input
                id="edit-price"
                type="number"
                class="form-control"
                v-model="detail.price"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-auto">
              <label for="edit-size" class="form-label">Size</label>
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
              <label for="edit-notes" class="form-label">Notes</label>
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
