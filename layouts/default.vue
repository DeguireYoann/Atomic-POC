<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex items-center justify-center my-8">
      <div class="w-full max-w-7xl">
        <slot />
      </div>
    </div>
    <Footer class="mt-auto"/>
  </div>
</template>