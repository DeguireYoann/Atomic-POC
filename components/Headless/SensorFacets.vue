<script setup>
const {$useSensorFacet} = useNuxtApp();
const {state, methods} = $useSensorFacet();

const emit = defineEmits(['applyFilter']);
const { label, values, isLoading } = state;

const toggleSelect = (facet) => {
  methods.toggleSelect(facet);
  emit('applyFilter');
};
</script>

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

<style scoped>

</style>