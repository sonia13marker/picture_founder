import { EnvType, load } from 'ts-dotenv';
import { resolve } from 'path';

type Env = EnvType<typeof schema>;

export const schema = {
    EMAIL_HOST: String,
    EMAIL_PORT: Number,
    EMAIL_USER: String,
    EMAIL_PASS: String,
    FROM_SEND_EMAIL: String
};

let env: Env;

env = load(schema, {
    path: resolve(".envEmail")
});

export { env }
