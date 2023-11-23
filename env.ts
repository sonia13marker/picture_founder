import { EnvType, load } from 'ts-dotenv';
import { resolve } from 'path';

type Env = EnvType<typeof schema>;

export const schema = {
    DB_IP: String,
    PORT: Number
};

let env: Env;

env = load(schema, {
    path: resolve(".env")
});

export { env }

