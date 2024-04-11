<script setup lang="ts">
import resultTemplate from "~/templates/result-template.html?raw";
</script>

<template>
    <atomic-layout-section section="main">
      <atomic-layout-section section="status">
        <atomic-query-summary></atomic-query-summary>
        <atomic-sort-dropdown>
          <atomic-sort-expression label="relevance" expression="relevancy"></atomic-sort-expression>
          <atomic-sort-expression label="most-recent" expression="date descending"></atomic-sort-expression>
        </atomic-sort-dropdown>
      </atomic-layout-section>

      <atomic-layout-section section="result">
        <atomic-result-list display="list" image-size="small">
          <atomic-result-template v-html="resultTemplate"></atomic-result-template>
        </atomic-result-list>
      </atomic-layout-section>

      <atomic-layout-section role="pagination">
        <atomic-load-more-results></atomic-load-more-results>
      </atomic-layout-section>
    </atomic-layout-section>
</template>
