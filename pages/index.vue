<template>
  <div class="pt-24">
    <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <!--Left Col-->
      <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <p class="uppercase tracking-loose w-full">Proof of Concept</p>
        <h1 class="my-4 text-5xl font-bold leading-tight">
          Coveo Search Engine
        </h1>
        <p class="leading-normal text-2xl mb-8">
          Using either Atomic Library or HeadLess Search
        </p>
        <div class="flex flex-wrap items-center justify-between space-x-10">
          <a href="/atomic"
             class="pastille">
            Atomic Library
          </a>
          <a href="/headless"
             class="pastille">
            Headless Search Engine
          </a>
        </div>
      </div>
      <!--Right Col-->
      <div class="w-full md:w-3/5 py-6 text-center">
        <img class="w-full md:w-4/5 z-50" src="/assets/images/hero.png"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pastille:hover {
  background-color: lightblue;
}
.pastille {
  @apply mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg transform transition hover:scale-105 duration-300 ease-in-out;
}
</style>