const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export function getApiBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  const currentUrl = new URL(window.location.href);
  return `${currentUrl.protocol}//${currentUrl.hostname}:8000/api`;
}

export function normalizeList(response, key) {
  if (!response) {
    return [];
  }

  if (Array.isArray(response)) {
    return response;
  }

  if (key && Array.isArray(response[key])) {
    return response[key];
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.results)) {
    return response.results;
  }

  if (Array.isArray(response.items)) {
    return response.items;
  }

  const knownLists = ['users', 'teams', 'activities', 'workouts'];
  for (const field of knownLists) {
    if (Array.isArray(response[field])) {
      return response[field];
    }
  }

  return [];
}

export async function fetchResource(path, listKey) {
  const url = `${getApiBaseUrl()}/${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }

  const json = await response.json();
  return {
    json,
    list: normalizeList(json, listKey),
  };
}

export function getCodespaceName() {
  return codespaceName;
}
