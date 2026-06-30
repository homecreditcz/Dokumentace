# Minimální požadavky

Zde je výčet kroků nezbytných pro naplnění mimimální funkční varianty implementace:

1. Kalkulačka splátek umístěná v detailu produktu - varianta kalkulačky označovaná jako **_Standalone pro Tipaře_**. 
  * jde jen o odkaz obsahující **cenu** (v haléřích/eurocentech), **kód produktové sady** (*COCHCONL*) a **APIkey** (každý e-shop má vlastní)
  * tento odkaz otevře nové okno nad stávající stránkou. **Tato kalkulačka je pouze informativní**, kliknutím na "Vybrat splátky" se okno pouze zavře - zákazník tedy musí následně vložit zboží do košíku.
2. V košíku ve výběru platební metody klienotvi umožníte vybrat splátky.
3. Po dokončení objednávky ve vašem eshopu u nás založíte žádost (*Application*) pomocí **_Create application_**, přičemž parametry splátek si klient vybírá až v HC - toto tedy nemusíte nijak řešit, pouze klienta přesměrujete do HC (na *redirect URI*), kde doplní nezbytné údaje a požádá o splátky
4. Notifikace ani další věci již nejsou potřeba, jednotlivé stavy objednávek již obsloužíte přes naší aplikaci Webclient.
