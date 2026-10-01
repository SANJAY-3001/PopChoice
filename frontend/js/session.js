export function saveSession(data) {
    sessionStorage.setItem("movieSession" , JSON.stringify(data))
}

export function getSession() {
    const data = sessionStorage.getItem("movieSession")

    if (!data) return null

    return JSON.parse(data)
}

export function clearSession() {
    sessionStorage.removeItem("movieSession")
}

