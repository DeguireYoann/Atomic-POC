<template>
  <div class="flex flex-col items-center w-full">
    <HeadlessSearch/>
    <div class="flex justify-center w-full space-x-10">
      <div class="flex flex-col space-y-10 w-[30%]">
        <HeadlessFacets :controller="hydrateState?.controllers?.qualityFacet" :state="staticState.controllers.qualityFacet.state"/>
        <HeadlessFacets :controller="hydrateState?.controllers?.sensorFacet" :state="staticState.controllers.sensorFacet.state"/>
        <HeadlessFacets :controller="hydrateState?.controllers?.sourceFacet" :state="staticState.controllers.sourceFacet.state"/>
      </div>
      <HeadlessProductsList :list="staticState.searchAction.payload.response"/>
    </div>
  </div>
</template>


<script setup>
import {
  buildSSRSearchParameterSerializer,
  defineContext, defineFacet, defineResultList, defineSearchBox, defineSearchEngine, defineSearchParameterManager,
  getSampleSearchEngineConfiguration
} from '@coveo/headless/ssr';
import {getOrganizationEndpoints} from "@coveo/headless";

const runtimeConfig = useRuntimeConfig();
// Config du Engine
const config = {
  configuration: {
    // ...getSampleSearchEngineConfiguration(),
    accessToken: runtimeConfig.public.COVEO_API,
    organizationId: runtimeConfig.public.COVEO_PROJECT_NAME,
    organizationEndpoints: getOrganizationEndpoints(runtimeConfig.public.COVEO_PROJECT_NAME),
    analytics: {enabled: false},
  },
  controllers: {
    context: defineContext(),
    searchBox: defineSearchBox(),
    resultList: defineResultList({options: {fieldsToInclude: ["ec_images"]}}),
    sourceFacet: defineFacet({options: {field: 'Source'}}),
    qualityFacet: defineFacet({options: {field: 'ec_quality'}}),
    sensorFacet: defineFacet({options: {field: 'ec_sensor'}}),
    searchParameterManager: defineSearchParameterManager(),
  },
}
const engineDefinition = defineSearchEngine(config);

// Récupérez les paramètres de recherche à partir de la requête
const route = useRoute();
const {toSearchParameters} = buildSSRSearchParameterSerializer();
const searchParameters = toSearchParameters(route.query);

// Définissez les valeurs de contexte
const contextValues = {ageGroup: '30-45', mainInterest: 'mecanics', region: 'Canada Qc'};

let staticState;
const {fetchStaticState, hydrateStaticState} = engineDefinition;

// Récupérez l'état statique en utilisant la méthode fetchStaticState
staticState = await fetchStaticState({
  controllers: {
    context: {initialState: {values: contextValues}},
    searchParameterManager: {initialState: {parameters: searchParameters}}
  }
});
console.log(staticState)
let hydrateState;
onMounted(async () => {
  hydrateState = await hydrateStaticState({
    searchAction: staticState.searchAction,
    controllers: {
      context: {initialState: {values: contextValues}},
      searchParameterManager: {initialState: {parameters: searchParameters}}
    }
  })
  console.log(hydrateState)
})
</script>
