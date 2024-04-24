import {
    defineSearchEngine,
} from "@coveo/headless/ssr";
import {
    type Controller,
    type ControllerDefinitionsMap,
    type SearchEngine,
    type SearchEngineDefinitionOptions,
    getSampleSearchEngineConfiguration,
    defineFacet,
    defineResultList,
    defineSearchBox,
    defineContext,
    defineSearchParameterManager,
} from '@coveo/headless/ssr';

export default defineNuxtPlugin(() => {

// Configuration du SearchEngine
    const config = {
        configuration: {
            ...getSampleSearchEngineConfiguration(),
            analytics: {enabled: false},
        },
        controllers: {
            context: defineContext(),
            searchBox: defineSearchBox(),
            resultList: defineResultList(),
            authorFacet: defineFacet({options: {field: 'Source'}}),
            searchParameterManager: defineSearchParameterManager(),
        },
    } satisfies SearchEngineDefinitionOptions<
        ControllerDefinitionsMap<SearchEngine, Controller>
    >;

// Definition du SearchEngine
    const engineDefinition = defineSearchEngine(config);

// Static State (SSR) et Hydrate State Client
    const {fetchStaticState, hydrateStaticState} = engineDefinition;

    return {
        provide: {
            engineDefinition,
        }
    }
})