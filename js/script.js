fetch('js/image_sources.json')
    .then(response => response.json())
    .then(jsonData => {
        const outputField = document.getElementById('outputField');
        const galleryField = document.getElementById('galleryField');

        // Очищення полів
        outputField.innerHTML = '<h2>Car List</h2>';
        galleryField.innerHTML = '<h2>Gallery</h2>';

        const groupedData = {};

        // Групування даних
        for (const key in jsonData) {
            const [brand, model, year] = key.split('/');
            groupedData[brand] ??= {};
            groupedData[brand][model] ??= {};
            groupedData[brand][model][year] ??= [];
            groupedData[brand][model][year].push(jsonData[key]);
        }

        // Відображення списку
        for (const brand in groupedData) {
            const brandButton = createButton(brand, 'brand-button');
            const modelList = document.createElement('div');
            modelList.classList.add('model-list');
            modelList.style.display = 'none';

            brandButton.addEventListener('click', () => {
                modelList.style.display = modelList.style.display === 'none' ? 'block' : 'none';
            });

            for (const model in groupedData[brand]) {
                const modelButton = createButton(model, 'model-button');
                const yearList = document.createElement('div');
                yearList.classList.add('year-list');
                yearList.style.display = 'none';

                modelButton.addEventListener('click', () => {
                    yearList.style.display = yearList.style.display === 'none' ? 'block' : 'none';
                });

                for (const year in groupedData[brand][model]) {
                    const yearButton = createButton(year, 'year-button');
                    yearButton.addEventListener('click', () => {
                        // Оновлення галереї
                        galleryField.innerHTML = `<h2>${brand} ${model} ${year} Gallery</h2>`;
                        groupedData[brand][model][year] = groupedData[brand][model][year].filter(imageUrl => {
                            const img = new Image();
                            img.src = imageUrl;
                            return img.width !== 1 || img.height !== 1;
                        });
                        galleryField.innerHTML += groupedData[brand][model][year]
                            .map(imageUrl => `<img src="${imageUrl}" alt="${brand} ${model} ${year}" style="max-width: 200px; margin: 10px;">`)
                            .join('');
                    });
                    yearList.appendChild(yearButton);
                }

                modelList.appendChild(modelButton);
                modelList.appendChild(yearList);
            }

            outputField.appendChild(brandButton);
            outputField.appendChild(modelList);
        }
    })
    .catch(error => console.error('Error loading JSON:', error));

/**
 * Функція для створення кнопки
 * @param {string} text - Текст кнопки
 * @param {string} className - Клас кнопки
 * @returns {HTMLElement} - Елемент кнопки
 */
function createButton(text, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    return button;
}