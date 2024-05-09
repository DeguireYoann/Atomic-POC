import {buildSSRSearchParameterSerializer} from "@coveo/headless/ssr";

export const useSearchParameterManager = async (parametersManager: any) => {
    const { $staticStateRef, $hydratedStateRef} = useNuxtApp();

    const route = useRoute();
    const {serialize} = buildSSRSearchParameterSerializer();

    const newURL = new URL(route.fullPath, 'http://localhost:3000');
    const newRoute = serialize(parametersManager.state.parameters, newURL);
    const urlParams = newRoute.split(route.path)[1];
    const direction = urlParams.length > 0 ? urlParams : route.path;

    await navigateTo(direction);
}