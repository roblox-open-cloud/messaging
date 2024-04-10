/**
 * Request fucntion.
 * @param url The URL that you are fetching from.
 * @param parameters The parameters for the request.
 * @param json Whether or not to automatically return the response object.
 */
export async function request<T extends Object>(url: URL, parameters: RequestInit, json: boolean = true) {
    const response = await fetch(url, parameters);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    if (!json) {
        return response;
    }

    return await response.json() as T;
}