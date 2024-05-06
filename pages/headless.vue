<template>
  <div class="flex flex-col items-center w-full" v-if="staticState != undefined">
    <HeadlessSearch/>
    <div class="flex justify-center w-full space-x-10">
      <div class="flex flex-col space-y-10 w-[30%]">
        <ClientOnly>
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :hydratedController="hydratedState?.controllers?.qualityFacet"
        :staticController="staticState.controllers.qualityFacet"/>
        <HeadlessFacets
            @applyFilter="refreshSearch"
            :hydratedController="hydratedState?.controllers?.qualityFacet"
            :staticController="staticState.controllers.sensorFacet"/>

        <HeadlessFacets
            @applyFilter="refreshSearch"
            :hydratedController="hydratedState?.controllers?.qualityFacet"
            :staticController="staticState.controllers.sourceFacet"/>
        </ClientOnly>

      </div>
<!--            <div v-else class="w-[30%]">-->
<!--              <HeadlessFacetSkeleton />-->
<!--            </div>-->
      <HeadlessProductsList v-if="staticState.controllers.resultList"
                            :state="staticState.controllers.resultList.state"/>
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
  staticState.controllers.resultList.state = hydratedState.controllers.resultList.state;
  $refreshState(hydratedState.controllers.searchParameterManager.state.parameters);
}

const getHydratedState = async () => {
  hydratedState = await $getHydratedState(staticState);
  isHydratedStateFetch.value = true;
}

onMounted(async () => {
  if (staticState) {
    try {
      await getHydratedState();
    } catch (error) {
      console.error(error);
    }
  }
});
</script>
