// Nusitaikom
const allUsersEl = document.querySelector('#allUsers');
const nameAscsEl = document.querySelector('#nameAsc');
const nameDescsEl = document.querySelector('#nameDesc');
const tbodyEl = document.querySelector('tbody');
const createSuccEl = document.querySelector('#createSucc');

// AddEventListener
document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, age, hasCar, town } = e.target;
    const dummy = {
        name: name.value,
        age: age.value,
        hasCar: hasCar.checked,
        town: town.value,
    };
    createUser(dummy);
});

allUsersEl.addEventListener('click', async() => createTable(await getUsers()));
nameAscsEl.addEventListener('click', async() => await getUsersOrder('asc'));
nameDescsEl.addEventListener('click', async() => await getUsersOrder('desc'));

// Funkcijos
async function createUser(newPostObj) {
    const resp = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newPostObj),
    });
    if (resp.status === 201) {
        createSuccEl.innerHTML = 'Naujas useris sekmingai irasytas!!!';
    } else {
        createSuccEl.innerHTML = 'Naujas userio irasymas nesekmingas!!!';
    }
    setTimeout(() => {
        createSuccEl.innerHTML = '';
    }, 3000)
}

async function getUsers() {
    const resp = await fetch('http://localhost:3000/api/users');
    const dataInJs = await resp.json();
    return dataInJs;
}

async function getUsersOrder(orderDirect) {
    const resp = await fetch(`http://localhost:3000/api/users/order/${orderDirect}`);
    const dataInJs = await resp.json();
    createTable(dataInJs);
}

function createTable(arr) {
    let allEl = '';
    for (let i = 0; i < arr.length; i++) {
        turiMasina = arr[i].hasCar ? 'turi' : 'neturi'
        allEl += `<tr><td>${arr[i].id}</td><td>${arr[i].name}</td><td>${arr[i].age}</td><td>${turiMasina}</td><td>${arr[i].town}</td><td>${arr[i].createdAt.substring(0,10)}<br>${arr[i].createdAt.substring(11,19)}</td></tr>`;
    }
    tbodyEl.innerHTML = allEl;
}