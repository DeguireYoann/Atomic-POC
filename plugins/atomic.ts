export default defineNuxtPlugin({
    name: 'atomic',
    parallel: true,
    async setup(nuxtApp) {
        if (process.client) {
            import('@coveo/atomic/loader').then(({defineCustomElements}) => {
                defineCustomElements(window);
            });
        }
    }
})
