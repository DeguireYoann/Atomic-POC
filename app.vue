<template>
  <atomic-search-interface ref="searchInterface" search-hub="default" pipeline="default"
                           fields-to-include='["ec_brand","ec_category","ec_description","ec_images","ec_name", "source", "author","documenttype"]'>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </atomic-search-interface>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const searchInterface = ref(null);

async function initInterface() {
  try {
    if (searchInterface.value) {
      await searchInterface.value.initialize({
        accessToken: runtimeConfig.public.COVEO_API,
        organizationId: runtimeConfig.public.COVEO_PROJECT_NAME,
        organizationEndpoints: await searchInterface.value.getOrganizationEndpoints(runtimeConfig.public.COVEO_PROJECT_NAME),
      });

      await searchInterface.value.executeFirstSearch();
      await searchInterface.value.i18n.addResourceBundle("en", "caption-filetype", {
        ".html": "html",
      });
    } else {
      console.error('searchInterface.value est null. Impossible d\'initialiser l\'interface de recherche.');
    }
  } catch (error) {
    console.error(error);
  }
}
onMounted(initInterface);

useHead({

})
</script>

<style>
atomic-search-interface {
  --atomic-primary: #000;
  --atomic-primary-light: #EA0029;
  --atomic-on-primary: #ffffff;
  --atomic-ring-primary: rgba(0, 0, 0, 0.5);

  /* Neutral colors */
  --atomic-neutral-dark: #231F20;
  --atomic-neutral: #EEE;
  --atomic-neutral-light: #f6f7f9;
  --atomic-neutral-lighter: #f2f2f2;

  /* Semantic colors */
  --atomic-background: #ffffff;
  --atomic-on-background: #000;

  /* Border radius */
  --atomic-border-radius: 5px;

  /* Font */
  font-family: "Rubik", sans-serif;
}
body {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.add-to-cart {
  @apply text-white bg-black hover:bg-stone-950 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center w-full h-full justify-center
}
</style>
