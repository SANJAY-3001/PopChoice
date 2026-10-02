

const recommendations = JSON.parse(sessionStorage.getItem("recommendations"))

const outputContent = document.getElementById("output-content")

if (!recommendations) {
    outputContent.innerHTML = `
        <p>No recommendations found.</p>
    `
}
else {
    outputContent.innerHTML = recommendations.result
}