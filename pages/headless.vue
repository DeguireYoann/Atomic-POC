<template>
  <div class="flex flex-col items-center w-full">
    <HeadlessSearch/>
    <div class="flex justify-center w-full space-x-10">
        <div class="flex flex-col space-y-10 w-[30%]" v-if="ishydratedStatefetch">
          <HeadlessFacets @refresh="refreshSearch" :state="staticState.controllers.qualityFacet.state" :controller="hydratedState.controllers.qualityFacet"/>
          <HeadlessFacets @refresh="refreshSearch" :state="staticState.controllers.sensorFacet.state" :controller="hydratedState.controllers.sensorFacet"/>
          <HeadlessFacets @refresh="refreshSearch" :state="staticState.controllers.sourceFacet.state" :controller="hydratedState.controllers.sourceFacet"/>
        </div>
      <div v-else class="w-[30%]">
        <HeadlessFacetSkeleton />
      </div>

      <HeadlessProductsList :list="staticState.searchAction.payload.response"/>
    </div>
  </div>
</template>


<script setup>
import {
  buildSSRSearchParameterSerializer,
} from '@coveo/headless/ssr';

const {fetchStaticState, hydrateStaticState} = useNuxtApp().$engineDefinition;
const hydratedState = ref(null);
const ishydratedStatefetch = ref(false);
const contextValues = useUserContext();
const route = useRoute();
const {toSearchParameters, serialize} = buildSSRSearchParameterSerializer();
const searchParameters = computed(() => {
  return toSearchParameters(route.query);
});



let staticState;
// Récupérez l'état statique en utilisant la méthode fetchStaticState
const getStaticState = async (params) => {
  staticState = await fetchStaticState({
    controllers: {
      context: {initialState: {values: contextValues}},
      searchParameterManager: {initialState: {parameters: params ?? searchParameters.value}}
    }
  });
}
await getStaticState()

const getHydratedState = async (params) => {
  const {searchParameterManager, context} = staticState.controllers;
  hydratedState.value = await hydrateStaticState({
    searchAction: staticState.searchAction,
    controllers: {
      context: {initialState: {values: context}},
      searchParameterManager: {initialState: {parameters: params ?? searchParameterManager}}
    }
  })
  console.log(hydratedState.value)

}

onMounted(async () => {
  try {
    await getHydratedState();
    ishydratedStatefetch.value = ishydratedStatefetch.value != null;
  } catch (error) {
    console.error('Error fetching data:');
  }
})

const refreshSearch = async () => {
  const controller = hydratedState.value.controllers.searchParameterManager;
  const newURL = new URL(route.fullPath, 'http://localhost:3000');
  const newRoute = serialize(controller.state.parameters, newURL);
  const urlParams = newRoute.split(route.path)[1];
  if(!urlParams.length) {
    route.params = null;
  }
  navigateTo(newRoute, { external: true })
  // await getStaticState(toSearchParameters(route.query))
}
</script>
