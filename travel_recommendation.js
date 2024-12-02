const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function searchPlan() {
    const inputSearch = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response =>response.json())
        .then(data => {
            const beaches = data.beaches.filter(item => item.name.toLowerCase().includes(inputSearch));
            const temples = data.temples.filter(item => item.name.toLowerCase().includes(inputSearch));

            let cityResult = '';
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(inputSearch)) {
                        cityResult += `
                            <div class="leftContent">
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <div class="info">
                                    <h2>${city.name}</h2>
                                    <p>${city.description}</p>
                                    <button class="btnVisit">Visit</button>
                                </div>
                            </div>`;
                    }
                });
            });

            if (inputSearch.includes('countr')) {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        resultDiv.innerHTML += `
                            <div class="leftContent">
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <div class="info">
                                    <h2>${city.name}</h2>
                                    <p>${city.description}</p>
                                    <button class="btnVisit">Visit</button>
                                </div>
                            </div>`;
                    });
                });
            } else if (inputSearch.includes('beach')) {
                data.beaches.forEach(beach => {
                    resultDiv.innerHTML += `
                        <div class="leftContent">
                            <img src="${beach.imageUrl}" alt="${beach.name}">
                            <div class="info">
                                <h2>${beach.name}</h2>
                                <p>${beach.description}</p>
                                <button class="btnVisit">Visit</button>
                            </div>
                        </div>`;
                });
            } else if (beaches.length > 0) {
                beaches.forEach(beach => {
                    resultDiv.innerHTML += `
                        <div class="leftContent">
                            <img src="${beach.imageUrl}" alt="${beach.name}">
                            <div class="info">
                                <h2>${beach.name}</h2>
                                <p>${beach.description}</p>
                                <button class="btnVisit">Visit</button>
                            </div>
                        </div>`;
                });
            } else if (inputSearch.includes('templ')) {
                data.temples.forEach(temple => {
                    resultDiv.innerHTML += `
                        <div class="leftContent">
                            <img src="${temple.imageUrl}" alt="${temple.name}">
                            <div class="info">
                                <h2>${temple.name}</h2>
                                <p>${temple.description}</p>
                                <button class="btnVisit">Visit</button>
                            </div>
                        </div>`;
                });
            } else if (temples.length > 0) {
                temples.forEach(temple => {
                    resultDiv.innerHTML += `
                        <div class="leftContent">
                            <img src="${temple.imageUrl}" alt="${temple.name}">
                            <div class="info">
                                <h2>${temple.name}</h2>
                                <p>${temple.description}</p>
                                <button class="btnVisit">Visit</button>
                            </div>
                        </div>`;
                });
            } else if (cityResult !== '') {
                resultDiv.innerHTML += cityResult;
            } else {
                resultDiv.innerHTML = '<div class="leftContent info"><h2>Please enter a valid search term</h2></div>';
            }
        })
                
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<div class="leftContent info"><h2>An error occurred while fetching data</h2></div>';
        });
}

btnSearch.addEventListener('click', searchPlan);

function resetAll() {
    const resultDiv = document.getElementById('result');
    const inputSearch = document.getElementById('destinationInput');
    resultDiv.innerHTML = '';
    inputSearch.value = '';
}

btnReset.addEventListener('click', resetAll);