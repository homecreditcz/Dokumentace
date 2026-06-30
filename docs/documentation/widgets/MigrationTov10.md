# Migration from hc-calc-v9 to v10

After upgrading to the new major version of the calculator, you need to modify the existing code.

First, you need to remove:

```html
<head>
  <link rel="stylesheet" href="hc-calc/style/style.css">
  
  <!-- Typekit Acumin Pro font initialization -->
  <script src="https://use.typekit.net/mxi3qpt.js"></script>
  <script>try { Typekit.load({ async: true }); } catch (e) { }</script>
  ...
</head>
```

and replace it with:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

Next, remove:

```html
<script src="hc-calc/js/resize.js"></script>
<script src="hc-calc/js/appLoader.js"></script>
```

and replace it with:

```html
<script src="./app.js"></script>
```

The storage location of the script is entirely up to you. You just need to add the correct path to load the script.

You need to remove the old HTML code:

```html
<div id="hc-calc-container">
 <div id="hc-calc-modal" class="hc-modal" role="dialog" style="display: none">
   <div class="hc-modal__dialog">
     <div class="hc-modal__content">
       <div id="hc-modal-header" class="hc-modal__header">
         <a id="hc-close-button" href="JavaScript:void(0)" class="hc-modal__close" 
             onclick="document.getElementById('hc-calc-modal').style.display = 'none'"></a>
         <div class="hc-modal__logo">
           <img src="hc-calc/img/logo.svg" alt="logo" />
         </div>
         <div class="hc-modal__title">NÁKUP NA SPLÁTKY</div>
       </div>
       <div id="hc-calculator-wrapper" class="hc-modal-body" ></div>
     </div>
   </div>
 </div>
</div>
```

Finally, you need to modify the launcher script itself. Remove:

```javascript
// helper function example  
function showCalc() {        
  var productSetCode = 'COCHCONL'; 
  var price = document.getElementById('my-product-price').value;        
  var downPayment = 0;         
  var fixDownPayment = true;        
  var dataCalculatorBaseUrl = 'https://apicz-test.homecredit.cz/verdun-train/public/v1/calculator/';        
  var apiKey = 'calculator_test_key';
  showHcCalc(productSetCode, price, downPayment, fixDownPayment, dataCalculatorBaseUrl, apiKey, processCalcResult);  
}
```

and replace it with:

* **Callback** is a JS function that will be called when the customer selects one of the offered payment options.
* **Debug** is an option to enable debug mode, which helps with troubleshooting. The default value is false and does not need to be implemented when launching for customers.
* **Language** is the language in which the calculator will launch. 'cs-CZ' for Czech, 'sk-SK' for Slovak.
* Other values remain the same.

The last line "document.body.appendChild(app);" determines where the calculator will be displayed in the DOM.
The default setting is on the body tag. You can customize it as needed.

```javascript
// helper function example  
function showCalc() {
    let app = document.createElement('hc-calc');
    app.callback = processCalcResult;
    app.apiKey = 'calculator_test_key';
    app.dataCalculatorBaseUrl = 'https://apicz-test.homecredit.cz/verdun-train/public/v1/calculator/';
    app.productSetCode = 'COCHCONL';
    app.price = price;
    app.downPayment = 0;
    app.fixDownPayment = true;
    app.language = 'cs-CZ';
    app.debug = false;
    document.body.appendChild(app);  
}
```

In this version, there is no longer a need to use config.json and configLoader.js.

Now you need to insert the real production API key that was assigned to you into the apiKey value.
