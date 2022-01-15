// Question no 1
function add (a) {
    return function(b){
     return a + b;
    }
  }
// Call add function to perform an addition between 5 and 98
const x = add(5)
console.log(x(10))
// Answer
console.log(add(5)(98))

// Question no 2
// const myFriendsIncome = [
//     {
//         "name": 'Rashid',
//         "income": 3500
//     },
//     {
//         "name": "Rahat",
//         "income": 2450
//     },
//     {
//         "name": "You",
//         "income": 9500
//     },
//     {
//         "name": "Rofik",
//         "income": 7480
//     }
// ]

// Calculate your friends income except your income. Use Js high order functions to get extra points.

// Answer
const myFriendsIncome = [
    {
        "name": 'Rashid',
        "income": 3500
    },
    {
        "name": "Rahat",
        "income": 2450
    },
    {
        "name": "You",
        "income": 9500
    },
    {
        "name": "Rofik",
        "income": 7480
    }
]

const addition = myFriendsIncome.filter(el => el.name !== 'You').map(el => el['income']).reduce((acc, item) => acc + item)
console.log(addition)

// Question no 3
// var baseSKU = 'kf1097'
// var variationOptions = [
//     {
//         name: 'size',
//         options: [40, 41, 42, 43]
//     },
//     {
//         name: 'color',
//         options: ['black', 'brown', 'chocolate']
//     },
// ]

// function prepareCode(base, options)

// prepareCode() function will take the base and variationOptions as parameter. You have to complete the prepareCode() function to get the output as 'kf1097-black-40’
// You have to make the code for all shoe sizes and colors. For example,
// 'kf1097-black-40', 'kf1097-brown-40', 'kf1097-chocolate-40'
// ... 
// ...

// Answer
var baseSKU = 'kf1097'
var variationOptions = [
    {
        name: 'size',
        options: [40, 41, 42, 43]
    },
    {
        name: 'color',
        options: ['black', 'brown', 'chocolate']
    },
]

function prepareCode(base, options){
    return options[0].options.map(size => options[1].options.map(color => `${base}-${color}-${size}`))
}

const p = prepareCode(baseSKU, variationOptions)
console.log(p)

// Question no 4
// Bob wants to create a token counter for his users to use. Every time one particular user purchases a product there will be a reduction 
// in their token counter.So Bob writes his code as follow: 

// var initialToken = 3
// function tokenReducer(){
//     initialToken--
//     return initialToken >= 0 ? console.log(`You have ${initialToken} token remaining`) : console.log(`You have no token to use`);
// }

// function productPurchasing(){
//     console.log('You are purchasing a new product.')
//     tokenReducer()
// }

// productPurchasing()
// productPurchasing()
// productPurchasing()
// productPurchasing()
// initialToken = 100
// productPurchasing()
// (Run above code to get a better understanding) So, now you know where bob is having
//   	his problems. After doing some research bob found that javascript closure can solve his
// Problem. 
// Solve Bob’s problem.

// Answer 
function tokenReducer(tokenCount){
    var initialToken = tokenCount
    return () => {
        initialToken--
        return initialToken >= 0 ? console.log(`You have ${initialToken} token remaining`) : console.log(`You have no token to use`);
    }
}

const token = tokenReducer(2)

function productPurchasing(){
    console.log('You are purchasing a new product.')
    token()
}

productPurchasing()
productPurchasing()
productPurchasing()
productPurchasing()

// Question no 5