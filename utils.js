export function delay(n) {
    return new Promise(r => setTimeout(r, n))
}
