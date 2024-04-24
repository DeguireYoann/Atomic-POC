<template>
  <div v-if="!nadir" class="col shadow-md hover:shadow-xl flex flex-col p-3">
    <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md">
      <img :src="image" alt="Front of men&#039;s Basic Tee in black."
           class="h-full w-full object-cover object-center lg:h-full lg:w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            {{ title }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">Black</p>
      </div>
      <p class="text-sm font-medium text-gray-900">$35</p>
      <button class="bg-emerald-700 rounded-md p-3 font-bold text-white" @click="() => addToCart()">Add To Cart</button>
    </div>
  </div>
  <div v-if="nadir" class="flex items-center justify-center h-[370px]"><h1 class="text-red-600 text-6xl font-black">Fuck U !</h1></div>
</template>
<script setup lang="ts">
const props = defineProps({
  product: {
    required: true,
  }
})

const image = computed(() => props.product?.raw?.ec_images ?? props.product?.raw?.ec_images?.[0]);
const title = computed(() => props.product?.title);


let nadir = ref(false);
const addToCart = () => {
  nadir.value = true;
}
</script>