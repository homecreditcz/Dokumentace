# Průběh procesu
Níže najdete popis procesního flow nákupu v bodech:

1. **Kalkulačka v detailu produktu ve vašem e-shopu** (skrz API, javascriptový widget, standalone pro Tipaře). Když si klient „Vybere splátky“, tak jej přesměrujete do košíku s vybraným zbožím a přednastavíte mu platební metodu *na splátky*. Klientem preferovanou variantu **si uložíte** (*neplatí pro standalone variantu kalkulačky*) a po dokončení objednávky v košíku vložíte do *createApplication* v atributu *settingsInstallments*. Tím se klientem preferovaná varianta propíše k nám, díky čemuž již klienta nebudeme nutit, aby si znovu vybíral splátkový produkt v našem prostředí 
> Předávání nastavení klientem preferovaných splátek nefunguje u Standalone kalkulačky

> Do kalkulačky se na vstupu vyplňuje parametr udávající produktovou sadu Home Creditu - pokud je zboží zařazeno do speciální akce (např. "Za 0%"), na které se vztahuje kalkulace pod akční produktovou sadou, je potřeba tuto sadu v tomto kroku použít - **Je žádoucí, abyste ve správě produktů vašeho e-shopu měli možnost tuto vlastnost jednoduše nastavovat (alternativou je mít tuto možnost např. pro vybranou kategorii produktů)**

2. **V košíku ve výběru platební metody** klientovi zobrazte vybranou variantu splátek a dejte mu možnost si vybranou variantu změnit v kalkulačce. V případě, že si do košíku přidal po výběru splátek ještě další zboží/příslušenství/pojištění/... (ověřte si cenu), zobrazte mu kalkulačku znovu (je potřeba, aby byla zvolena odpovídající varianta splátek pro platnou financovanou cenu nákupu).
 
3. **_Zastaralé/obsolete: Precheck v košíku u výběru platební metody._** Na základě alespoň 2 údajů vám vrátíme informaci, zda má smysl, aby klient žádal o splátky, nebo mu máte rovnou nabídnout jinou platební metodu (je potřeba umístit souhlas pro klienta! - viz [podmínky GDPR](./production-env))

4. **Dokončení objednávky u vás na eshopu**

5. **Vytvoření žádosti** pomocí *createApplication* **a přesměrování klienta k nám**, kde doplní nezbytné údaje a požádá o splátky

6. **Posouzení u nás + sdělení výsledku klientovi**

7. **Přesměrování klienta zpět do e-shopu** na jednu ze dvou vámi dodaných adres : pro schválení / pro zamítnutí

8. **Zobrazení děkovací stránky** v případě schválení, **nebo zobrazení výběru jiné platební metody** již bez splátek

9. **Předávání notifikací do eshopu o změnách stavu objednávky**, vyskladňuje se při stavu *READY_TO_SHIP* (pokyn k vyskladnění)

10. **Potvrzení odeslání** zboží (API/Webclient) klientovi, **nebo potvrzení doručení** zboží klientovi (API)
> Vždy je třeba si vybrat právě jednu variantu. Nikdy je nekombinujte!

11. **Ověření doručení zboží** klienotvi na straně HC **a následné proplacení**
