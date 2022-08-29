// const author = document.getElementsByName('author');
// const body = document.getElementsByName('body');
const allUsersEl = document.querySelector('#allUsers');
const nameAscsEl = document.querySelector('#nameAsc');
const nameDescsEl = document.querySelector('#nameDesc');
const tbodyEl = document.querySelector('tbody');

document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    const dummy = {
        name: e.target.name.value,
        age: e.target.age.value,
        hasCar: e.target.hasCar.checked,
        town: e.target.town.value,
    };
    //    console.log(dummy);
    createUser(dummy);
});


allUsersEl.addEventListener('click', async() => {
    const rez = await getUsers();
    createTable(rez);
})

nameAscsEl.addEventListener('click', async() => {
    const rez = await getUsersAsc();
    createTable(rez);
})

nameDescsEl.addEventListener('click', async() => {
    const rez = await getUsersDesc();
    createTable(rez);
})

async function createUser(newPostObj) {
    const resp = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newPostObj),
    });
    console.log('resp ===', resp);
}

async function getUsers() {
    const resp = await fetch('http://localhost:3000/api/users');
    const dataInJs = await resp.json();
    //   console.log('resp ===', dataInJs);
    return dataInJs;
}

async function getUsersAsc() {
    const resp = await fetch('http://localhost:3000/api/users/order/asc');
    const dataInJs = await resp.json();
    //   console.log('resp ===', dataInJs);
    return dataInJs;
}

async function getUsersDesc() {
    const resp = await fetch('http://localhost:3000/api/users/order/desc');
    const dataInJs = await resp.json();
    //   console.log('resp ===', dataInJs);
    return dataInJs;
}


function createTable(arr) {
    //    console.table('createtable ====  ', arr)
    let allEl = '';
    for (let i = 0; i < arr.length; i++) {
        //alert(arr[i].name);
        turiMasina = arr[i].hasCar ? 'turi' : 'neturi'
        allEl += `<tr><td>${arr[i].name}</td><td>${arr[i].age}</td><td>${turiMasina}</td><td>${arr[i].town}</td><td>${arr[i].createdAt.substring(0,10)}</td></tr>`;
    }

    //allEl += `<tr><td>${arr[0].name}</td></tr>`;
    tbodyEl.innerHTML = allEl;
}