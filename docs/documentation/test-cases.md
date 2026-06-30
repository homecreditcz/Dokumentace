# Testing scenarios

Scenarios:
1. **Calculator in product details**
  * **API**
    * Tipař cannot be used in the Czech Republic.
  * **Calculator widget** opens on the e-shop page; the client does not leave the page. When the "Select installments" button is clicked, the e-shop saves the values of the client's preferred installments, see description at [widgets](./widgets/install).
    * Cannot be used by Tipař in CZ
  * **Standalone calculator** - this only involves inserting a link into the product details, the calculator opens, and after setting the preferred installment option and pressing the "Select installments" button, it simply closes - the selected values are not returned.
    * Only for partners in CZ - primarily created for Tipař

---

2. **CreateApplication**
> No emails or SMS messages are sent in the Train environment

* To simulate different contract statuses, check [major changes](../api/Reference/home-credit-partner-api-order#24-applicationresponse---major-changes).
* A) Customer flow **when rejected** in MyLoan (HC front-end): 
  * Just select *Exposed person - Yes* => the contract will always be rejected
* B) Customer flow **when approved** in MyLoan (HC front-end) with return to the e-shop:
  * Enter "*Trener*" in the last name field
  * After being redirected to MyLoan (HC front-end), enter your birth number in the correct format, e.g. *451112 345*
  * After approval, sign the contract using the OTP "*123456*"