// importing html id's
class UI  {
constructor(){
this.budgetFeedback = document.querySelector('.budget-feedback');
this.expenseFeedback = document.querySelector('.expense-feedback');
this.budgetInput = document.getElementById('budget-input');
this.budgetForm = document.getElementById('budget-form');
this.budgetAmount= document.getElementById('budget-amount');
this.expenseAmount = document.getElementById('expense-amount');
this.balance = document.getElementById('balance');
this.balanceAmount = document.getElementById('balance-amount');
this.expenseForm = document.getElementById('expense-form');
this.expenseInput = document.getElementById('expense-input');
this.amountInput = document.getElementById('amount-input');
this.expenseList = document.getElementById('expense-list');
this.itemList = [];
this.itemID = 0;
}
// creating a submit function  for what happens when the button is triggered and also an innerhtml tag
submitBudgetForm(){
const value = this.budgetInput.value;
if( value === '' || value < 0) {
this.budgetFeedback.classList.add("showItem");
this.budgetFeedback.innerHTML =`<p> budget must not be empty or negative</p>`;
const hide = this;
//    console.log(this);
//    seting timeout for the budget feedback innethtml tag
setTimeout (function() {
//    console.log(this)
//    console.log(hide);
hide.budgetFeedback.classList.remove('showItem')
//    making the text that shows no valid input disappear
}, 4000); 
// timeout duration
// else if the input is not empty i want to show the budget been inputed
} else {
this.budgetAmount.textContent = value;
this.budgetInput.value = "";
//    after the input have been entered,  send the input using the button id 'budgetAmount';
this.showBalance();
}  
}
showBalance(){
const expense = this.totalExpense();
const total = parseInt(this.budgetAmount.textContent) - expense;
this.balanceAmount.textContent = total;
if(total < 0 ){
this.balance.classList.remove('showGreen', 'showBlack');
this.balance.classList.add('showRed');
}
else if(total > 0 ){
this.balance.classList.remove('showRed', 'showBlack');
this.balance.classList.add('showGreen');
}
else if(total === 0 ){
this.balance.classList.remove('showRed', 'showGreen');
this.balance.classList.add('showBlack');
}
};
// submitExpenseFrom
submitExpenseForm(){    
const expenseValue = this.expenseInput.value;
const amountValue = this.amountInput.value;
if(expenseValue === '' || amountValue === '' || amountValue < 0){
this.expenseFeedback.classList.add("showItem");
this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;

const hide = this;
setTimeout(function() {
    hide.expenseFeedback.classList.remove('showItem');
}, 2000);
}
else{
    let amount = parseInt(amountValue);
    this.expenseInput.value = '';
    this.amountInput.value = '';
    
    // passing the expense value to the itemlist and itemID
    let expense = {
        id:this.itemID,
        title:expenseValue,
        amount:amount,
    }
    this.itemID++;
    this.itemList.push(expense);
    this.addExpense(expense);
    this.showBalance();
} 

}
// add expense
addExpense(expense){
    const div = document.createElement('div')
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense"> 
    <div class="expense-item justify-content-between align-items-baseline">
        <h6 class="expense-title list-item text-uppercase">${expense.title}</h6>
        <h5 class="expense-amount list-item">${expense.amount}</h5>

        <div class="expense-icons list-item">
            <a href="#" class="edit-icon" data-id="${expense.id}">
                <i class="fas fa-edit></i>
            </a>
            <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-delete></i>
            </a>
        </div>
    </div>`;
    this.expenseList.appendChild(div);
}


// total expense: with the total expense i am checking for the expense made and make sure it reduces it cost from the balance
// and making sure of reduction
totalExpense(){
let total = 0;
if(this.itemList.length > 0 ) {
    total = this.itemList.reduce(function(item, curr) {
        // console.log(`Total is ${item} and the current value of ${curr.amount}`);
    item += curr.amount;
    return item;
    }, 0)
    
    
}
this.expenseAmount.textContent = total; 
return total;

}
//  edit expense
editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = parent.parentElement.parentElement.parentElement;

      // removing item from the dom
      this.expenseList.removeChild(parent);
      // remove fro the list 
    let expense = this.itemList.filter(function(item){
        return item.id === id;
    })
// show value from editing
    this.expenseInput.value = expense[0].title;
    this.expenseInput.value = expense[0].amount;
  
    
    // remove items 
    let tempList = this.itemList.filter(function(item){
        return item.id !== id;
    })

this.itemLIst = tempList
this.showBalance()
}
// delete expense
deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = parent.parentElement.parentElement.parentElement;

      // removing item from the dom
      this.expenseList.removeChild(parent);
          // remove items 
    let tempList = this.itemList.filter(function(item){
        return item.id !== id;
    })

this.itemLIst = tempList
this.showBalance()

}
}


//  creted a function for eventlistener 
function eventListeners(){

const budgetForm = document.getElementById('budget-form');
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');


//  new instancce of the UI CLASS
const ui = new UI()

// budget form
budgetForm.addEventListener('submit', function(event){
event.preventDefault();
ui.submitBudgetForm()
})
// expense form
expenseForm.addEventListener('submit', function(event){
event.preventDefault();
ui.submitExpenseForm();
})
// expense click
expenseList.addEventListener('click ', function(event){
// event.preventDefault(); 
if(event.target.parentElement.classList.contains('edit-icon')){
ui.editExpense(event.target.parentElement)
} else if(event.target.parentElement.classList.contains('delete-icon')){
ui.deleteExpense(event.target.parentElement)
}
})
}

document.addEventListener('DOMContentLoaded', function(){
eventListeners();
})

