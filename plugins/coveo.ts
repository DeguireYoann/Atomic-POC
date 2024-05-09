import {
    buildSSRSearchParameterSerializer, defineContext, defineFacet, defineResultList, defineSearchBox,
    defineSearchEngine,
    defineSearchParameterManager,
    type SearchParameters
} from '@coveo/headless/ssr';
import {getOrganizationEndpoints} from "@coveo/headless";
import type {CoveoSearchStaticState, reactiveState} from "~/types/coveo";

export default defineNuxtPlugin(async (nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();
    const router = useRouter();
    const {toSearchParameters, serialize} = buildSSRSearchParameterSerializer();
    const searchParameters = toSearchParameters(route.query as any);
    const contextValues = useUserContext();

    let hydratedStateRef = reactive<reactiveState>({value: undefined});
    let staticStateRef = reactive<reactiveState>({value: undefined});
    let staticState: CoveoSearchStaticState;

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
            staticStateRef.value = staticState;
        } catch (error) {
            console.error('Error fetching static state:', error);
            throw error;
        }
    };
    await getStaticState();

    const getHydratedState = async (staticState: CoveoSearchStaticState, params?: SearchParameters) => {
        try {
            hydratedStateRef.value = await engineDefinition.hydrateStaticState({
                searchAction: staticState.searchAction,
                controllers: {
                    context: {initialState: {values: staticState.controllers.context}},
                    searchParameterManager: {initialState: {parameters: params ?? staticState.controllers.searchParameterManager.state.parameters}}
                }
            });
            return hydratedStateRef;
        } catch (error) {
            console.error('Error fetching hydrated state:', error);
            throw error;
        }
    };

    watchEffect(async () => {
        if (staticStateRef.value) {
            try {
                await getHydratedState(staticState);
            } catch (error) {
                console.error(error);
            }
        }
    });

    return {
        provide: {
            engineDefinition,
            getStaticState,
            getHydratedState,
            hydratedStateRef,
            staticStateRef,
        }
    }
});
