<template>
  <div>
    <HeadlessSearchInterface v-if="staticState" :staticState="staticState" />
  </div>
</template>

<script setup lang="ts">
import type {CoveoSearchStaticState} from "~/types/coveo";

const {$getStaticState} = useNuxtApp();
let staticState = reactive<CoveoSearchStaticState | undefined>(undefined);

const getStaticState = async () => {
  try {
    return await $getStaticState();
  } catch (error) {
    console.error("Error fetching Static State", error);
  }
}
staticState = await getStaticState();
</script>
