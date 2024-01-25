function setup() {
    noCanvas();
    const fontSize = 18; // Font size in points

    loadJSON(
        'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=NHkNjvFfYJ9eeEBh8lUGkJnVGOuLylmW',
        gotData,
        fetchDataFailed // Callback for when the data fetch fails
    );

    function gotData(data) {
        if (data.results && data.results.length > 0) {
            let contentContainer = createDiv(); // Create a single container for all content

            data.results.forEach(article => {
                let span = createSpan();

                // Jumble the title and create a hyperlink
                let jumbledTitle = jumbleText(article.title);
                let link = createA(article.url, jumbledTitle, '_blank');
                link.parent(span);
                styleTextElement(link, fontSize, 'normal');

                // Set interval for animating jumbled title
                let titleInterval = setInterval(() => {
                    link.html(jumbleText(article.title));
                }, 500); // Change text every 500 milliseconds

                // Jumble the abstract and add it next to the title
                let jumbledAbstract = ' ' + jumbleText(article.abstract);
                let abstractSpan = createSpan(jumbledAbstract);
                abstractSpan.parent(span);
                styleTextElement(abstractSpan, fontSize, 'normal');

                // Set interval for animating jumbled abstract
                let abstractInterval = setInterval(() => {
                    abstractSpan.html(' ' + jumbleText(article.abstract));
                }, 250); // Change text every 250 milliseconds

                // Event listener to stop animation and revert to original text on mouseover
                let mouseOverHandler = () => {
                    clearInterval(titleInterval);
                    clearInterval(abstractInterval);
                    link.html(article.title);
                    link.style('font-weight', 'bold');
                    abstractSpan.html(' ' + article.abstract);
                };
                link.mouseOver(mouseOverHandler);
                abstractSpan.mouseOver(mouseOverHandler);
            });
        } else {
            console.error('No articles found');
            createP('No articles found');
        }
    }

    function fetchDataFailed(error) {
        console.error('Failure', error);
        createP('Failure');
    }
}

function draw() {
    // Any drawing or continuous execution can go here
}

// Function to jumble the text
function jumbleText(text) {
    let jumbled = text.split('').sort(() => 0.5 - Math.random()).join('');
    return jumbled;
}

// Function to style text elements
function styleTextElement(element, fontSize, fontWeight) {
    element.style('font-family', 'Courier');
    element.style('font-weight', fontWeight); 
    element.style('font-size', fontSize + 'pt');
    element.style('color', 'black');
    element.style('text-decoration', 'none');
    element.style('letter-spacing', '2px'); // Equidistant letter spacing
}
