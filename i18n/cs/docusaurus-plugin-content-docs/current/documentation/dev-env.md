# Testovací prostředí

Prostředí, na kterém jsou k dispozici data podobná produkčním a na kterém je možné si zkoušet implementaci volání jednotlivých endpointů. Případné problémy s těmito prostředími je potřeba řešit skrz [integrace_eshop@homecredit.cz](mailto:integrace_eshop@homecredit.cz), nebo jiným speciálně dohodnutým kanálem.

## Prerekvizity

- Abyste mohli provolávat testovací rozhraní (totéž pak platí i pro produkci), je potřeba nejprve získat přístupové údaje *username + password*, díky kterým pak budete moci získat přístupový token (*access token*), bez nějž není možné jednotlivé endpointy rozhraní provolávat (více detailů v [PSP TD](/docs/api/Reference/login-partner) nebo [eshop TD](/docs/api/eshopReference/login-partner)).
- Přístupové údaje byste měli obdržet od zodpovědné osoby z HC na jedné z úvodních schůzek na téma integrace naší platební metody

## Prostředí

- Testovací prostředí je dostupné na:
  * CZ: https://apicz-test.homecredit.cz/verdun-train/ 
  * SK: https://apisk-test.homecredit.sk/verdun-train/
- Vzorový GET request by tak mohl být směrován např. na:
  * CZ: https://apicz-test.homecredit.cz/verdun-train/authentication/v1/partner
  * SK: https://apisk-test.homecredit.sk/verdun-train/authentication/v1/partner

- Zda je testovací prostředí funkční (a není na něm např. technická odstávka) lze zjistit pomocí health check endpointu (viz [TD](../api/Reference/api-health-check)).
  * CZ: https://apicz-test.homecredit.cz/verdun-train/financing/v1/health
  * SK: https://apisk-test.homecredit.sk/verdun-train/financing/v1/health

### Dostupné varianty entity konzumenta API na testovacím prostředí:

 A) Prodej **bez akontace** (ID prodejny **024242**)

  > ***username: 024242tech, password: 024242tech***

  > ***apiKey*** pro kalkulačku splátek ve variantě [javascriptový widget]((./widgets/install)
  > - CZ: `calculator_test_key`
  > - SK: `calculator_test_key`

  > tajný klíč pro hashování [zpětné komunikace na e-shop](./communication-security):
  > - CZ: `!;8ez62oe{*,_`
  > - SK: `%j:o)t:y/8)`

 B) Prodej **s akontací** (ID prodejny **024243**)

  > ***username: 024243tech, password: 024243tech***

  > ***apiKey*** pro kalkulačku splátek ve variantě [javascriptový widget](./widgets/install) 
  > - CZ: `calculator_test_key_dp`
  > - SK: `calculator_test_key_dp`

  > tajný klíč pro hashování [zpětné komunikace na e-shop](./communication-security):
  > - CZ: `..dw2{&q!.30`
  > - SK: `wq%?ch.q%55r_`

## Kalkulačka splátek

Pro testovací účely jsou k dispozici následující varianty kalkulačky splátek:

### 1. Vlastní řešení partnera - API
Vývojově nejnáročnější variantou je zcela vlastní řešení partnera postavené na kalkulačních endpointech ([viz TD](../api/Reference/cancel-application)). 
Výhodou tohoto řešení je např. možnost tvorby uživatelského rozhraní kalkulačky zcela dle představ a UX požadavků partnera.
> Pozn: Je třeba využívat variantu endpointů na train prostředí
> * CZ: https://apicz-test.homecredit.cz/verdun-train/...
> * SK: https://apisk-test.homecredit.sk/verdun-train/...

### 2. Částečné řešení partnera s využitím javascriptovéhéo widgetu - Widget
Zlatou střední cestou je řešení, kdy vlastní backend e-shopu využívá javascriptový widget od Home Creditu, který obstarává frontendovou část, výpočet vhodných nabídek a na základě výsledku připravuje podklady backendu e-shopu pro provolání endpointu na vytvoření žádosti o úvěr.
   * Javascriptový widget pro řešení kalkulačky splátek je k dispozici [zde](./widgets/install)
   * Testovací hodnoty jsou popsány v [návodu na instalaci widgetu](./widgets/install)

### 3. Home Creditem vystavená externí kalkulačka splátek - Standalone
> **Jde o jedinou variantu pro partnery spolupracující v režimu "Tipař"**

Nejjednodušší cestou, kdy, kromě zabezpečení přesměrování klienta na stránku pro kalkulaci splátek skrz jednoduchý link, není potřeba žádný vývoj

Vzorová URI k přesměrování může vypadat např.
 - CZ: **https://hc-calc-standalone.cz00t3.hccs.cz/?productSetCode=COCHCONL&price=1000000&downPayment=0&apiKey=calculator_test_key&fixDownPayment=false**
 - SK: **https://hc-calc-standalone.sk00t3.hccs.cz/?productSetCode=COCHCONL&price=200000&downPayment=0&apiKey=calculator_test_key&fixDownPayment=false**

   kde jednotlivé parametry znamenají:

   - `productSetCode` – kód produktové sady, kterou máte obchodně domluvenou s Home Creditem

   - `price` – financovaná částka nákupu (tedy finální cena po odečtení případné akontace placené zákazníkem přímo) v haléřích/centech

   - `downPayment` – akontace v haléřích/centech

   - `apiKey` - přidělený API klíč

   - `fixDownPayment` – pokud je `true`, podpora akontace v kalkulačce je vypnutá (vždy nulová), pokud `false`, akontace je podporována


## Zkušební dotazy

o   Ještě před samotnou implementací lze chování rozhraní poměrně jednoduše zkoušet pomocí aplikace [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop), která se instaluje ve formě plug-inu do prohlížeče Chrome

o   Úplné vzorové requesty, které lze právě pomocí aplikace Postman vyzkoušet, naleznete na konci tohoto dokumentu (případně v [TD](../api/Reference/home-credit-partner-api-order) – u těch je ale potřeba použít relevantní data)

o   Podkladová data pro vzorové requesty lze společně s jednoduchým návodem nalézt také [zde](../api/Reference/create-application)

> POZOR: Pro testovací účely používejte vždy financovanou částku nákupu větší než 1000,- (100000 v minor units) na CZ, a větší než 40 (4000 v minor units) na SK

## Práce se žádostí (Application) v integračním/testovacím režimu

Při testování v integrační fázi, pokud chcete ověřit celý proces

- od vytvoření žádosti o financování klientova nákupu
- přes jeho schválení a expedici/doručení
- po jeho úspěšné dokončení

je potřeba uměle nasimulovat klientovo chování ve front-endové aplikaci Home Creditu (MyLoan). K těmto účelům slouží speciální resource *Change application state*, jehož popis naleznete v technické dokumentaci [zde](../api/Reference/home-credit-partner-api-order#24-applicationresponse---major-changes). Tento resource funguje pouze na testovacích/integračních prostředích specifikovaných v tomto dokumentu (či technické dokumentaci).

### Testovací průchod "schváleno" 
Na testovacím prostředí (viz výše) existuje speciální účet pro schválení. Funkce účtu se aktivuje vyplněním položky ***příjmení = “Trener“*** při vytváření žádosti pomocí resource *Create Application* (v requestu volání `POST https://apicz-test.homecredit.cz/verdun-train/financing/v1/applications` musí být `customer.lastName = Trener`). Následně, ať už budete měnit stav objednávky pomocí speciálního resource *Change state*, nebo budete žádost vyplňovat „ručně“, bude tato žádost vždy schválena. Pro podpis smlouvy budete nakonec potřebovat OTP, které je pro testovací účely ***123456***.
