<template>
  <div class="bg-white w-full">
    <div class="mx-auto max-w-2xl lg:max-w-7xl">
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8">
        <HeadlessProductCard v-for="item in state.results" :product="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  state: {
    required: true,
  }
});
</script>