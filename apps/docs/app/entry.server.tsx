import { PassThrough } from 'node:stream'

import { createReadableStreamFromReadable } from '@react-router/node'
import { ServerRouter } from 'react-router'
import { renderToPipeableStream } from 'react-dom/server'

import type { AppLoadContext, EntryContext } from 'react-router'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  return new Promise<Response>((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error) {
          reject(error)
        },
        onError(error) {
          responseStatusCode = 500
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, 5000)
  })
}
