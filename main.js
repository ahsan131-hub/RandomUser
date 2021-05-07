const adduser = document.querySelector('#add-user');
const double = document.querySelector('#double');
const showM = document.querySelector('#show-millionaires');
const sort = document.querySelector('#sort');
const calcwealth = document.querySelector('#calculate-wealth');
const main = document.querySelector('#main');


let data = [];
getRandUser();

//fetch random user and add moeny
async function getRandUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    console.log(newUser);
    addData(newUser);
}







function doubelMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        };
    })
    updateDom();

}

function sortData() {
    data = data.slice().sort((a, b) => {
        // if (a.money > b.money) {
        //     return -1;
        // }
        // if (a.money < b.money) {
        //     return 1;
        // }
        // return 0;
        return b.money - a.money;
    })
    console.log(data);
    updateDom();

}

function showMillionairs() {
    data = data.filter(a => {
        return a.money >= 1000000
    })
    updateDom();
}

function calcWealth() {
    const sum = data.reduce((acc, user) => {
        return acc + parseFloat(user.money);
    }, 0)
    console.log(sum)

    const ele = document.createElement('div');
    //  ele.classList.add('person')
    ele.innerHTML = `<h3><strong>Total wealth  </strong> <strong>$ ${formatMoney(sum)}<strong></h3>`
    main.appendChild(ele);


}


// add new data
function addData(newUser) {
    data.push(newUser);
    updateDom();
}

function updateDom(providedData = data) {
    //clear the main div 
    main.innerHTML = `<h2><strong>Person</strong> <strong> Wealth</strong></h2>`
    providedData.forEach(person => {
        const ele = document.createElement('div');
        ele.classList.add('person')
        ele.innerHTML = `<strong>${person.name}</strong>$ ${formatMoney(person.money)}`
        main.appendChild(ele);
    })

}

//format nummber money
function formatMoney(money) {
    return (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}
adduser.addEventListener('click', getRandUser);
double.addEventListener('click', doubelMoney);
sort.addEventListener('click', sortData);
showM.addEventListener('click', showMillionairs)
calcwealth.addEventListener('click', calcWealth)