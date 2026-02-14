import type { IAuthState, IAuthData } from "../types";

export const authState = $state<IAuthState>({
    user: undefined
});

export function logIn({ user }: IAuthData) {
    authState.user = user
}

export function logOut() {
    authState.user = undefined
}