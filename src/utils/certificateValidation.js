export const SUPPORTED_TYPES = ['pdf', 'jpg', 'jpeg', 'png'];

export function extensionOf(path = '') {
  const m = /\.([a-z0-9]+)(?:[?#].*)?$/i.exec(path);
  return m ? m[1].toLowerCase() : '';
}

export function isSupportedType(type) {
  return SUPPORTED_TYPES.includes(String(type).toLowerCase());
}

export function isImageType(type) {
  return ['jpg', 'jpeg', 'png'].includes(String(type).toLowerCase());
}

const cache = new Map();

// Same-origin existence check. A dev server / SPA host can answer 200 with index.html for
// missing files, so an HTML content type is treated as "missing". Results are cached.
export function checkFileAvailable(path, type) {
  if (!path || !isSupportedType(type) || extensionOf(path) !== String(type).toLowerCase()) {
    return Promise.resolve(false);
  }
  if (!cache.has(path)) {
    const expected = type === 'pdf' ? 'application/pdf' : 'image/';
    cache.set(
      path,
      fetch(path, { method: 'HEAD' })
        .then((res) => {
          if (!res.ok) return false;
          const ct = (res.headers.get('content-type') || '').toLowerCase();
          return !ct.includes('text/html') && (!ct || ct.includes(expected) || ct.includes('octet-stream'));
        })
        .catch(() => false)
    );
  }
  return cache.get(path);
}
