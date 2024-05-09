<template>
  <div class="flex flex-col items-center w-full" v-if="$hydratedStateRef.value != undefined">
    <div class="flex justify-center w-full space-x-10">
      <div class="flex flex-col space-y-10 w-[30%]">
        <HeadlessFacets v-for="type in facetTypes" :key="type"
                        :type="type"/>
      </div>
      <div class="flex flex-col space-y-10">
        <HeadlessSearch/>
        <HeadlessProductsList/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$hydratedStateRef} = useNuxtApp();
const facetTypes = ['qualityFacet', 'sensorFacet', 'sourceFacet'];
</script>
