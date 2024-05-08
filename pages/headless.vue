<template>
  <div class="flex flex-col items-center w-full" v-if="isHydratedStateFetch">
    <HeadlessSearch/>
    <div class="flex justify-center w-full space-x-10">
      <div class="flex flex-col space-y-10 w-[30%]">
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :controller="hydratedState.controllers.qualityFacet"/>
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :controller="hydratedState.controllers.sensorFacet"/>
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :controller="hydratedState.controllers.sourceFacet"/>
      </div>
      <HeadlessProductsList
          :state="hydratedState.controllers.resultList.state"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {CoveoSearchHydratedState, CoveoSearchStaticState} from "~/types/coveo";

const {$getStaticState, $getHydratedState, $refreshState} = useNuxtApp();
let hydratedState = reactive<CoveoSearchHydratedState | undefined>(undefined);
let staticState = reactive<CoveoSearchStaticState | undefined>(undefined);

const isHydratedStateFetch = ref(false);

const getStaticState = async () => {
  try {
    return await $getStaticState();
  } catch (error) {
    console.error("Error fetching Static State", error);
  }
}
staticState = await getStaticState();

const refreshSearch = async () => {
  $refreshState(hydratedState.controllers.searchParameterManager);
}

const getHydratedState = async () => {
  hydratedState = await $getHydratedState(staticState);
  isHydratedStateFetch.value = true;
}
if (staticState) {
  await getHydratedState();
}
</script>
