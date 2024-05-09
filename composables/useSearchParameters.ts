import {buildSSRSearchParameterSerializer} from "@coveo/headless/ssr";

export const useSearchParameters = () => {
    const route = useRoute();
    const {toSearchParameters} = buildSSRSearchParameterSerializer();
    return toSearchParameters(route.query as any);
}