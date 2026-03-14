Query browser permission status reactively using the Permissions API.

Pass a permission name (e.g., `'geolocation'`, `'notifications'`, `'camera'`). Returns:

- `state` — the current permission state (`'granted'`, `'denied'`, or `'prompt'`)
- `supported` — whether the Permissions API is available in the current browser

Automatically listens for permission state changes and updates reactively.
