

const btnConsulta = document.getElementById('btnConsulta');
const cardsContainer = document.getElementById('cardsContainer');
const URLAPI = 'https://api.mercadolibre.com'
const UrlCountries = '/sites'

btnConsulta.addEventListener('click', async function () {
    try {
        const response = await fetch(URLAPI+UrlCountries);
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta de la API.');
        }
        const data = await response.json();
        cardsContainer.innerHTML = '';

        data.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-name', country.name);
            card.setAttribute('data-id', country.id);
            card.setAttribute('data-currency', country.default_currency_id);
        
            card.addEventListener('click', clickToCard);

            const cardContent = `
                <h2>${country.name}</h2>
                <p>País ID: ${country.id}</p>
                <p>Moneda por defecto: ${country.default_currency_id}</p>
            `;
        
            card.innerHTML = cardContent;
            cardsContainer.appendChild(card);
        });

        async function clickToCard(data) {
            const id = data.currentTarget.getAttribute('data-id');
            const consultCountry = await fetch(`${URLAPI+UrlCountries}/${id}/categories`);
            const categoryList = document.getElementById('categoryList');
            
            categoryList.innerHTML = '';
            
            if (consultCountry != null) {   
                const data = await consultCountry.json();
                
                data.forEach(category => {
                    const listItem = document.createElement('li');
                    listItem.textContent = category.name;
                    categoryList.appendChild(listItem);
                });
            } else {
                const messageItem = document.createElement('li');
                messageItem.textContent = 'No se encontraron categorías.';
                categoryList.appendChild(messageItem);
            }
        }
        

    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
    }
});



