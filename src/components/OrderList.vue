<script setup>
import { ref, reactive } from "vue";
import ModalPopup from "@/components/ModalPopup.vue";
const detail = ref({
  name: "",
  price: 0,
  size: "",
  notes: "",
});
console.log(detail);

const list = reactive(
  Array.from({ length: 20 }).map(() => {
    return {
      name: "拿鐵",
      price: 70,
      size: "l",
      notes: "去冰",
    };
  })
);

const isShowEdit = ref(false);
const showEdit = () => {
  isShowEdit.value = true;
};
</script>

<template>
  <div class="container-fluid">
    <div class="row align-items-baseline">
      <div class="col-6"><h1>CoffeeShop</h1></div>
      <div class="col-6 text-right">
        <button class="btn btn-primary" @click="showEdit">新增</button>
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
          <td v-text="index + 1"></td>
          <td v-text="item.name" data-th="name"></td>
          <td v-text="item.price" data-th="price"></td>
          <td v-text="item.size" data-th="size"></td>
          <td v-text="item.notes" data-th="notes"></td>
          <td>
            <button class="btn btn-icon" title="編輯">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-icon" title="刪除">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ModalPopup v-model="isShowEdit">
    <div>
      <h2 class="modal-title">新增</h2>
      <form class="mb-4">
        <div class="row mb-2">
          <div class="col-auto">
            <label for="edit-name" class="form-label">Name</label>
          </div>
          <div class="col-md">
            <input id="edit-name" type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-auto">
            <label for="edit-price" class="form-label">Price</label>
          </div>
          <div class="col-md">
            <input id="edit-price" type="number" class="form-control" />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-auto">
            <label for="edit-size" class="form-label">Size</label>
          </div>
          <div class="col-md">
            <select id="edit-size" class="form-control"></select>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-auto">
            <label for="edit-notes" class="form-label">Notes</label>
          </div>
          <div class="col-md">
            <textarea id="edit-notes" rows="5" class="form-control"> </textarea>
          </div>
        </div>
      </form>
    </div>
    <template v-slot:footer="{ hideModal }">
      <div class="text-right">
        <button class="btn btn-primary mx-1">確認</button>
        <button class="btn btn-secondary mx-1" @click="hideModal">取消</button>
      </div>
    </template>
  </ModalPopup>
</template>
<style lang="scss" scoped>
.form-label {
  width: 100px;
}
</style>
