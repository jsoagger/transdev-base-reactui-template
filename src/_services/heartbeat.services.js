import { API_ROOT } from './utils/services.config';

export const heartbeatService = {
    pingServer
}

/**
 * Server of heartbeat, checks if remote service is reachable.
 */
async function pingServer() {
    try {
        const response = await fetch(`${API_ROOT}/transdev/base/v1/anon/ping`);
        if (!response.ok) {
            console.error("Remote backend seems to be unreachable!");
            console.error(response);
        }
        else {
            var json = response.json();
            return json;
        }
    }
    catch (error) {
        console.log(error);
    }
}
