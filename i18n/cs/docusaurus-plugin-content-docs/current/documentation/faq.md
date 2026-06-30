# Často kladené otázky

1. Při testování v prohlížeči vždy používejte anonymní okno a nové požadavky spouštějte přes CTRL+F5
2. Widget kalkulačka – **existují samostatné verze pro CZ a SK, nelze je míchat**, dostupné jsou [zde](/docs/documentation/widgets/install)
3. Nefunguje kalkulačka, zobrazuje se hláška "Něco se pokazilo":
  * CZ: zkontrolujte minimální částku úvěru, prodejní cena minus akontace musí být větší než 1000 00 Kč. Maximální částka musí být menší než 250 000 00 Kč. Hodnota korun je ve formátu MINOR UNITS, tedy včetně halířů bez desetinné čárky.
  * SK: zkontrolujte minimální částku úvěru, prodejní cena minus akontace musí být větší než 40 00 €. Maximální částka musí být menší než 10 000 00 €. Hodnota korun je ve formátu MINOR UNITS, tedy včetně centů bez desetinné čárky.
  * zkontrolujte hodnoty Product Set: **_COCHCONL_**
  * CZ: hodnotu ApiKey: calculator_test_key a adresu https://apicz-test.homecredit.cz/verdun-train/public/v1/calculator/
  * SK: hodnotu ApiKey: calculator_test_key_sk a adresu https://apisk-test.homecredit.sk/verdun-train/public/v1/calculator/
4. Kalkulačka-widget vrací chybu "Něco se pokazilo":
  * když v prohlížeči Chrome zmáčknete F12, objeví se chyba 422 –-> pak jde o chybný parametr, patrně ApiKey
5. *createApplication* vrací chybu 422 – duplicitní Order number --> změňte ve svých datech Order number na jiné číslo
6. *createApplication* vrací chybu 422 a v popisu je Address.type --> V JSONu zasílaných dat vyberte:
  * Customer: Permanent nebo Contact (nepoužívat Billing)
  * Order: Billing nebo Delivery
7. *createApplication* vrací chybu 404
  * zkontrolujte, že při volání *createApplication* nemáte za adresou nadbytečné „/“. Při volání tokenu to nevadí, ale u *createApplication* být nesmí. Správně je na CZ `https://api.homecredit.cz/financing/v1/applications` a na SK `https://api.homecredit.sk/financing/v1/applications`
8. Pokud proběhne *createApplication* a chyba nastane až v prohlížeči --> zkontrolujte minimální a maximální částku. Hodnoty jsou uvedenty v bodě 1.
9. "*Mírně jsme upravili Vaše splátky*" - po dokončení objednávky na eshopu dojde k přesměrování do MyLoan a zde se zobrazí „chybová stránká“ "*Mírně jsme upravili ...*"
  * tato hláška je způsobena předáním chybných parametrů splátek z kalkulačky na vstupní bod. Typicky k tomu dojde tak, že si uložíte klientem preferovanou variantu z detailu košíku, ale neaktualizujete ji poté, kdy dojde ke změně celkové ceny financovaného nákupu (přidán druhý výrobek nebo zpoplatněný druh dopravy, pojištění, příslušenství, ...). Vámi zaslaná výše splátky potom neodpovídá tomu, co vypočítá naše aplikace na základě nové celkové částky nákupu, a proto zobrazí chybovou hlášku. Aplikace totiž kontroluje výši úvěru oproti klientem v kalkulačce zvolené měsíční splátce a *productCode*.
10. Legal line pro marketing --> podmínky jsou na stránce www.homecredit.cz/vop/RU
  * **samostatní zprostředkovatelé** mají mít na svých stránkách uvedeno: Společnost XY je samostatným zprostředkovatelem úvěru. Konkrétní příklady splátek zde (www.homecredit.cz/vop/RU)
  * **vázaní zástupci** mají mít na svých stránkách uvedeno: Společnost XY je vázaným zástupcem. Poskytovatelem úvěru je Home Credit a.s. Konkrétní příklady splátek zde (www.homecredit.cz/vop/RU)
  * **tipaři** mají mít na svých stránkách uvedeno: Poskytovatelem úvěru je Home Credit a.s. Konkrétní příklady splátek zde (www.homecredit.cz/vop/RU)