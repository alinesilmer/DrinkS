// Stand-in for the network while there is no backend: a short delay and a copy of the data,
// so callers can never mutate the mock source by accident.
const MOCK_LATENCY_MS = 120;

export const respond = <T>(data: T, latency = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), latency));
