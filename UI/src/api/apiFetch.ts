import { ApiError } from "../types/error";

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });

    if (!res.ok) {
        let errorData: any = null;

        try {
            errorData = await res.json(); // ✅ parse JSON
        } catch {
            // fallback if not JSON
            const text = await res.text();
            throw new Error(text || 'Request failed');
        }

        // throw structured error
        throw new ApiError(
            errorData.message || 'Request failed',
            errorData.error,
            res.status
        );
    }

    return res.json();
}
