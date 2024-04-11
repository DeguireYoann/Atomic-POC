<template>
<!-- Main navigation container -->
<nav
  class="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
  <div class="flex w-full flex-wrap items-center justify-between px-3">
    <span class="ms-2 text-xl text-black dark:text-white">Navbar</span>
    <div class="ms-5 flex w-[30%] items-center justify-between">
    <clientOnly>
      <Search />
    </clientOnly>
    </div>
  </div>
</nav>
</template>