<template>
  <div v-if="!isLoading" class="grid flex flex-col border p-3">
    <div class="flex flex-col">
      <h3 class="text-lg font-normal pb-3">{{ label ?? "Filters" }}</h3>
      <div v-for="facet in values" :key="facet.value" class="flex items-center">
        <input :id="facet.value" type="checkbox" :value="facet.value" :checked="facet.state === 'selected'" @change="toggleSelect(facet)"
               class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 dark:bg-gray-700"/>
        <label :for="facet.value" class="ml-2 text-sm font-medium">{{ facet.value }} ({{ facet.numberOfResults }})</label>
      </div>
    </div>
  </div>
  <div v-else class="text-center">Loading...</div>
</template>

<script setup>
const props = defineProps({
  controller: Object,
  state: Object
});
const emit = defineEmits(['refresh']);
const { label, values, isLoading } = toRefs(props.state);

const toggleSelect = (facet) => {
  props.controller.toggleSelect(facet);
  props.controller.facetSearch.search();
  emit('refresh');
};

onMounted(() => {
  props.controller.facetSearch.search();
  // props.controller.subscribe(() => {
  //   props.state.value = { ...props.controller.state };
  // });
})
</script>
