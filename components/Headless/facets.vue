<template>
  <div class="grid flex flex-col border p-3">
    <div class="flex flex-col">
      <h3 class="text-lg font-normal pb-3"> {{ state.label ?? "Filters" }}</h3>
      <div class="flex items-center" v-for="filter in state.values" :key="filter.value">
        <div class="flex items-center justify-center my-1">
          <input id="apple" type="checkbox" value=""
                 class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 dark:bg-gray-700"/>
          <label for="apple" class="ml-2 text-sm font-medium">
            {{ filter.value }} ({{ filter.numberOfResults }})
          </label>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
const props = defineProps({
  controller: {
    required: false,
  },
  state: {
    required: true,
  }
})
</script>