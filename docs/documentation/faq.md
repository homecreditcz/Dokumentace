# FAQ

1. When testing in a browser, always use an incognito window and launch new requests via CTRL+F5
2. Widget calculator – **there are separate versions for CZ and SK, they cannot be mixed**, available [here](/docs/documentation/widgets/install)
3. Calculator not working, displaying message "Something went wrong":
  * CZ: check the minimum loan amount, sale price minus down payment must be greater than 1000 00 CZK. Maximum amount must be less than 250 000 00 CZK. Currency values are in MINOR UNITS format, i.e. including hellers without decimal point.
  * SK: check the minimum loan amount, sale price minus down payment must be greater than 40 00 €. Maximum amount must be less than 10 000 00 €. Currency values are in MINOR UNITS format, i.e. including cents without decimal point.
  * check Product Set values: **_COCHCONL_**
  * CZ: ApiKey value: calculator_test_key and URL https://apicz-test.homecredit.cz/verdun-train/public/v1/calculator/
  * SK: ApiKey value: calculator_test_key_sk and URL https://apisk-test.homecredit.sk/verdun-train/public/v1/calculator/
4. Calculator-widget returns error "Something went wrong":
  * when you press F12 in Chrome browser, error 422 appears –-> this is due to an incorrect parameter, likely ApiKey
5. *createApplication* returns error 422 – duplicate Order number --> change the Order number in your data to a different number
6. *createApplication* returns error 422 and Address.type is in the description --> In the JSON data being sent, select:
  * Customer: Permanent or Contact (do not use Billing)
  * Order: Billing or Delivery
7. *createApplication* returns error 404
  * check that when calling *createApplication* you don't have an unnecessary "/" after the URL. This doesn't matter when calling for a token, but it must not be present for *createApplication*. Correct URLs are CZ `https://api.homecredit.cz/financing/v1/applications` and SK `https://api.homecredit.sk/financing/v1/applications`
8. If *createApplication* completes and an error occurs in the browser --> check the minimum and maximum amounts. Values are listed in point 1.
9. "*We slightly adjusted your installments*" - after completing the order in the e-shop, a redirect to MyLoan occurs and an "error page" "*We slightly adjusted ...*" is displayed
  * this message is caused by passing incorrect installment parameters from the calculator to the entry point. Typically, this happens when you save the client's preferred option from the cart detail, but don't update it after the total price of the financed purchase changes (a second product added or paid shipping type, insurance, accessories, ...). The installment amount you sent then doesn't match what our application calculates based on the new total purchase amount, and therefore displays an error message. The application checks the loan amount against the monthly installment selected by the client in the calculator and *productCode*.
10. Legal line for marketing --> terms are on page www.homecredit.cz/vop/RU
  * **independent intermediaries** should have on their pages: Company XY is an independent loan intermediary. Specific examples of installments here (www.homecredit.cz/vop/RU)
  * **tied agents** should have on their pages: Company XY is a tied agent. The loan provider is Home Credit a.s. Specific examples of installments here (www.homecredit.cz/vop/RU)
  * **referrers** should have on their pages: The loan provider is Home Credit a.s. Specific examples of installments here (www.homecredit.cz/vop/RU)