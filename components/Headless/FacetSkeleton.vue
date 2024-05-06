<template>
  <div class="flex flex-col space-y-10">

  <div v-for="i in 3" class="border border-gray-200 bg-gray-100 shadow rounded-md p-4">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div v-for="i in 3" class="h-2 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
  </div>
</template>