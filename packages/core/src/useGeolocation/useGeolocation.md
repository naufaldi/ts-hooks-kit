Access the browser's Geolocation API reactively.

Returns the current position coordinates including `latitude`, `longitude`, `accuracy`, and other position data, along with `loading` and `error` states.

Uses `navigator.geolocation.watchPosition` to track position changes in real time. SSR-safe — returns loading state on the server.
