# Zabezpečení zpětné komunikace partnerskému e-shopu

## Zabezpečení předávaných notifikací

Obsah notifikací zasílaných partnerskému e-shopu je chráněn proti změně informací či falšování ze strany možného útočníka přidáním kontrolního součtu zkonstruovaného z obsahu zprávy a *tajného klíče*, který není obsahem zprávy. 

### Jak to konkrétně funguje 

Šifrují se tyto dva atrbuty: číslo objednávky (`orderNumber`) a stav žádosti (`stateReason`). Oba atributy se sestaví do řetězce `#orderNumber:#stateReason` (parametry jsou odděleny dvojtečkou). Řetězec je následně zašifrován hašovací funkcí HMAC za použití algoritmu SHA512 a `tajného klíče` a v této podobě přiřazen do těla zprávy jako atribut `checkSum`

> Aktuálně platný ***tajný klíč*** na testovacím prostředí pro danou testovací prodejnu naleznete [zde](/docs/documentation/dev-env "Testovací prostředí")

> ***Tajný klíč*** pro produkční prostředí byste měli obdržet od zodpovědné osoby z HC na jedné z úvodních schůzek na téma integrace naší platební metody.

### Příklad 
- podepsaná žádost s objednávkou číslo: `018884`
- tajný klíč: `n#z?9:;a%&(\*er2`  
- řetězec pro zahashování bude následující: `018884:PROCESSING_SIGNED`
- výsledný kontrolní součet pak bude: `f61c69a259b702d564b2032e554984dec3b713ff7bdde17fcb727d403ea0d730816f46ad2bbc06a1914225d5dfba0396927dbf1b0698081814877b5486950a15`

## Zabezpečení informací předávaných při přesměrování klienta zpět na partnerské stránky

Při přesměrování klienta po dokončení procesu zpět na partnerské stránky eshopu do odkazu také přidáváme některé údaje, které eshop může použít. Opět, k zabezpečení autenticity předávaných informací je do těla odkazu přidá kontrolní součet. Pro jeho konstrukci je použit stejný mechanismus, jako pro konstrukci kontrolního součtu pro notifikace.