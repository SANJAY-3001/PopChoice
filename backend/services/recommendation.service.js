import generateRecommendations from "./llm.service.js";
import retrieveMovies from "./rag.service.js";


export async function recommendMovies(movieSession) {

    const {noOfPeople , availableTime , answers} = movieSession

    const searchQuery = buildSearchQuery(noOfPeople , availableTime , answers)

    const movies = await retrieveMovies(searchQuery)


    const recommendations = await generateRecommendations({noOfPeople , availableTime , answers} , movies)

    return { recommendations }

}

function buildSearchQuery(numberOfPeople , availableTime , answers) {
    const peoplePreferences = answers
        .map((person) => {

            const personAnswers = person.answers;

            return `
            Favorite Movie ${person.favoriteMovie}:
            Island Companion: ${personAnswers.islandCompanion}
            MoodAgeValue: ${personAnswers.moodAgeValue}
            MoodTypeValue: ${personAnswers.moodTypeValue}
            `;
                    })
                    .join("\n");
    
    return `
    We are choosing movies for ${numberOfPeople} people.

    Available time:
    ${availableTime} 

    Group preferences:

    ${peoplePreferences}

    Find movies that satisfy the group's preferences
    and fit within the available time.
    `

}