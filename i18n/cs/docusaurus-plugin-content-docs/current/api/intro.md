# HC - OneClick API - Splátkový prodej

API dokumentace pro Home Credit One-Click API.

> Verze dokumentace: `1.28.2`

| Verze | Release | Datum vydání | Novinky |
|-------|---------|--------------|---------|
| 1.28.2 | CS133 | 8.10.2025 | nahrazení endpointu pro změnu stavu žádosti |

> Seznam atributů, které se mění z povinných na volitelné:
>
> - request.customer
> - request.customer.firstName
> - request.customer.lastName
> - request.customer.fullName
> - request.customer.email
> - request.customer.phone
> - request.customer.addresses
> - request.customer.addresses.city
> - request.customer.addresses.streetAddress
> - request.customer.addresses.streetNumber
> - request.customer.addresses.zip
> - request.customer.addresses.addressType
> - request.merchantUrls.notificationEndpoint

V případě jakýchkoliv dotazů prosím kontaktujte naše integrační oddělení (integrace_eshop@homecredit.cz).

> **DŮLEŽITÉ UPOZORNĚNÍ:** Volání zdrojů ze **Slovenska** MUSÍ používat odpovídající dedikované `.sk` endpointy. Např. `https://api.homecredit.sk/financning/v1/applications`

## Začínáme

Tento online dokument popisuje Home Credit (HC) One-Click API – rozhraní pro partnerské e‑shopy, prostřednictvím kterého mohou zákazníkům nabízet výhody jedné z platebních metod Home Creditu.

Cílem zde popsaných služeb je umožnit zákazníkům plynulý průchod procesem online nákupu. Služby, které tento cíl umožňují, jsou rozděleny do následujících skupin:

| Skupina služeb | Účel |
|----------------|------|
| Security | Bezpečnostní pravidla a principy |
| Application resources | Zdroje, které umožňují zpracování *žádosti* a *objednávky* během celého jejich životního cyklu |
| Installments calculator resources | Zdroje, které umožňují partnerským e‑shopům implementovat na svých webových stránkách splátkovou kalkulačku |
| Merchantsite resources | Zdroje, které by měly být implementovány a vystaveny partnerskými e‑shopy, aby HC mohl asynchronně informovat tyto partnery o důležitých změnách týkajících se konkrétních *žádostí* a *objednávek* |
| Health check | Popis využití health checku |

### Základní implementace

Základní a minimální způsob, jak implementovat HCO API, je implementovat alespoň:

1. [Login](https://csoneclicknew.docs.apiary.io/#reference/security/login-partner)
   - Musíte být autorizováni, abyste měli přístup k většině zdrojů.

2. [Create application](https://csoneclicknew.docs.apiary.io/#reference/application-resources/create-application)
   - Jakmile shromáždíte potřebná data o zákazníkovi a jeho objednávce, zavolejte tento zdroj pro zahájení procesu schválení úvěru vytvořením `application`. Samotná `application` a její ID jsou zásadní pro úspěšné dokončení procesu.

3. Obsluhu přesměrování.
   - Speciální URL adresy pro zákazníky, které zobrazují úspěch či zamítnutí platby (více informací [zde](#parametry-přidané-k-vašim-návratovým-url)).

4. [Application notification](https://csoneclicknew.docs.apiary.io/#reference/merchantsite-resources/application-notification)
   - Tento endpoint musí být vystaven na vaší straně, aby back‑end HC mohl asynchronně informovat o důležitých změnách týkajících se konkrétních žádostí a objednávek.

5. [Mark order items as sent](https://csoneclicknew.docs.apiary.io/#reference/application-resources/mark-order-items-as-sent) nebo [Mark order items as delivered](https://csoneclicknew.docs.apiary.io/#reference/application-resources/mark-order-items-as-delivered) (použijte tu variantu, která odpovídá vašemu expedičnímu a fakturačnímu procesu, preferováno je `Mark order items as delivered`)
   - HC nezahájí proces finanční kompenzace, dokud není objednávka označena jako `SENT` / `DELIVERED`.

[![Sekvenční diagram minimální implementace](https://github.com/mdostal-hci/oneclick-images/raw/master/SequenceDiagramInstallmentMinimum.png)](https://github.com/mdostal-hci/oneclick-images/raw/master/SequenceDiagramInstallmentMinimum.png)

[![Stavový diagram žádosti (Application)](https://github.com/mdostal-hci/oneclick-images/raw/master/StateDiagramApplication.png)](https://github.com/mdostal-hci/oneclick-images/raw/master/StateDiagramApplication.png)

Je nutné vyplnit všechny atributy označené v requestu jako povinné, nicméně vyplnění volitelných parametrů vede k lepší schvalovatelnosti žádostí. Vždy byste měli zvážit vyplnění co největšího množství atributů. Kontaktujte obchodní podporu, abyste zjistili, které atributy nejvíce korelují s mírou schválení.

### Parametry přidané k vašim návratovým URL

- Během přesměrování zákazníka z front-endu Home Creditu zpět do e‑shopu (na jednu z poskytnutých URL – `approvedRedirectUrl`, `rejectedRedirectUrl`) jsou k URL přidány některé potenciálně užitečné informace o výsledku zákazníkovy interakce na front-endu Home Creditu:

- `orderNumber` (string) – Interní číslo objednávky e‑shopu poskytnuté v API volání [Create application](#reference/application-resources/create-application)

- `withdrawal` (boolean) – True, pokud je nákup zákazníka financován přímo z jeho již existujícího revolvingového úvěru; false, pokud je vytvářena nová smlouva

- `downPayment` (number) – Výše akontace, obvykle nastavena na 0

- `stateReason` (enum) – Dílčí stav žádosti (substate)

- `applicationId` (string) – Identifikátor žádosti HCO

- `checkSum` (string) – hashovaná zpráva

- např. `http://youreshop.cz?orderNumber=0606104036&stateReason=PROCESSING_SIGNED&downPayment=100000&checkSum=443E150D3406F6A8DC62C1DB224AFDD84FA9907071BB1AD9B2C7701031793662191501B26AADF3A31361341EA176C80B23D8A9A5E5B5219538289945FE0C20A7&applicationId=01-11b00a1ef1&withdrawal=false`

## Principy dokumentace

- atributy v objektu request/response jsou volitelné, pokud není uvedeno jinak (příznak `required` pod názvem atributu)

- povinný atribut v nepovinném objektu znamená, že pokud je nepovinný objekt uveden, musí obsahovat daný povinný atribut

- všechny hodnoty v atributech request/response jsou pouze příklady, výjimkou jsou enum hodnoty – ty představují jediné možné hodnoty daného atributu

- dokumentace se řídí [semantickým verzováním](https://semver.org/spec/v2.0.0.html), které rozlišuje *major*, *minor* a *patch* verze

### Konvence pojmenování

- pro názvy objektů a atributů používáme camelCase

- pro enum hodnoty používáme CAPITAL_UNDERSCORE

- pro názvy resource používáme množné číslo

## Principy Home Credit REST API

### Omezení requestů

Prosíme, mějte na paměti následující omezení týkající se requestů:

- Maximální velikost requestu je **10 MB**.

- Maximální velikost jednoho přijatého souboru je **500 kB**.

- Zde je seznam podporovaných souborů:

| MIME type | Příklad(y) |
|-----------|------------|
| application/pdf | *.pdf |
| application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | *.xlsx |
| application/vnd.openxmlformats-officedocument.wordprocessingml.document | *.docx |
| application/vnd.openxmlformats-officedocument.presentationml.presentation | *.pptx |
| application/vnd.ms-excel | *.xls, *.xlt, *.xla |
| application/msword | *.doc, *.dot |
| application/vnd.ms-powerpoint | *.ppt, *.pot, *.pps, *.ppa |
| plain/text | *.csv, *.txt |
| image/jpeg | *.jpg, *.jpeg |
| image/png | *.png |
| image/gif | *.gif |

### Limity API volání

Pokud partner překročí limit API volání (volá API vícekrát, než mu povoluje jeho kvóta), je vrácena HTTP chyba 429. Pro informování o limitech používáme následující hlavičky v odpovědi:

- `X-Rate-Limit-Limit` – Počet povolených požadavků v aktuálním časovém období

- `X-Rate-Limit-Remaining` – Počet zbývajících požadavků v aktuálním časovém období

- `X-Rate-Limit-Reset` – Počet sekund zbývajících do konce aktuálního období

### Versioning

Verzi API používáme v URL (např. `https://api.homecredit.cz/customer/v1/my/profile`). *Minor* změny a *patch* (viz níže), které nenarušují zpětnou kompatibilitu, NEZVYŠUJÍ verzi API, tj. mohou proběhnout bez předchozího upozornění a vaše aplikace by na ně měla být připravena.

*Minor* změny zahrnují:

- přidání nového resource

- přidání nové volitelné hlavičky/URL parametru nebo volitelného atributu v těle requestu

- přidání nového atributu do těla response

- přidání nových chybových kódů a zpráv za předpokladu, že struktura chyby zůstane stejná

### Kódování odpovědí

Pokud není uvedeno jinak, všechny odpovědi jsou posílány jako `Content-Type: application/json; charset=utf-8`.

### HTTP status kódy

Používáme následující status kódy napříč API, s výjimkou OAuth flow, kde jsou návratové kódy předepsané v RFC:

- 200 `OK` – požadavek byl úspěšný

- 201 `Created` – požadavek byl úspěšný a byl vytvořen resource

- 202 `Accepted` – požadavek byl přijat ke zpracování, ale zpracování ještě nebylo dokončeno

- 204 `No Content` – požadavek partnera byl přijat, ale v odpovědi není co vracet (např. prázdná response)

- 400 `Bad Request` – syntaktická chyba, např. v požadavku chybí povinné parametry/atributy nebo mají nesprávný typ

- 401 `Unauthorized` – partner není autorizován

- 403 `Forbidden` – přístup odepřen (např. uživatel/aplikace nemá oprávnění daný resource používat)

- 404 `Not Found` – požadovaný resource nebyl nalezen

- 405 `Method Not Allowed` – zadaná metoda není pro daný resource povolena

- 422 `Unprocessable Entity` – business (sémantické) chyby. Požadavek je syntakticky v pořádku, ale nelze jej zpracovat (např. datum splatnosti platby je v minulosti). Chyby jsou uvedeny v těle odpovědi (viz níže)

- 429 `Too Many Requests` – partner překročil limit počtu volání (viz sekce [API calls limit](#limity-api-volání) výše)

- 500 `Internal Server Error` – došlo k chybě na naší straně

- 503 `Service Unavailable` – probíhá plánovaná odstávka služby

### Zpracování chyb

Kromě HTTP status kódů, které jsou hlavním indikátorem, že došlo k chybě, používáme také objekt `errors` pro podrobnější popis chyb.

Příklad objektu errors:

```javascript
{
    ...

    errors: [
        {
            "code": "ERR_100",
            "message": "Invalid contract number",
            "severity": "ERROR",
            "attribute": "partyAccount.accountNumber",          // optional
            "ticketId": "UAT1:AMS:20160516-091658.450:45e4" // optional
        },
        {
            "code": 352,
            "message": "Insufficiend funds for payment order realization",
            "severity": "WARN"
        },
        {
            "code": 523,
            "message": "This order will trigger currency exchange operation",
            "severity": "INFO"
        }
    ]
}
```

Atributy objektu Error

| Název atributu | Popis |
|----------------|-------|
| code | jedinečný chybový kód |
| message | čitelný popis chyby (nelokalizovaný) |
| severity | závažnost chyby (viz níže) |
| attribute | JSON cesta k atributu v requestu, který chybu způsobil (volitelné) |
| ticketId | interní ID tiketu, používané pro zpětné dohledání chyby |

Existují 3 úrovně závažnosti chyby:

- `ERROR` – kritická chyba, v jejímž důsledku nelze pokračovat. Toto MUSÍ být indikováno také vhodným HTTP status kódem (např. `422 Unprocessable Entity`).

- `WARN` – nekritická chyba, v jejímž důsledku může zpracování pokračovat, ale je vhodná další interakce s uživatelem (aby požadavek pokračoval, musí partner uvést tento kód chyby v atributu requestu `override`). MŮŽE být indikována také vhodným HTTP status kódem.

- `INFO` – pouze informativní zpráva, zpracování může pokračovat bez interakce s uživatelem.

#### Přehled chyb

| Status kód | Kód | Vysvětlení | Zpráva |
|-----------|-----|------------|--------|
| 400 | INVALID_REQUEST | Požadavek nebyl správně naformátován (chybná syntaxe requestu, příliš velká velikost atd.) | (*Různé možné zprávy*) např. Nepodporovaná kombinace stavu žádosti a stavu objednávky |
| 404 | OBJECT_NOT_FOUND | Požadovaný resource nebyl nalezen | (*Různé možné zprávy*) např. Zadaný objekt nebyl nalezen |
| 422 | NOT_ALLOWED | Operace není povolena (interní důvod) | (*Různé možné zprávy*) např. Není povoleno (jiný důvod) |
| 500 | INTERNAL_SERVER_ERROR | Byla zjištěna neočekávaná situace a není k dispozici specifičtější zpráva | (*Různé možné zprávy*) např. Nepodařilo se zpracovat zadaný JSON |

### Formáty

- **date** a **time** používají formátování [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), např.:
  - datum je reprezentováno jako `YYYY-mm-dd`. Časové pásmo (lokální) je přidáno, pokud je to potřeba.
  - čas je reprezentován jako `Thh:mm:ss`. Časové pásmo je přidáno, pokud je to potřeba. Čas s libovolným počtem číslic představujících milisekundy je také akceptován (pokud splňuje kritéria formátu [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)), ale vždy je vracen čas bez milisekund.
  - den v týdnu je reprezentován číslem 1..7, kde 1 znamená pondělí
  - týden č. 1 je týden, který obsahuje první čtvrtek v roce

- **telefonní čísla** používají mezinárodní formát mobilního telefonního čísla začínající znakem '+' a obsahující kód země (příklad platného čísla: `+420739111222`)

- **formát čísla** je definován [JSON standardem](http://www.json.org), např. desetinná místa jsou oddělena tečkou `.`

- **formát peněz** používá [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) (v minimálních jednotkách, např.: 12590 v minimálních jednotkách představuje 125,90 CZK/EUR)
