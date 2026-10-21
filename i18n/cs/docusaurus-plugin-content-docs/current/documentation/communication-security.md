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
- tajný klíč (testovací prodejna **034342**, viz [Testovací prostředí](/docs/documentation/dev-env "Testovací prostředí")): `(u$5a$r3#8t+ug`
- notifikace k žádosti `b452a713-3052-4b86-9b53-918e3abc5988`, stav `CONFIRMED`, číslo objednávky `449890`, stav objednávky `IN_PROCESS` a záloha `100000` (1 000 Kč)
- řetězec pro zahashování bude následující: `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:100000`
- výsledný kontrolní součet pak bude: `65fde9a7fe6246f950eeadfb01f3a3452641f367ee6c6bffe03be24a1b9fb6df4c48cb02e55901634e10fac0269bef3c0f059bf1119e9da50f66bbd918aae880`
- stejná notifikace bez zálohy – řetězec pro zahashování: `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:0`, výsledný kontrolní součet: `06fa0950bcaffcea73a3a3add6a0f9c20a70424aece745a1724d5ab5a8ad4d70ddccb859b023221e31c491810e848e13aa355e238c0f100b80f2f0f80f0986b6`

> Kontrolní součet je hexadecimální řetězec. Porovnávejte ho bez ohledu na velikost písmen – může být zaslán velkými písmeny.

## Zabezpečení informací předávaných při přesměrování klienta zpět na partnerské stránky

Při přesměrování klienta po dokončení procesu zpět na partnerské stránky eshopu do odkazu také přidáváme některé údaje, které eshop může použít. Opět, k zabezpečení autenticity předávaných informací je do těla odkazu přidá kontrolní součet. Pro jeho konstrukci je použit stejný mechanismus, jako pro konstrukci kontrolního součtu pro notifikace.