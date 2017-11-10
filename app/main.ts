namespace app {
    export interface IGlobalParams {
        API: string;
        unprotected_states: string[];
        protected_states: {
            operator: string,
            roles: string[]
        }[];
    }
}