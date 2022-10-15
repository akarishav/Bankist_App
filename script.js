'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 ={
  owner: 'Rishav Kumar',
  movements: [100,460,590,870,-1000,3500,-420],
  interestRate: 1.5,
  pin: 5555,
}


const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements){
  containerMovements.innerHTML = '';
     
    movements.forEach(function(mov,i){

        const type = mov> 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">${i+1} days ago</div>
        <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};


const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc+mov,0);
 
  labelBalance.textContent = `${acc.balance}€`;
};


const calcDisplaySummary = function(acc){
  const income = acc.movements.filter( mov => mov>0).
    reduce((acc,mov) => acc + mov,0);
    labelSumIn.textContent = `${income}€`;

    const out = acc.movements.filter(mov => mov<0).
    reduce ((acc,mov) => acc+mov,0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements.filter(mov => mov>0).
    map(deposit => (deposit * acc.interestRate)/100).
    filter((int , i , arr)=> {
      return int >=1;

    }).
    reduce((acc,int) => acc + int, 0)
    labelSumInterest.textContent = `${interest}€`;
}



const createUserName = function (accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase().split(' ').map(name => name[0]).join('');
  });
};
createUserName(accounts)
const updateUI = function(acc){
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
}
let currentAccount;

currentAccount = account1;
updateUI(currentAccount);
// containerApp.style.opacity = 100;


const now = new Date();
const day = `${now.getDate()}`.padStart(2,0);
const month = now.getMonth()+1;
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value );
  console.log(currentAccount);
  
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
  } else{
    alert('Wrong credentials');
  }

  inputLoginUsername.value = inputLoginPin.value = '';
  // inputLoginPin.blur();

  // updateUI(currentAccount);
 


});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username){
    console.log("Valid");
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  } else {
    alert('Transfer failed try again with right credentials');
  }

});

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index,1);

    containerApp.style.opacity = 0;

    labelWelcome.textContent = `Welcome to the bank`;
  }else{
    alert('Wrong input');
  }

  inputCloseUsername.value = inputClosePin.value ='';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const deposits = movements.filter(function(mov){
  return mov > 0;
  // if (mov>0){
  //   return mov;
  // }
})

const withdrawls = movements.filter(mov => mov<0);


const balance = movements.reduce((acc,cur) => acc+cur,0);
// console.log(balance);