export function shuffle(array) {
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

            // And swap it with the current element.
            ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
}

import { showLoading, hideLoading } from './loader'

export async function fetchJson(url) {
    showLoading()
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (e) {
        return null
    } finally {
        hideLoading()
    }
}