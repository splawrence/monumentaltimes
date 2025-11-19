import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'D:/Apps/git/monumentaltimes/tina/__generated__/.cache/1763529206678', url: 'http://localhost:4001/graphql', token: 'null', queries,  });
export default client;
  