document.addEventListener('DOMContentLoaded', () => {
    let inputs = document.querySelector('.input');
    let input = document.querySelector('#input');
    let container = document.querySelector('.container');
    let arr = [];
    let leftCount = document.querySelector('#left-count');
    let dyna;
    // Load items from localStorage on page load
    function loadItems() {
        const savedItems = JSON.parse(localStorage.getItem('items')) || [];
        arr = []; // Clear the array before loading new items
        savedItems.forEach(item => {
            let dynamicLi = document.createElement('div');
            dynamicLi.classList = item.completed ? 'li yes' : 'li';
            dynamicLi.innerHTML = `
                <div class="circle">
                    <div class="round">
                        <img class="round-img ${item.completed ? '' : 'none'}" src="assets/images/icon-check.svg" alt="">
                    </div>
                </div>
                <div class="text">
                    <span class="text-li ${item.completed ? 'line-through-for-dark' : ''}">${item.text}</span>
                    <div class="deleteIcon none">
                        <img src="assets/images/icon-cross.svg" alt="">
                    </div>
                </div>
            `;
            container.classList.remove('none');
            container.prepend(dynamicLi);
            arr.push(dynamicLi);
            console.log(dyna,'==============dyna')
        });
        updateLeftCount(); // Update count after loading items
    }
    
    loadItems(); // Call the function to load items from localStorage

    function updateLeftCount() {
        leftCount.innerText = arr.filter(li => !li.classList.contains('yes')).length;
    }

    input.addEventListener('keydown', (event) => {
        let inputValue = input.value.trim().slice(0, 1).toUpperCase() + input.value.trim().slice(1).toLowerCase();
        if (event.key === 'Enter' && inputValue !== '') {
            let dynamicLi = document.createElement('div');
            dynamicLi.classList = 'li';
            dynamicLi.innerHTML = `
                <div class="circle">
                    <div class="round">
                        <img class="round-img none" src="assets/images/icon-check.svg" alt="">
                    </div>
                </div>
                <div class="text">
                    <span class="text-li">${inputValue}</span>
                    <div class="deleteIcon none">
                        <img src="assets/images/icon-cross.svg" alt="">
                    </div>
                </div>
            `;
            container.classList.remove('none');
            container.prepend(dynamicLi);
            input.value = '';
            arr.push(dynamicLi);
            updateLeftCount(); // Update count

            // Save new item to localStorage
            saveItems();
dyna = dynamicLi
            // Adding event listeners to the newly added item
            adding(dynamicLi.querySelector('.round')  ,dynamicLi.querySelector('.text'), dynamicLi.querySelector('.text-li'), dynamicLi.querySelector('.round-img'), dynamicLi.querySelector('.round'), dynamicLi, leftCount);
        }
    });
let rounds;
    // Event delegation for the text click event
    container.addEventListener('click', (event) => {
        if (event.target && event.target.closest('.text')) {
            let textLi = event.target.closest('.text').querySelector('.text-li');
            let dynamicLi = event.target.closest('.li');
            let roundImg = dynamicLi.querySelector('.round-img');
            let round = dynamicLi.querySelector('.round');
// rounds = round
            textLi.classList.add('line-through-for-dark');
            dynamicLi.classList.add('yes');
            roundImg.classList.remove('none');
            round.classList.add('round-click');
            updateLeftCount();
            arr = arr.filter(item => item !== dynamicLi);


            // Save updated item state to localStorage
            saveItems();
        }
    });

console.log(dyna,'========================dyna')
    function adding(text, textLi, roundImg, round, dynamicLi, leftCount) {
        text.addEventListener('click', () => {
            textLi.classList.add('line-through-for-dark');
            dynamicLi.classList.add('yes');
            roundImg.classList.remove('none');
            round.classList.add('round-click');
            updateLeftCount();
            arr = arr.filter(item => item !== dynamicLi);

            // Save updated item state to localStorage
            saveItems();

        });
    }

    function saveItems() {
        const items = Array.from(document.querySelectorAll('.li')).map(li => {
            return {
                text: li.querySelector('.text-li').innerText,
                completed: li.classList.contains('yes')
            };
        });
        localStorage.setItem('items', JSON.stringify(items));
    }

    let lightMode = document.querySelector('.light-sun');
    let darkMode = document.querySelector('.dark-moon');
    let body = document.querySelector('.body');
    let imgDark = document.querySelector('.hero-dark-img');
    // let round = document.querySelector('.round');
    let imglight = document.querySelector('.hero-light-img');
    let inputLight = document.querySelector('.input-light');
    let inputDark = document.querySelector('.input-dark');


    lightMode.addEventListener('click', () => {
        body.classList.remove('dark-body');
        body.classList.add('light-body');
        lightMode.classList.add('none');
        darkMode.classList.remove('none');
        imglight.classList.remove('none');
        imgDark.classList.add('none');
        inputs.classList.remove('input-dark');
        inputs.classList.add('input-light');
        input.classList.add('color-light');
        input.classList.remove('color-dark');
        // round.style.borderColor = 'var(--Light-Grayish-Blue)';
        container.classList.remove('dark-container');
        container.classList.add('light-container');
        container.classList.remove('color-light')
        container.classList.add('color-dark');
        // li.style.borderColor = 'var(--Light-Grayish-Blue)'
        
    });
    
    darkMode.addEventListener('click', () => {        
        body.classList.add('dark-body');
        body.classList.remove('light-body');
        lightMode.classList.remove('none');
        darkMode.classList.add('none');
        imglight.classList.add('none');
        imgDark.classList.remove('none');
        inputs.classList.add('input-dark')
        inputs.classList.remove('input-light')
        input.classList.remove('color-light')
        // round.style.borderColor = 'var(--round-border-light)'
        input.classList.add('color-dark')
        container.classList.remove('light-container');
        container.classList.add('dark-container');
        container.classList.add('color-light')
        container.classList.remove('color-dark')
    });

    let all = document.querySelector('.all');
    let actives = document.querySelector('.actives');
    let completed = document.querySelector('.completed');
    let clearCompleted = document.querySelector('.clear-completed');

    all.addEventListener('click', () => {
        all.classList.add('active');
        actives.classList.remove('active');
        completed.classList.remove('active');
        clearCompleted.classList.remove('active');
        document.querySelectorAll('.li').forEach(li => {
            li.classList.remove('none');
        });
    });

    actives.addEventListener('click', () => {
        all.classList.remove('active');
        actives.classList.add('active');
        completed.classList.remove('active');
        clearCompleted.classList.remove('active');
        document.querySelectorAll('.li').forEach(li => {
            if (li.classList.contains('yes')) {
                li.classList.add('none');
            } else {
                li.classList.remove('none');
            }
        });
    });

    clearCompleted.addEventListener('click', () => {
        all.classList.remove('active');
        actives.classList.remove('active');
        completed.classList.remove('active');
        document.querySelectorAll('.li').forEach(li => {
            if (li.classList.contains('yes')) {
                li.remove(); // Remove completed items from the DOM
            }
        });
        saveItems(); // Save updated state after clearing completed items
        updateLeftCount(); // Update count after clearing completed items
    });

    completed.addEventListener('click', () => {
        all.classList.remove('active');
        actives.classList.remove('active');
        clearCompleted.classList.remove('active');
        completed.classList.add('active');
        document.querySelectorAll('.li').forEach(li => {
            if (li.classList.contains('yes')) {
                li.classList.remove('none');
            } else {
                li.classList.add('none');
            }
        });
    });
});
