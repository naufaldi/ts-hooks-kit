Track the browser's network connection status reactively.

Returns a `NetworkState` object including:

- `online` — whether the browser is currently online
- `effectiveType` — the estimated connection type (e.g., `4g`, `3g`)
- `downlink` — the estimated downlink speed in Mbps
- `rtt` — the estimated round-trip time in milliseconds
- `saveData` — whether the user has requested reduced data usage

Uses the Network Information API where available. SSR-safe — defaults to `online: true` on the server.
