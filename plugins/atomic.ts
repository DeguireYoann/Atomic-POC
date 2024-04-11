export default defineNuxtPlugin((app)=> {
  if (process.client) {
    import('@coveo/atomic/loader').then(({ defineCustomElements }) => {
      defineCustomElements(window);
    });
  }
})