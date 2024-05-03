// import {
//     type SearchParameterManager,
//     type SearchParameterManagerState,
//     buildSSRSearchParameterSerializer,
// } from '@coveo/headless/ssr';
//
// interface UseSyncSearchParameterManagerProps {
//     staticState: SearchParameterManagerState;
//     controller?: SearchParameterManager;
// }
//
// function useSearchParameterManager({
//                                        staticState,
//                                        controller,
//                                    }: UseSyncSearchParameterManagerProps) {
//     const searchParameters = ref(staticState);
//     onMounted(() => {
//         if (!controller) {
//             return;
//         }
//         return controller.subscribe(() => searchParameters.value = controller.state);
//     });
//     return searchParameters;
// }
//
// export function useSyncSearchParameterManager({staticState, controller}: UseSyncSearchParameterManagerProps) {
//     const route = useRoute();
//     let query = route.fullPath;
//     const state = useSearchParameterManager({staticState, controller});
//
//
//     const searchParameters = ref(staticState); // Initialisez la variable searchParameters avec la valeur statique
//
//     // Utilisez onMounted pour souscrire aux changements du controller
//     onMounted(() => {
//         if (!controller) return;
//         const unsubscribe = controller.subscribe(() => {
//             searchParameters.value = controller.state;
//         });
//         return () => {
//             unsubscribe();
//         };
//     });
//
//     // Utilisez onMounted pour mettre à jour l'interface de recherche
//     onMounted(() => {
//         if (!controller || !query) return;
//         const {toSearchParameters} = buildSSRSearchParameterSerializer();
//         const searchParameters = toSearchParameters(route.params);
//         controller.synchronize(searchParameters);
//     });
//
//     // Utilisez computed pour calculer l'URL corrigée
//     const correctedUrl = computed(() => {
//         if (!query) return null;
//         const {serialize} = buildSSRSearchParameterSerializer();
//         const newURL = new URL(query, 'http://localhost'); // Utilisez 'http://localhost' comme base URL
//         return serialize(searchParameters.value.parameters, newURL);
//     });
//
//     // Utilisez onMounted pour mettre à jour l'URL
//     onMounted(() => {
//         if (!correctedUrl.value || document.location.href === correctedUrl.value) return;
//
//         const {pathname} = new URL(correctedUrl.value);
//         if (pathname !== document.location.pathname) return;
//
//         const isStaticState = controller === undefined;
//         // query = isStaticState ? query.replace(correctedUrl.value) : query.push(correctedUrl.value);
//         if (isStaticState) {
//             route.fullPath.replace(query, correctedUrl.value);
//         }
//         // else {
//         //     route.params.push(correctedUrl.value);
//         // }
//     });
//
//     // Retournez les valeurs nécessaires
//     return {searchParameters, correctedUrl};
// }
