import type { User } from "@lucide/svelte";

export interface Store {
    user?: User;
    accessToken?: string
}