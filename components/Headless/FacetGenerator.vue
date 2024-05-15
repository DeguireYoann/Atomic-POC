<template>
  <div>
    <HeadlessAutomaticFacet v-for="facet in controller.state.automaticFacets"
                            :key="facet.state.field"
                            :controller="facet"
    />
  </div>
</template>
<script setup lang="ts">
const {$staticStateRef, $hydratedStateRef} = useNuxtApp();
const controller = ref($hydratedStateRef.value.controllers.facetGenerator);

watchEffect(() => {
  controller.value.subscribe(() => Object.assign($staticStateRef.value.controllers.facetGenerator.state, {...controller.value.state}));
})
</script>