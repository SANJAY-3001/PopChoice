export default function buildMoviePrompt(preferences , movies) {
    const movieContext = movies.map((movie , index) => {
        return `
        Movie ${index + 1} : ${movie.content}
        Similarity : ${movie.similarity}
        `
    }).join("\n")

    return `
    You are a movie recommendation assistant.

    The user wants movie recommendations based on the preferences below.

    USER PREFERENCES:
    ${JSON.stringify(preferences, null, 2)}

    MOVIES RETRIEVED FROM THE MOVIE DATABASE:
    ${movieContext}

    TASK:

    Recommend movies only from the provided movie database context.

    Consider:
    - Genre
    - Language
    - Mood
    - Available time
    - Preferences of all people

    Do not invent movies.

    Return exactly 5 recommendations.

    For every recommendation provide:
    - title
    - reason
    - language
    - duration
    - rating
    `
}