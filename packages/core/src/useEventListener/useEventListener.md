Use EventListener with simplicity by React Hook.

Supports `Window`, `Element`, `Document`, and `MediaQueryList`, with almost the same parameters as the native [`addEventListener` options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#syntax).

## TypeScript

The hook is declared with **several overloads**. TypeScript picks one from:

1. **Window** — omit the element argument. `eventName` must be a key of [`WindowEventMap`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventMap); the handler receives `WindowEventMap[eventName]`.
2. **Document** — pass a ref whose `current` is `Document` (e.g. `useRef<Document>(document)`). Use keys of [`DocumentEventMap`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentEventMap) for `eventName`.
3. **HTMLElement / SVG** — pass `useRef<HTMLButtonElement>(null)` (or another element type). Use keys shared by [`HTMLElementEventMap`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElementEventMap) and [`SVGElementEventMap`](https://developer.mozilla.org/en-US/docs/Web/API/SVGElementEventMap).
4. **Media query** — pass a ref to a [`MediaQueryList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) and use `change` (see [`MediaQueryListEventMap`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event)).

If the third argument is omitted, the listener attaches to `window`. If you pass a ref, attach to `ref.current` when it is non-null; otherwise the effect falls back to `window` (see implementation).

## Custom events

If you want to use a `CustomEvent` with TypeScript, extend the right map:

- `MediaQueryListEventMap`
- `WindowEventMap`
- `HTMLElementEventMap`
- `DocumentEventMap`

Example:

```ts
declare global {
  interface DocumentEventMap {
    'my-custom-event': CustomEvent<{ exampleArg: string }>
  }
}
```
