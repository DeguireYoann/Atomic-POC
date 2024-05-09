export type CoveoSearchStaticState = InferStaticState<typeof engineDefinition>;
export type CoveoSearchHydratedState = InferHydratedState<typeof engineDefinition>;

export interface reactiveState {
    value: CoveoSearchStaticState | CoveoSearchHydratedState | undefined
}