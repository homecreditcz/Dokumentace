# Zabezpečení zpětné komunikace partnerskému e-shopu

## Zabezpečení předávaných notifikací

Obsah notifikací zasílaných partnerskému e-shopu je chráněn proti změně informací či falšování ze strany možného útočníka přidáním kontrolního součtu zkonstruovaného z obsahu zprávy a *tajného klíče*, který není obsahem zprávy. 

### Jak to konkrétně funguje (API v1/v2)

Šifrují se tyto dva atrbuty: číslo objednávky (`orderNumber`) a stav žádosti (`stateReason`). Oba atributy se sestaví do řetězce `#orderNumber:#stateReason` (parametry jsou odděleny dvojtečkou). Řetězec je následně zašifrován hašovací funkcí HMAC za použití algoritmu SHA512 a `tajného klíče` a v této podobě přiřazen do těla zprávy jako atribut `checkSum`

> Aktuálně platný ***tajný klíč*** na testovacím prostředí pro danou testovací prodejnu naleznete [zde](/docs/documentation/dev-env "Testovací prostředí")

> ***Tajný klíč*** pro produkční prostředí byste měli obdržet od zodpovědné osoby z HC na jedné z úvodních schůzek na téma integrace naší platební metody.

### Příklad (API v1/v2)
- podepsaná žádost s objednávkou číslo: `018884`
- tajný klíč: `n#z?9:;a%&(\*er2`  
- řetězec pro zahashování bude následující: `018884:PROCESSING_SIGNED`
- výsledný kontrolní součet pak bude: `f61c69a259b702d564b2032e554984dec3b713ff7bdde17fcb727d403ea0d730816f46ad2bbc06a1914225d5dfba0396927dbf1b0698081814877b5486950a15`


### Jak to funguje v API v3

V API v3 se kontrolní součet počítá z těchto atributů `notificationContent`: ID žádosti (`applicationId`), stav žádosti (`applicationStatus`), číslo objednávky (`orderNumber`), stav objednávky (`orderStatus`) a záloha (`downPayment.value`). Sestaví se do řetězce `#applicationId:#applicationStatus:#orderNumber:#orderStatus:#downPayment` (parametry jsou odděleny dvojtečkou). Záloha se uvádí v haléřích/centech; pokud záloha není, použije se `0`. Řetězec se zahashuje stejnou funkcí HMAC s algoritmem SHA512 a `tajným klíčem` a ve zprávě se posílá jako atribut `checksum` (ve v1/v2 to byl `checkSum`).

### Příklad (API v3)
- testovací prodejna (salesroom): **034342**
- tajný klíč: `(u$5a$r3#8t+ug` (viz [Testovací prostředí](/docs/documentation/dev-env "Testovací prostředí"))
- notifikace zaslaná na e-shop:

```json
{
  "notificationContent": {
    "applicationId": "77328b0c-e50f-408e-b9a8-301af0c2748b",
    "applicationStatus": "CONFIRMED",
    "orderNumber": "OBJ-2026-73104",
    "orderStatus": "TO_SHIP",
    "downPayment": {
      "value": 0,
      "currency": "CZK"
    },
    "notificationDate": "2026-10-19T21:11:56+02:00",
    "sequenceNumber": 1
  },
  "sentDate": "2026-10-19T21:14:02+02:00",
  "checksum": "E560793AE29860E87524E338628572DD4FEEB73CEE803502483DFE6C7AB63DA9A4823F997AC31A0BF7618168AF8A362B8917CEAB8AD6A82AC30C484A1A6E16F2"
}
```

- řetězec pro zahashování bude následující: `77328b0c-e50f-408e-b9a8-301af0c2748b:CONFIRMED:OBJ-2026-73104:TO_SHIP:0`
- výsledný kontrolní součet (hexadecimálně, velkými písmeny) pak bude: `E560793AE29860E87524E338628572DD4FEEB73CEE803502483DFE6C7AB63DA9A4823F997AC31A0BF7618168AF8A362B8917CEAB8AD6A82AC30C484A1A6E16F2`

Další příklady se stejným tajným klíčem:
- notifikace k žádosti `b452a713-3052-4b86-9b53-918e3abc5988`, stav `CONFIRMED`, číslo objednávky `449890`, stav objednávky `IN_PROCESS` a záloha `100000` (1 000 Kč)
- řetězec pro zahashování bude následující: `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:100000`
- výsledný kontrolní součet pak bude: `65FDE9A7FE6246F950EEADFB01F3A3452641F367EE6C6BFFE03BE24A1B9FB6DF4C48CB02E55901634E10FAC0269BEF3C0F059BF1119E9DA50F66BBD918AAE880`
- stejná notifikace bez zálohy – řetězec pro zahashování: `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:0`, výsledný kontrolní součet: `06FA0950BCAFFCEA73A3A3ADD6A0F9C20A70424AECE745A1724D5AB5A8AD4D70DDCCB859B023221E31C491810E848E13AA355E238C0F100B80F2F0F80F0986B6`

> Kontrolní součet se posílá jako hexadecimální řetězec velkými písmeny. Doporučujeme ho porovnávat bez ohledu na velikost písmen.

## Zabezpečení informací předávaných při přesměrování klienta zpět na partnerské stránky

Při přesměrování klienta po dokončení procesu zpět na partnerské stránky eshopu do odkazu také přidáváme některé údaje, které eshop může použít. Opět, k zabezpečení autenticity předávaných informací je do těla odkazu přidá kontrolní součet. Pro jeho konstrukci je použit stejný mechanismus, jako pro konstrukci kontrolního součtu pro notifikace.