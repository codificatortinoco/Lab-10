const homeworkInput = document.getElementById('homework-input');
const addHomeworkButton = document.getElementById('add-homework');
const pendingList = document.getElementById('pending-list');
const doingList = document.getElementById('doing-list');
const completedList = document.getElementById('completed-list');
let homeworks = [];


pendingList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const homeworkTitle = e.target.textContent;
        const homework = homeworks.find((h) => h.title === homeworkTitle);
        homework.status = 'doing';
        updateLists();
    }
});


function addHomework() {
    const homeworkTitle = homeworkInput.value
    pendingList.innerHTML +=  `<li>${homeworkTitle}</li>`
}


if (localStorage.getItem('homeworks')) {
    homeworks = JSON.parse(localStorage.getItem('homeworks'));
}

addHomeworkButton.addEventListener('click', () => {
    const homeworkTitle = homeworkInput.value.trim();
    if (homeworkTitle) {
        const homework = {
            title: homeworkTitle,
            status: 'pending'
        };
        homeworks.push(homework);
        updateLists();
        homeworkInput.value = '';


        localStorage.setItem('homeworks', JSON.stringify(homeworks));
    }
});

function updateLists() {
    pendingList.innerHTML = '';
    doingList.innerHTML = '';
    completedList.innerHTML = '';

    homeworks.forEach((homework) => {
        const listItem = document.createElement('li');
        listItem.textContent = homework.title;


        const moveForwardButton = document.createElement('button');
        moveForwardButton.textContent = '→';
        moveForwardButton.onclick = () => moveHomeworkForward(homework);

        const moveBackwardButton = document.createElement('button');
        moveBackwardButton.textContent = '←';
        moveBackwardButton.onclick = () => moveHomeworkBackward(homework);

        listItem.appendChild(moveForwardButton);
        listItem.appendChild(moveBackwardButton);

        switch (homework.status) {
            case 'pending':
                pendingList.appendChild(listItem);
                break;
            case 'doing':
                doingList.appendChild(listItem);
                break;
            case 'completed':
                completedList.appendChild(listItem);
                break;
        }
    });
}

function moveHomeworkForward(homework) {
    switch (homework.status) {
        case 'pending':
            homework.status = 'doing';
            break;
        case 'doing':
            homework.status = 'completed';
            break;
        case 'completed':
            homework.status = 'pending';
            break;
    }
    updateLists();
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
}

function moveHomeworkBackward(homework) {
    switch (homework.status) {
        case 'pending':
            homework.status = 'completed';
            break;
        case 'doing':
            homework.status = 'pending';
            break;
        case 'completed':
            homework.status = 'doing';
            break;
    }
    updateLists();
}

function updateLists() {
    pendingList.innerHTML = '';
    doingList.innerHTML = '';
    completedList.innerHTML = '';

    homeworks.forEach((homework) => {
        const listItem = document.createElement('li');
        listItem.textContent = homework.title;

        if (homework.status !== 'completed') {
            const moveForwardButton = document.createElement('button');
            moveForwardButton.textContent = '→';
            moveForwardButton.onclick = () => moveHomeworkForward(homework);
            listItem.appendChild(moveForwardButton);
        }

        if (homework.status === 'doing') {
            const moveBackwardButton = document.createElement('button');
            moveBackwardButton.textContent = '←';
            moveBackwardButton.onclick = () => moveHomeworkBackward(homework);
            listItem.appendChild(moveBackwardButton);
        }

        switch (homework.status) {
            case 'pending':
                pendingList.appendChild(listItem);
                break;
            case 'doing':
                doingList.appendChild(listItem);
                break;
            case 'completed':
                completedList.appendChild(listItem);
                break;
        }
    });
}
const deleteAllButton = document.getElementById('delete-all');

deleteAllButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all tasks?')) {
        homeworks = [];
        updateLists();
        localStorage.removeItem('homeworks');
    }
});