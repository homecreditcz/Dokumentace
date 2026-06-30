# Home Credit Online Calculator

> This calculator variant can only be used by bound partners. For unbound partners ("referrers"), a standalone calculator variant is available - more info [here](/docs/documentation/dev-env#3-external-repayment-calculator-issued-by-home-credit)

The calculator (whose code runs in the customer's browser) needs to obtain data about possible installments. It calls the corresponding Home Credit API endpoints via HTTP GET. These requests must contain the appropriate API key HTTP header.

## Calculator Software Installation

The calculator's own code must be uploaded to a web server. It is a JS file, specifically app.js.

Example: `https://eshop.example.com/js/app.js`

## Modifying the E-shop Website

On the page with products for which the customer can choose to buy on installments, you need to:

### 1. Add a button (or similar element) "Buy on Installments",

which will launch the calculator for the given product. The HTML element will have onClick event handling set up - launching the helper function showCalc.

```javascript
<button onclick="showCalc()">Nákup na splátky</button>
```

### 2. Implement the helper function `showCalc()`

which contains the necessary data to display the calculator.

- `productSetCode` - constant provided by HC 
  - for testing purposes:
    - CZ: ***COCHCONL***
    - SK: ***COCHCONL***
    
> This parameter specifies the Home Credit product set to be used for calculation - if the product is included in a special promotion (e.g., "0% interest"), for which calculation falls under a promotional product set, this set needs to be used in this step - **It is desirable that the e-shop's product management has the ability to easily set this property (alternatively, this option can be set for a selected product category, for example). Selecting a specific product then leads to using the promotional product set (`productSetCode`) when initializing the calculator**

- `price` - price of the given product (basket)
- `language` - language in which the calculator runs. If not provided, Czech is used
- `downPayment` - down payment value, can be 0
- `fixDownPayment` – disable optional down payment support
- `dataCalculatorBaseUrl` – fixed URL provided by HC
  - for testing purposes: 
    - CZ: `https://apicz-test.homecredit.cz/verdun-train/public/v1/calculator/`
    - SK: `https://apisk-test.homecredit.sk/verdun-train/public/v1/calculator/`
  - in production environment: 
    - CZ: `https://api.homecredit.cz/public/v1/calculator/`

- `apiKey` – API key, constant provided by HC
  - for testing purposes:
    - CZ: ***calculator_test_key*** / ***calculator_test_key_dp*** (with down payment support)
    - SK: ***calculator_test_key*** / ***calculator_test_key_dp*** (with down payment support)
  - in production environment:
    - you will receive it from the responsible person at HC after approval of your implementation

- `processCalcResult` - JS function that is called when the customer selects one of the offered payment options.
- `debug` - option to enable debug using app.debug=true, which helps during implementation and troubleshooting
- `isModal` - option to enable or disable whether the calculator should be displayed in a modal or rendered into the corresponding element, which is determined using document.body.appendChild(app). 
- `hideHeader` - option to enable or disable whether the header should be displayed, which contains the HomeCredit logo, title and close button. 
- `document.body.appendChild(app)` - here we determine where in the DOM we want to display the calculator. According to the example, the calculator will be displayed in the body tag.

```javascript
// helper function example  
function showCalc() {
    let app = document.createElement('hc-calc');
    app.callback = processCalcResult;
    app.apiKey = 'calculator_test_key'; // example
    app.dataCalculatorBaseUrl = 'https://apicz-test.homecredit.cz/verdun-train/public/v1/calculator/';
    app.productSetCode = 'COCHCONL'; // example
    app.price = document.getElementById('price').value; // number in minor units
    app.downPayment = 0; // number in minor units
    app.fixDownPayment = true; // parameter to decide if enable od disable downpayment
    app.language = 'cs-CZ'; // Language can be "cs-CZ" or "sk-SK"
    app.isModal = true; // parametr to decide if launch in model or not
    app.hideHeader = false; // parametr to decide if hide header of hc-calc
    document.body.appendChild(app); // Where to mount calculator
}
```

### 3. Implement the function `processCalcResult(calcResult)`

which processes the results from the calculator. Typically stores the data for later use and redirects the customer to the Cart. Example of the `calcResult` object that is passed to the function as a parameter:

```javascript
function processCalcResult(calcResult) {  
  console.log(calcResult);  
  // store the values ...  
  // go to basket ...  
}      
// calcResult object example:  
{
  annualInterestRate: 19.97,
  creditAmount: 1300000, // minor units
  creditTotalRepay: 1554000, // minor units
  preferredDownPayment: 100000, // minor units
  legalLine: "Každou žádost posuzujeme...",
  preferredInstallment: 129500, // minor units
  productCode: "COCONL12",
  annualPercentageRate: 22,
  preferredMonths: 12
}
```

### 4. Import fonts for the HTML page
Add fonts to the header

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
</head>
```

### 5. Import the calculator scripts
Choose the script path yourself
```html
<script src="./app.js"></script>
```
