<template>
  <form class="flex-full items-center" @submit.prevent="search">
    <div class="flex-full relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
        </svg>
      </div>
      <input
          type="text"
          :value="searchText"
          @input="updateSearchText"
          id="simple-search"
          class="search-bar"
          placeholder="Search branch name..."/>
    </div>
    <button type="submit"
            class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span class="sr-only">Search</span>
    </button>
  </form>
</template>

<script setup>
const {$staticStateRef, $hydratedStateRef} = useNuxtApp();
const searchText = ref($staticStateRef.value.controllers.searchBox.state.value);
const controller = ref($hydratedStateRef.value.controllers.searchBox);

const updateSearchText = (event) => {
  searchText.value = event.target.value;
  controller.value.updateText(searchText.value);
};

const search = () => {
  controller.value.submit();
  useSearchParameterManager();
};

watchEffect(() => {
  controller.value.subscribe(() => Object.assign($staticStateRef.value.controllers.resultList.state, {...controller.value.state}));
})
</script>

<style scoped>
.search-bar {
  @apply flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5;
}

.flex-full {
  @apply flex w-full
}
</style>