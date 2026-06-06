const LATENCY_MIN = 600;
const LATENCY_MAX = 800;

/** Network-like latency so skeletons and optimistic updates are observable. */
export const delay = () => {
  const ms = LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN);
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};
