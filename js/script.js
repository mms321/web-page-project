fetch('js/sample.json')
    .then(response => response.json())
    .then(jsonData => {
        const outputField = document.getElementById('outputField');
        outputField.innerHTML = ''; // Очищення перед виведенням

        const groupedData = {};

        // Групування даних за авто, моделями та роками
        Object.keys(jsonData).forEach(key => {
            const [auto, model, year, photo] = key.split('/');
            if (!groupedData[auto]) {
                groupedData[auto] = {};
            }
            if (!groupedData[auto][model]) {
                groupedData[auto][model] = {};
            }
            if (!groupedData[auto][model][year]) {
                groupedData[auto][model][year] = [];
            }
            groupedData[auto][model][year].push({ photo, imageUrl: jsonData[key] });
        });

        // Створення списку
        Object.keys(groupedData).forEach(auto => {
            const autoSection = document.createElement('div');
            autoSection.classList.add('auto-section');

            const autoHeader = document.createElement('h3');
            autoHeader.textContent = auto;
            autoHeader.classList.add('auto-header');
            autoHeader.addEventListener('click', function () {
                const content = this.nextElementSibling;
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            });

            const autoContent = document.createElement('div');
            autoContent.classList.add('auto-content');
            autoContent.style.display = 'none';

            Object.keys(groupedData[auto]).forEach(model => {
                const modelSection = document.createElement('div');
                modelSection.classList.add('model-section');

                const modelHeader = document.createElement('h4');
                modelHeader.textContent = model;
                modelHeader.classList.add('model-header');
                modelHeader.addEventListener('click', function () {
                    const content = this.nextElementSibling;
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                });

                const modelContent = document.createElement('div');
                modelContent.classList.add('model-content');
                modelContent.style.display = 'none';

                Object.keys(groupedData[auto][model]).forEach(year => {
                    const yearSection = document.createElement('div');
                    yearSection.classList.add('year-section');

                    const yearHeader = document.createElement('h5');
                    yearHeader.textContent = year;
                    yearHeader.classList.add('year-header');
                    yearHeader.addEventListener('click', function () {
                        const content = this.nextElementSibling;
                        content.style.display = content.style.display === 'none' ? 'block' : 'none';
                    });

                    const yearContent = document.createElement('div');
                    yearContent.classList.add('year-content');
                    yearContent.style.display = 'none';

                    groupedData[auto][model][year].forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');
                        itemDiv.innerHTML = `
                            <img src="${item.imageUrl}" alt="${model}" style="max-width: 100%; height: auto;">
                        `;
                        yearContent.appendChild(itemDiv);
                    });

                    yearSection.appendChild(yearHeader);
                    yearSection.appendChild(yearContent);
                    modelContent.appendChild(yearSection);
                });

                modelSection.appendChild(modelHeader);
                modelSection.appendChild(modelContent);
                autoContent.appendChild(modelSection);
            });

            autoSection.appendChild(autoHeader);
            autoSection.appendChild(autoContent);
            outputField.appendChild(autoSection);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));