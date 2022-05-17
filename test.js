/**
 * Makes a request to https://restcountries.com/v3.1/name/{query} and displays a table with the results.
 * @param {string} query The user’s search query
 * @param {HTMLElement} container The <tbody> element that the result will be printed to
 */

    // när sidan laddas in
window.addEventListener('load', init); 

function init() {
  document.querySelector('#spinner').classList.add('d-none');
  document.querySelector('#find-uni').addEventListener('submit', search);


}
 // Sökfunktionen
function search(e) {
  e.preventDefault();
  document.querySelector('#content').innerHTML = null;  // tömmer diven med sökinnehållet eller felmedelandet när en nysökning genomförsts. 
  hittaUni(document.querySelector('#search').value, document.querySelector('#content'));
  document.querySelector('#spinner').classList.remove('d-none');


}


function hittaUni(query) {
    window.fetch('http://universities.hipolabs.com/search?country=' + encodeURIComponent(query))
     .then(function(response){
         console.log(response);
         return response.json();
     }).then(function(data){
         console.log(data);
         let main = document.querySelector('#content');
          
        var i = 0;

            //Skapar korten för varje Univerisitet
        for(uniData of data) { //skapar for lopen som kör genom all data i API:et. 
        document.querySelector('#spinner').classList.add('d-none'); // tar bort spinnern

        let card = document.createElement('div'); //skapar kortet
        card.setAttribute('id', 'text1');
        card.className = 'card';
        card.style.maxWidth='90%';
        main.appendChild(card); 

        let cardBody = document.createElement('div'); //skapar bodyn i kortet
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        let namn = document.createElement('h5'); //skapar rubriken
        namn.classList.add('card-title');
        namn.textContent = uniData.name;
        cardBody.appendChild(namn);

        let link = document.createElement('a'); //skapar knappen med länken till respektive Univeristet. 
        link.className = 'btn btn-primary';
        link.textContent = 'Visit their website!';
        link.setAttribute('href', uniData.web_pages);
        link.setAttribute('id', 'knapp2');
        cardBody.appendChild(link); 

            //adderar i varje gång ett kort skapas
        i++;
        }
            //Ifall inget Uni hittades från sökningen
        if (i<1){
            document.querySelector('#spinner').classList.add('d-none');

            let body = document.querySelector('#content');
            let fel = document.createElement('h3');
            fel.textContent = 'Check your spelling!';
            body.appendChild(fel);
        }

    });


}

