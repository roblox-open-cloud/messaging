import { request } from "#lib/util/request";

export class MessagingService {
    private readonly _apiKey: string;
    private readonly _universeId: number;

    /**
     * @param key The API key for using Roblox OpenCloud.
     * @param universe The univese id that you want to publish messages to.
     */
    constructor(key: string, universe: number) {
        this._apiKey = key;
        this._universeId = universe;
    }

    /**
     * Publish a message through messaging service to the universe provided.
     * @param {string} topic The topic that you are pushing a message for. This can be up to 80 characters.
     * @param {*} message The message content that you would like to be pushed. This can be up to 1024 characters.
     */
    public async publish(topic: string, message: any) {
        if (topic.length > 80)
            throw new Error('Topics can only be 80 characters long.');

        if (topic.length > 1024)
            throw new Error('Messages can only be 1024 characters long.');
        
        if (typeof message === 'object')
            message = JSON.stringify(message);

        const path = new URL(`/messaging-service/v1/universes/${this._universeId}/topics/${topic}`, `https://apis.roblox.com`);

        const response = await request(path, {
            method: 'POST',
            headers: {
                'x-api-key': this._apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        }, false).then(() => true).catch(() => false);

        return response;
    }
}