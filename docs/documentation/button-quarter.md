# Adding a button to Product Detail

1.	A new button is added to the e-shop's product detail page that opens the calculator (widget or API) and the client confirms their installment selection.
2.	The e-shop saves the definition of the product set chosen by the client and inserts it as the preferred option into createApplication

## Instructions for Inserting the Button

1)	Insert code #1 on the e-shop page, in the place where we want to display the HC calculator
2)	Insert code #2 anywhere on the e-shop pages (can be right below part #1 or anywhere scripts are located)
3)	Modify the line in script #2 where the hcCalcPrice variable is defined so that the value is taken from the product value, where hcCalcPrice is the price including VAT

### Code #1

```html
<div>
    <a id="hcCalcLink" target="_blank" title="Splátková kalkulačka Homecredit" class="c1664">
        <img src="https://www.homecredit.cz/cms-assets/download-library/hc-logo-splatkova-kalkulacka-cz.png" alt="Splátková kalkulačka HomeCredit" height="26" width="100">
    </a>
</div>
```

### Code #2

```html
<script type="text/javascript">
    const hcCalcPrice = 1000000;

    const hcCalcPrefixUrl = 'https://kalkulacka.homecredit.cz?productSetCode=COCHCONL&downPayment=0&apiKey=buhGztsSbU2Evsx57tYn&fixDownPayment=false';
    const hcCalcUrl = `${hcCalcPrefixUrl}&price=${hcCalcPrice}`;

    const link = document.getElementById("hcCalcLink");
    link.href = hcCalcUrl;
</script>
```

## Instructions for Inserting the Preferred Product Definition into createApplication

•	The saved definition of the client's preferred product is inserted when creating an order (createApplication) into the settingInstallment section:

```json
{
  "settingsInstallment": {
    "preferredMonths": 0,
    "preferredInstallment": {
      "amount": 75900,
      "currency": "CZK"
    },
    "preferredDownPayment": {
      "amount": 0,
      "currency": "CZK"
    },
    "productCode": "COCONL15",
    "productSetCode": "COCHCONL"
  }
}
```

•	The product is defined by 3 parameters:
* preferredInstallment - installment amount
* productCode - product code
* productSetCode - product set code
