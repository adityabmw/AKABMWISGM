// ============================================================
// AKA BMW ISGM — PERFORMANCE UTILITIES
// Sprint 2-3: Debounce, Throttle, Memoization, Caching
// ============================================================

// ============================================================
// 1. DEBOUNCE
// ============================================================
export function debounce(fn, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ============================================================
// 2. THROTTLE
// ============================================================
export function throttle(fn, limit = 300) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================================
// 3. MEMOIZATION
// ============================================================
export function memoize(fn, ttl = 60000) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    const result = fn.apply(this, args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };
}

// ============================================================
// 4. CACHE MANAGER
// ============================================================
export class CacheManager {
  constructor(maxSize = 100, ttl = 60000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }

  clear() {
    this.cache.clear();
  }

  remove(key) {
    this.cache.delete(key);
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl
    };
  }
}

// ============================================================
// 5. PERFORMANCE MONITOR
// ============================================================
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.startTime = Date.now();
  }

  start(label) {
    this.metrics[label] = { start: performance.now(), end: null, duration: null };
  }

  end(label) {
    const metric = this.metrics[label];
    if (metric) {
      metric.end = performance.now();
      metric.duration = metric.end - metric.start;
    }
  }

  getMetric(label) {
    return this.metrics[label] || null;
  }

  getAllMetrics() {
    return this.metrics;
  }

  getAverageDuration() {
    const durations = Object.values(this.metrics)
      .filter(m => m.duration !== null)
      .map(m => m.duration);
    
    if (durations.length === 0) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  clear() {
    this.metrics = {};
  }
}

// ============================================================
// 6. LAZY LOADER
// ============================================================
export class LazyLoader {
  constructor() {
    this.loaded = new Set();
    this.loading = new Set();
  }

  async load(moduleName, importFn) {
    if (this.loaded.has(moduleName)) {
      return;
    }

    if (this.loading.has(moduleName)) {
      return new Promise((resolve) => {
        const check = () => {
          if (this.loaded.has(moduleName)) {
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    }

    this.loading.add(moduleName);
    try {
      await importFn();
      this.loaded.add(moduleName);
    } finally {
      this.loading.delete(moduleName);
    }
  }

  isLoaded(moduleName) {
    return this.loaded.has(moduleName);
  }

  isLoading(moduleName) {
    return this.loading.has(moduleName);
  }
}

// ============================================================
// 7. EXPORT SINGLETON INSTANCES
// ============================================================
export const cacheManager = new CacheManager();
export const performanceMonitor = new PerformanceMonitor();
export const lazyLoader = new LazyLoader();