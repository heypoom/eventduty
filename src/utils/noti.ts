import Noty from 'noty'

import 'noty/lib/noty.css'

export function notify(text: string, options?: Noty.Options) {
  const n = new Noty({
    text,
    layout: 'topRight',
    timeout: 1200,
    progressBar: true,
    ...options,
  })

  n.show()

  return n
}

export function success(text: string) {
  return notify(text, {type: 'success'})
}

export function info(text: string) {
  return notify(text, {type: 'info'})
}
