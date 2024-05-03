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
// import type {FacetDefinition} from "@coveo/headless/ssr";
// import type {PropType} from "vue";

const props = defineProps({
  hydratedController: Object,
  staticController: Object
});

const emit = defineEmits(['applyFilter']);
let controllerState = ref(undefined);
controllerState.value = props.staticController.state;
const { label, values, isLoading } = toRefs(controllerState.value);

watch(controllerState, () => {
  console.log(controllerState)
});

const toggleSelect = (facet) => {
  console.log(props.hydratedController, "OCO")
  props.hydratedController.toggleSelect(facet);
  props.hydratedController.search();
  emit('applyFilter');
};

onMounted(() => {
  const {$hydratedState} = useNuxtApp();
  console.log($hydratedState,"YEET");
  controllerState = props.hydratedController.state;
  console.log(controllerState)
  // props.controller.facetSearch.search();
  // props.controller.subscribe(() => {
  //   props.state.value = { ...props.controller.state };
  // });
})
</script>
