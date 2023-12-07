import { EnvType } from 'ts-dotenv';
type Env = EnvType<typeof schema>;
export declare const schema: {
    DB_IP: StringConstructor;
    PORT: NumberConstructor;
    TOKEN_SECRET: StringConstructor;
};
declare let env: Env;
export { env };
