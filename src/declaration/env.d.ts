declare global {
    namespace NodeJS {
        interface ProcessEnv {
            dbUrl: string
        }
    }
}

export { };
