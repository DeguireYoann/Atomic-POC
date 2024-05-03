import {
    buildSSRSearchParameterSerializer, defineContext, defineFacet, defineResultList, defineSearchBox,
    defineSearchEngine,
    defineSearchParameterManager,
    type SearchParameters
} from '@coveo/headless/ssr';
import {getOrganizationEndpoints} from "@coveo/headless";
import type {CoveoSearchHydratedState, CoveoSearchStaticState} from "~/types/coveo";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();
    const {toSearchParameters, serialize} = buildSSRSearchParameterSerializer();
    const searchParameters = toSearchParameters(route.query as any);
    const contextValues = useUserContext();
    let hydratedState = reactive<CoveoSearchHydratedState | undefined>(undefined);
    let staticState = reactive<CoveoSearchStaticState | undefined>(undefined);
    // Configuration du SearchEngine
    const config = {
        configuration: {
            accessToken: runtimeConfig.public.COVEO_API,
            organizationId: runtimeConfig.public.COVEO_PROJECT_NAME,
            organizationEndpoints: getOrganizationEndpoints(runtimeConfig.public.COVEO_PROJECT_NAME),
            analytics: {enabled: false},
        },
        controllers: {
            context: defineContext(),
            searchBox: defineSearchBox(),
            resultList: defineResultList({options: {fieldsToInclude: ["ec_images"]}}),
            sourceFacet: defineFacet({options: {field: 'Source'}}),
            qualityFacet: defineFacet({options: {field: 'ec_quality'}}),
            sensorFacet: defineFacet({options: {field: 'ec_sensor'}}),
            searchParameterManager: defineSearchParameterManager(),
        },
    }

    // Définition du SearchEngine
    const engineDefinition = defineSearchEngine(config);

    const getStaticState = async () => {
        try {
            staticState = await engineDefinition.fetchStaticState({
                controllers: {
                    context: {initialState: {values: contextValues}},
                    searchParameterManager: {initialState: {parameters: searchParameters}}
                }
            })
            return staticState;
        } catch (error) {
            console.error('Error fetching static state:', error);
            throw error;
        }
    };

    const getHydratedState = async (staticState: CoveoSearchStaticState, params?: any) => {
        try {
            hydratedState = await engineDefinition.hydrateStaticState({
                searchAction: staticState.searchAction,
                controllers: {
                    context: {initialState: {values: staticState.controllers.context}},
                    searchParameterManager: {initialState: {parameters: params ?? staticState.controllers.searchParameterManager}}
                }
            });
            return hydratedState;
        } catch (error) {
            console.error('Error fetching hydrated state:', error);
            throw error;
        }
    };

    const refreshState = (parameters: SearchParameters) => {
        const newURL = new URL(route.fullPath, 'http://localhost:3000');
        const newRoute = serialize(parameters, newURL);
        const urlParams = newRoute.split(route.path)[1];
        const direction = urlParams.length > 0 ? urlParams : route.path;
        navigateTo(direction)
    }

    return {
        provide: {
            engineDefinition,
            getStaticState,
            getHydratedState,
            hydratedState,
            staticState,
            refreshState
        }
    }
});
