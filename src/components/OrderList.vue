<script setup>
import { ref, reactive } from "vue";

const detail = ref({
  name: "",
  price: 0,
  size: "",
  notes: "",
});
console.log(detail);
const list = reactive([
  {
    name: "拿鐵",
    price: 70,
    size: "l",
    notes: "去冰",
  },
  {
    name: "拿鐵",
    price: 70,
    size: "l",
    notes: "去冰",
  },
]);
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>name</th>
          <th>price</th>
          <th>size</th>
          <th>notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.id">
          <td v-text="index + 1"></td>
          <td v-text="item.name"></td>
          <td v-text="item.price"></td>
          <td v-text="item.size"></td>
          <td v-text="item.price"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
