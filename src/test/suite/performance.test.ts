import * as m365Endpoints from './microsoft365-worldwide.json';

suite('Performance Test Suite', () => {
    const flattenUrls: string[] = [];
    for (const endpoint of m365Endpoints) {
        if (!endpoint.urls) {
            continue;
        }
        for (const url of endpoint.urls) {
            flattenUrls.push(url);
        }
    }
});
