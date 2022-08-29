// const author = document.getElementsByName('author');
// const body = document.getElementsByName('body');
const allUsersEl = document.querySelector('#allUsers');

document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e.target.hasCar.checked)

    const dummy = {
        name: e.target.name.value,
        age: e.target.age.value,
        hasCar: e.target.hasCar.checked,
        town: e.target.town.value,
    };


    console.log(dummy);
    createUser(dummy);
});


allUsersEl.addEventListener('click', (e) => {
    alert('ok')
})

async function createUser(newPostObj) {
    const resp = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newPostObj),
    });
    console.log('resp ===', resp);
}