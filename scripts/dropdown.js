document.addEventListener('DOMContentLoaded', function () {
    let selectedOptions = [];

    for (let i = 1; i <= 3; i++) {
        const arrowTurn = document.getElementById(`buttondropDown-${i}`);
        arrowTurn.addEventListener('click', function (event) {
            dropToggle(event, i);
        });
    }

    function dropToggle(event, index) {
        const dropdownSearch = document.getElementById(`dropDownSearchbar-${index}`);
        const arrowTurn = document.getElementById(`buttondropDown-${index}`);
        const dropdown = document.getElementById(`dropdown-${index}`);
        let dropdownSearchInput = document.querySelector(`#dropDownSearchbar-${index} .dropdownSearchInput`);
        const crossDropdown = document.getElementById(`crossdropDown-${index}`);
        const glassDropdown = document.getElementById(`glassdropDown-${index}`);
        const dropdownUl = document.getElementById(`dropDownUl-${index}`);
        const spanError = document.querySelector(`#dropDownSearchbar-${index} .spanError`);
        const isOpen = dropdownSearch.classList.contains('open');


        closeAllDropdowns();

        if (!isOpen) {
            openDropdown();
            arrowTurn.classList.add('open');
            arrowTurn.classList.remove('close');


        } else {
            closeDropdown();
            arrowTurn.classList.remove('open');
            arrowTurn.classList.add('close');
            spanError.style.display = 'none';
        }

        function closeAllDropdowns() {
            for (let i = 1; i <= 3; i++) {
                const otherDropdownSearch = document.getElementById(`dropDownSearchbar-${i}`);
                const otherArrowTurn = document.getElementById(`buttondropDown-${i}`);
                const otherDropdownUl = document.getElementById(`dropDownUl-${i}`);
                const otherDropdownSearchInput = document.querySelector(`#dropDownSearchbar-${i} .dropdownSearchInput`);
                const otherDropdownSearchInput1 = document.querySelector(`#dropDownSearchbar-${i}`);
                const otherDropdownCross = document.getElementById(`crossdropDown-${i}`);
                const otherglassdropDown = document.getElementById(`glassdropDown-${i}`);
                const errorInputDropdown = document.querySelector(`#dropdown-${index} .dropdownSearchInputerror`);
                const errorDivmessage = document.querySelector(`#dropdown-${index} .error-message`)
                const spanError = document.querySelector(`#dropDownSearchbar-${i} .spanError`);

                spanError.style.display = 'none';
                otherDropdownSearch.classList.remove('open');
                otherArrowTurn.classList.remove('open');
                otherDropdownUl.style.display = 'none';
                otherDropdownSearchInput.style.display = 'none';
                otherDropdownCross.style.display = 'none';
                otherglassdropDown.style.display = 'none';

            }
        }

        function openDropdown() {
            dropdownSearch.classList.add('open');
            const dropdownItems = dropdownUl.querySelectorAll('.dropdown-item');

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

        function closeDropdown() {
            dropdownSearch.classList.remove('open');
            dropdownUl.style.display = 'none';
            dropdownSearchInput.style.display = 'none';
            dropdownSearch.style.display = 'none';
            crossDropdown.style.display = 'none';
            glassDropdown.style.display = 'none';
            glassDropdown.classList.remove('open');
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
                let userInput = dropdownSearchInput.value.toLowerCase();
                console.log(userInput);
                wordsSort(index);
                event.preventDefault();
            });

            searchBtn.addEventListener('keydown', function (event) {
                if (event.code === 'Enter') {
                    let userInput = dropdownSearchInput.value.toLowerCase();
                    console.log(userInput);
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
                const letter = dropdownSearchInput.value.toLowerCase();
                const dropdownItems = dropdownUl.querySelectorAll('.dropdown-item');

                dropdownItems.forEach(item => {
                    const itemText = item.textContent.toLowerCase();
                    if (itemText.startsWith(letter)) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        }
    }
});
