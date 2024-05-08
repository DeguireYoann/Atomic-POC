<template>
  <div class="flex flex-col items-center w-full" v-if="$hydratedStateRef.value != undefined">
    <HeadlessSearch/>
    <div class="flex justify-center w-full space-x-10">
      <div class="flex flex-col space-y-10 w-[30%]">
        <HeadlessFacets
            type="qualityFacet"/>
        <HeadlessFacets
            type="sensorFacet"/>
        <HeadlessFacets
            type="sourceFacet"/>
      </div>
      <HeadlessProductsList/>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$hydratedStateRef} = useNuxtApp();
</script>
