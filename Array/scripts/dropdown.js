document.addEventListener('DOMContentLoaded', function () {
    const selectedOptions = [];

    for (let i = 1; i <= 3; i++) {
        const arrowTurn = document.getElementById(`buttondropDown-${i}`);
        arrowTurn.addEventListener('click', function (event) {
            dropToggle(event, i);
        });
    }

    function dropToggle(event, index) {
        const arrowTurn = event.currentTarget;
        const dropdownSearch = document.getElementById(`dropDownSearchbar-${index}`);
        const dropdown = document.getElementById(`dropdown-${index}`);
        const dropdownSearchInput = document.querySelector(`#dropDownSearchbar-${index} .dropdownSearchInput`);
        const crossDropdown = document.getElementById(`crossdropDown-${index}`);
        const glassDropdown = document.getElementById(`glassdropDown-${index}`);
        const dropdownUl = document.getElementById(`dropDownUl-${index}`);
        const spanError = document.querySelector(`#dropDownSearchbar-${index} .spanError`);
        const isOpen = dropdownSearch.classList.contains('open');

        if (isOpen) {
            closeDropdown(index);
            return;
        }

        closeAllDropdowns();
        openDropdown(index);
        arrowTurn.classList.toggle('open');
        arrowTurn.classList.toggle('close');

        function closeAllDropdowns() {
            for (let i = 1; i <= 3; i++) {
                if (i !== index) {
                    const otherArrowTurn = document.getElementById(`buttondropDown-${i}`);
                    otherArrowTurn.classList.remove('open');
                    otherArrowTurn.classList.add('close');
                }
            }
        }

        function openDropdown(index) {
            const dropdownSearch = document.getElementById(`dropDownSearchbar-${index}`);
            const dropdownUl = document.getElementById(`dropDownUl-${index}`);
            const dropdownItems = dropdownUl.querySelectorAll('.dropdown-item');
            const dropdownSearchInput = document.querySelector(`#dropDownSearchbar-${index} .dropdownSearchInput`);
            const crossDropdown = document.getElementById(`crossdropDown-${index}`);
            const glassDropdown = document.getElementById(`glassdropDown-${index}`);
            const spanError = document.querySelector(`#dropDownSearchbar-${index} .spanError`);

            dropdownSearch.classList.add('open');

            if (dropdownItems.length > 0) {
                dropdownUl.style.display = 'flex';
                dropdownSearchInput.style.display = 'flex';
                dropdownSearch.style.display = 'flex';
                crossDropdown.style.display = 'flex';
                glassDropdown.style.display = 'flex';
                glassDropdown.classList.add('open');
                addEventListeners(index, dropdownSearchInput, crossDropdown);
            } else {
                dropdownUl.style.display = 'none';
                dropdownUl.classList.add("hidden");
                spanError.style.display = 'flex';
                dropdownSearchInput.style.display = 'flex';
                dropdownSearch.style.display = 'flex';
                crossDropdown.style.display = 'flex';
                glassDropdown.style.display = 'flex';
            }
        }

        function closeDropdown(index) {
            const dropdownSearch = document.getElementById(`dropDownSearchbar-${index}`);
            dropdownSearch.classList.remove('open');
            const arrowTurn = document.getElementById(`buttondropDown-${index}`);
            arrowTurn.classList.remove('open');
            arrowTurn.classList.add('close');
            const dropdownUl = document.getElementById(`dropDownUl-${index}`);
            dropdownUl.style.display = 'none';
            const dropdownSearchInput = document.querySelector(`#dropDownSearchbar-${index} .dropdownSearchInput`);
            dropdownSearchInput.style.display = 'none';
            dropdownSearch.style.display = 'none';
            const crossDropdown = document.getElementById(`crossdropDown-${index}`);
            crossDropdown.style.display = 'none';
            const glassDropdown = document.getElementById(`glassdropDown-${index}`);
            glassDropdown.style.display = 'none';
            glassDropdown.classList.remove('open');
            const spanError = document.querySelector(`#dropDownSearchbar-${index} .spanError`);
            spanError.style.display = 'none';
            addEventListeners(index, dropdownSearchInput, crossDropdown);
        }
    }

    function wordsSort(index = 1) {
        const inputValue = document.querySelector(`#dropDownSearchbar-${index} .dropdownSearchInput`).value.toLowerCase();
        const dropdownItems = document.querySelectorAll(`#dropDownUl-${index} .dropdown-item`);

        dropdownItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(inputValue)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    function addEventListeners(index, dropdownSearchInput, crossDropdown) {
        const dropdownUl = document.getElementById(`dropDownUl-${index}`);
        const dropdownItems = dropdownUl.querySelectorAll('.dropdown-item');
        const optionsZoneRecipe = document.querySelector('.optionZoneRecipe');

        dropdownItems.forEach(item => {
            item.addEventListener('click', function (event) {
                const clickedWord = item.textContent.trim();
                if (!selectedOptions.includes(clickedWord)) {
                    optionsZoneRecipe.style.display = "flex";

                    selectedOptions.push(clickedWord);
                    crossDropdown.addEventListener('mousedown', function (event) {
                        const clickedWord = item.textContent.trim();
                        const indexToRemove = selectedOptions.indexOf(clickedWord);
                        if (indexToRemove !== -1) {
                            selectedOptions.splice(indexToRemove, 1);
                        }

                        optionsZoneRecipe.removeChild(div);
                        event.stopPropagation();
                    });
                }
            });
        });

        const searchBtn = document.getElementById(`glassdropDown-${index}`);
        if (searchBtn && dropdownSearchInput) {
            searchBtn.addEventListener('click', function (event) {
                wordsSort(index);
                event.preventDefault();
            });

            searchBtn.addEventListener('keydown', function (event) {
                if (event.code === 'Enter') {
                    wordsSort(index);
                }
            });

            dropdownSearchInput.addEventListener('keydown', function (event) {
                if (event.code === 'Enter') {
                    wordsSort(index);
                }
            });

            crossDropdown.addEventListener('mousedown', function (event) {
                dropdownSearchInput.value = "";
                event.preventDefault();
                event.stopPropagation();
            });

            crossDropdown.addEventListener('click', function (event) {
                dropdownSearchInput.value = "";
                event.preventDefault();
                event.stopPropagation();
            });

            crossDropdown.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    dropdownSearchInput.value = "";
                    event.preventDefault();
                }
            });

            dropdownSearchInput.addEventListener('input', function () {
                const inputValue = dropdownSearchInput.value.trim();
                if (inputValue.length > 0) {
                    crossDropdown.style.visibility = 'visible';
                } else {
                    crossDropdown.style.visibility = 'hidden';
                }
            });

            dropdownSearchInput.addEventListener('input', function () {
                wordsSort(index);
            });
        }
    }
});
