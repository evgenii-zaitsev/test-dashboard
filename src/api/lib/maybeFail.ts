const FAILURE_RATE = 0.1;

/** Fails ~10% of the time to exercise the error/retry state. */
export const maybeFail = (action: string) => {
  if (Math.random() < FAILURE_RATE) {
    throw new Error(`Request failed: ${action}. Please try again.`);
  }
};
