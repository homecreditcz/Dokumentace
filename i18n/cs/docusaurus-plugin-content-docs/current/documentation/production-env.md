# Produkční prostředí

## GDPR
Pro splnění podmínek GDPR při využívání našeho rozhraní je nezbytné, aby se na vašich stránkách v procesu nákupního košíku u naší platební metody objevil tento rozkliknutelný/rozrolovatelný text:

> CZ: Berete na vědomí, že Vaše osobní údaje v rozsahu jméno, příjmení, adresa, e-mail, telefon, budou předány společnosti Home Credit a.s., Nové sady 996/25, 602 00 Brno, IČO 26978636, e-mail: info@homecredit.cz, zapsané v obchodním rejstříku vedeném Krajským soudem v Brně, oddíl B, vložka 4401 (dále jen 'HC') za účelem předvyplnění formuláře žádosti o poskytnutí služby.

> SK: Beriete na vedomie, že Vaše osobné údaje v rozsahu meno, priezvisko, adresa, e-mail, telefón, budú poskytnuté spoločnosti Home Credit Slovakia, a.s., Teplická 7434/147,  Piešťany 921 22, IČO 36 234 176, e-mail: posta@homecredit.sk, zapísanej v obchodnom registri vedenom Okresným súdom Trnava, oddiel Sa, vložka č. 10130/T za účelom predvyplnenia žiadosti o poskytnutie služby

## Prerekvizity

Pro provolávání rozhraní na produkčním prostředí jsou potřeba přístupové údaje (*username + password*), které se liší od těch pro přístup na testovací prostředí. Získat je můžete stejnou cestou jako ty pro přístup na testovací rozhraní (viz [Testovací prostředí](/docs/documentation/dev-env)).

> Do kalkulačky splátek se na vstupu vyplňuje parametr udávající produktovou sadu Home Creditu, jenž se má pro výpočet použít - pokud je zboží zařazeno do speciální akce (např. "Za 0%"), na které se vztahuje kalkulace pod akční produktovou sadou, je potřeba tuto sadu v tomto kroku použít - **Je žádoucí, aby ve správě produktů e-shopu byla možnost tuto vlastnost jednoduše nastavovat (alternativou je mít tuto možnost např. pro vybranou kategorii produktů)**

## Prostředí

Produkční prostředí je dostupné na
  * CZ: https://api.homecredit.cz/
  * SK: https://api.homecredit.sk/

Vzorový GET request by tak mohl být směrován např. na
  * CZ: [https://api.homecredit.cz/*authentication/v1/partner*](https://apicz-test.homecredit.net/verdun-train/authentication/v1/partner) 
  * SK: [https://api.homecredit.sk/*authentication/v1/partner*](https://apicz-test.homecredit.net/verdun-train/authentication/v1/partner)

Zda je produkční prostředí funkční (a není na něm např. technická odstávka) lze zjistit pomocí [health check endpointu](https://csoneclicknewfuture.docs.apiary.io/#reference/health-check/api-health-check/api-health-chceck)
* CZ: https://api.homecredit.cz/financing/v1/health
* SK: https://api.homecredit.sk/financing/v1/health

## Kalkulačka splátek

Na produkci existují 3 hlavní způsoby, jak implementovat kalkulačku splátek:

### 1. Vlastní řešení partnera - API
Vývojově nejnáročnější variantou je zcela vlastní řešení partnera postavené na kalkulačních endpointech ([viz PSP TD](/docs/api/Reference/installments-calculator-resources) nebo [eshop TD](/docs/api/eshopReference/installments-calculator-resources)).
Výhodou tohoto řešení je např. možnost tvorby uživatelského rozhraní kalkulačky zcela dle představ a UX požadavků partnera.

### 2. Částečné řešení partnera s využitím javascriptovéhéo widgetu - Widget
Zlatou střední cestou je řešení, kdy vlastní backend e-shopu využívá javascriptový widget od Home Creditu, který obstarává frontendovou část, výpočet vhodných nabídek a na základě výsledku připravuje podklady backendu e-shopu pro provolání endpointu na vytvoření žádosti o úvěr.
   * Javascriptový widget pro řešení kalkulačky splátek je k dispozici [zde](/docs/documentation/widgets/install)

### 3. Home Creditem vystavená externí kalkulačka splátek - Standalone
> **Jde o jedinou variantu pro partnery spolupracující v režimu "Tipař"**

Nejjednodušší cestou, kdy, kromě zabezpečení přesměrování klienta na stránku pro kalkulaci splátek skrz jednoduchý link, není potřeba žádný vývoj. 

Vzorová URI k přesměrování může vypadat např.
 - CZ: **https://kalkulacka.homecredit.cz?productSetCode=COCHCONL&price=1000000&downPayment=0&apiKey=buhGztsSbU2Evsx57tYn&fixDownPayment=false**
 - SK: **https://kalkulacka.homecredit.sk?productSetCode=COCHCONL&price=200000&downPayment=0&apiKey=QWburxYCnSewbQ2zM8Qj&fixDownPayment=false**

   kde jednotlivé parametry znamenají:

   - `productSetCode` – kód produktové sady, kterou máte obchodně domluvenou s Home Creditem

   - `price` – financovaná částka nákupu (tedy finální cena po odečtení případné akontace placené zákazníkem přímo) v haléřích/centech

   - `downPayment` – akontace v haléřích/centech

   - `apiKey` - přidělený API klíč

   - `fixDownPayment` – pokud je `true`, podpora akontace v kalkulačce je vypnutá (vždy nulová), pokud `false`, akontace je podporována


---
***Případné chyby z produkčního prostředí, prosím, hlaste skrz helpdesk@homecredit.cz***