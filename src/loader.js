// Simple global loader with reference counting and subscription API
let counter = 0
const subs = new Set()

function notify() {
  const state = counter > 0
  subs.forEach((fn) => {
    try {
      fn(state)
    } catch (e) {
      // ignore subscriber errors
    }
  })
}

export function showLoading() {
  counter = counter + 1
  notify()
}

export function hideLoading() {
  counter = Math.max(0, counter - 1)
  notify()
}

export function subscribeLoading(fn) {
  subs.add(fn)
  // immediately call with current state
  try {
    fn(counter > 0)
  } catch (e) {}
  return () => subs.delete(fn)
}

export function isLoading() {
  return counter > 0
}
