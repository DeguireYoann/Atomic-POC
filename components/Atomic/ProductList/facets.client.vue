<template>
  <atomic-layout-section section="facets">
    <atomic-automatic-facet-generator></atomic-automatic-facet-generator>
    <atomic-category-facet field="source" label="Categories"></atomic-category-facet>
    <atomic-facet-manager>
      <atomic-facet field="source" label="Source" sort-criteria="automatic"></atomic-facet>
      <atomic-facet field="ec_price" label="Price" sort-criteria="automatic"></atomic-facet>
      <atomic-facet field="ec_quality" label="Quality" sort-criteria="automatic"></atomic-facet>
      <atomic-facet field="ec_sensor" label="Sensor" sort-criteria="automatic"></atomic-facet>
      <div class="CoveoFacetSlider" data-title="Price" data-field="@ec_price"></div>
    </atomic-facet-manager>
  </atomic-layout-section>
</template>
<script setup lang="ts">
</script>