import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

/**
 * Driven with React's own `act` + a manual root (instead of RTL's renderHook)
 * to stay compatible with React 19's removal of `react-dom/test-utils`.
 */
function renderDebounce<T>(initial: T, delay: number) {
  const container = document.createElement('div');
  let root: Root;
  let latest: T;

  const Probe = ({ value }: { value: T }) => {
    latest = useDebounce(value, delay);
    return null;
  };

  act(() => {
    root = createRoot(container);
    root.render(<Probe value={initial} />);
  });

  return {
    get value() {
      return latest;
    },
    setValue(value: T) {
      act(() => root.render(<Probe value={value} />));
    },
    unmount() {
      act(() => root.unmount());
    },
  };
}

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });
  afterEach(() => vi.useRealTimers());

  it('returns the initial value immediately', () => {
    const hook = renderDebounce('a', 300);
    expect(hook.value).toBe('a');
    hook.unmount();
  });

  it('only updates after the delay has elapsed', () => {
    const hook = renderDebounce('a', 300);

    hook.setValue('b');
    expect(hook.value).toBe('a'); // not yet

    act(() => vi.advanceTimersByTime(299));
    expect(hook.value).toBe('a'); // still waiting

    act(() => vi.advanceTimersByTime(1));
    expect(hook.value).toBe('b'); // now updated
    hook.unmount();
  });

  it('collapses rapid changes into a single trailing update', () => {
    const hook = renderDebounce('a', 300);

    hook.setValue('ab');
    act(() => vi.advanceTimersByTime(100));
    hook.setValue('abc');
    act(() => vi.advanceTimersByTime(100));
    hook.setValue('abcd');

    expect(hook.value).toBe('a'); // each change reset the timer

    act(() => vi.advanceTimersByTime(300));
    expect(hook.value).toBe('abcd');
    hook.unmount();
  });
});
