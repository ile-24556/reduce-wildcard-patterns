import { performance } from 'perf_hooks';
import { makeLinesFight } from '../reduce-patterns';
import * as m365Endpoints from './microsoft365-worldwide.json';


export function measure() {
    const flattenUrls: string[] = [];
    for (const endpoint of m365Endpoints) {
        if (!endpoint.urls) {
            continue;
        }
        for (const url of endpoint.urls) {
            flattenUrls.push(url);
        }
    }
    const startTime = performance.now();
    for (let i = 0; i < 10000; i++) {
        makeLinesFight(flattenUrls);
    }
    const endTime = performance.now();
    console.log(endTime - startTime);
}
