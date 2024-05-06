<template>
  <div class="flex flex-col items-center w-full" v-if="isHydratedStateFetch">
    <HeadlessSearch :hydratedController="hydratedState?.controllers.searchBox"
                    :staticState="staticState?.controllers.searchBox.state"
                    @search="refreshSearch"/>
    <div class="flex justify-center w-full space-x-10">
      <!-- Menu filter-->
      <div class="flex flex-col space-y-10 w-[30%]">
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :staticState="staticState?.controllers.qualityFacet.state"/>
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :hydratedController="hydratedState?.controllers.sensorFacet"
            :staticState="staticState?.controllers.sensorFacet.state"/>

        <HeadlessFacets
            @applyFilter="refreshSearch"
            :hydratedController="hydratedState?.controllers.sourceFacet"
            :staticState="staticState?.controllers.sourceFacet.state"/>

      </div>
      <!-- Menu filter End -->
      <HeadlessProductsList
          :hydratedController="hydratedState?.controllers.resultList"
          :staticState="staticState?.controllers.resultList.state"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CoveoSearchHydratedState } from "~/types/coveo";
import { defineProps, ref, reactive, watch, onMounted } from 'vue';

const props = defineProps({
  staticState: Object
});
const {$getHydratedState, $refreshState} = useNuxtApp();
let hydratedState = reactive<CoveoSearchHydratedState | undefined>(undefined);
const isHydratedStateFetch = ref(false);

const getHydratedState = async () => {
  hydratedState = await $getHydratedState(props.staticState);
  isHydratedStateFetch.value = hydratedState.controllers !== undefined;
}

const refreshSearch = async () => {
  $refreshState(hydratedState.controllers.searchParameterManager.state.parameters);
}

watch(() => props.staticState, async () => {
  await getHydratedState();
})

onMounted(async () => {
  if (props.staticState) {
    try {
      await getHydratedState();
    } catch (error) {
      console.error(error);
    }
  }
});
</script>
