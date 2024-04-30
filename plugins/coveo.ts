import {defineSearchEngine} from '@coveo/headless/ssr';
import {
    buildSSRSearchParameterSerializer,
    defineContext,
    defineFacet,
    defineResultList,
    defineSearchBox,
    defineSearchParameterManager
} from '@coveo/headless/ssr';
import {getOrganizationEndpoints} from "@coveo/headless";

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();

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

    return {
        provide: {
            engineDefinition,
        }
    }
});
