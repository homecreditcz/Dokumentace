# Přidání tlačítka na detail produktu

1.	na stránky eshopu do detailu produktu se přidá nové tlačítko, které otevře kalkulačku (widget nebo API) a klient potvrdí výběr splátek. 
2.	definici klientem zvolené produktové sady si eshop uloží a vloží jej jako preferovanou variantu do createApplication

## Návod pro vložení tlačítka

1)	Na stránku eshopu, do místa kde chceme zobrazit HC kalkulačku, vložíme kód č.1
2)	Kamkoli do stránek eshopu (klidně hned pod část č.1 nebo kamkoli kde jsou skripty) vložíme kód č.2
3)	Upravíme řádek skriptu č.2, kde se definuje proměnná hcCalcPrice tak, aby se hodnota vzala z hodnoty produktu, kde hcCalcPrice je cena s DPH

### Kód č.1

```html
<div>
    <a id="hcCalcLink" target="_blank" title="Splátková kalkulačka Homecredit" class="c1664">
        <img src="https://www.homecredit.cz/cms-assets/download-library/hc-logo-splatkova-kalkulacka-cz.png" alt="Splátková kalkulačka HomeCredit" height="26" width="100">
    </a>
</div>
```

### Kód č.2

```html
<script type="text/javascript">
    const hcCalcPrice = 1000000;

    const hcCalcPrefixUrl = 'https://kalkulacka.homecredit.cz?productSetCode=COCHCONL&downPayment=0&apiKey=buhGztsSbU2Evsx57tYn&fixDownPayment=false';
    const hcCalcUrl = `${hcCalcPrefixUrl}&price=${hcCalcPrice}`;

    const link = document.getElementById("hcCalcLink");
    link.href = hcCalcUrl;
</script>
```

## Návod pro vložení definice preferovaného produktu do createApplication

•	Uložená definice, klientem preferovaného produktu, se vloží při zakládání objednávky (createApplication) do části settingInstallment:

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

•	Produkt je definován 3 parametry:
* preferredInstallment-výše splátky
* productCode-kód produktu
* productSetCode-kód produktové sady
