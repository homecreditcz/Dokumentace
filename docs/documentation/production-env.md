# Production environment

## GDPR
In order to comply with GDPR requirements when using our interface, it is necessary that the following clickable/scrollable text appears on your website in the shopping cart process for our payment method:

> CZ: You acknowledge that your personal data, including your first name, last name, address, email, and phone number, will be transferred to Home Credit a.s., Nové sady 996/25, 602 00 Brno, IČO 26978636, e-mail: info@homecredit.cz, registered in the Commercial Register maintained by the Regional Court in Brno, Section B, File 4401 (hereinafter referred to as 'HC') for the purpose of pre-filling the service request form.

> SK: You acknowledge that your personal data, including your first name, last name, address, e-mail, and telephone number, will be provided to Home Credit Slovakia, a.s., Teplická 7434/147, Piešťany 921 22, ID No. 36 234 176, e-mail: posta@homecredit.sk, registered in the Commercial Register maintained by the District Court of Trnava, Section Sa, File No. 10130/T for the purpose of pre-filling the application for the provision of services

## Prerequisites

To access the interface in the production environment, you need access data (*username + password*) that differs from that used to access the test environment. You can obtain them in the same way as those for accessing the test interface (see [Test Environment](/docs/documentation/dev-env)).

> Enter the parameter specifying the Home Credit product set to be used for the calculation into the repayment calculator - if the goods are included in a special promotion (e.g., "0%"), to which the calculation under the promotional product set applies, it is necessary to use this set in this step - **It is desirable that the e-shop product management allows this property to be easily set (an alternative is to have this option, e.g., for a selected product category)**

## Environment

The production environment is available at
  * CZ: https://api.homecredit.cz/
  * SK: https://api.homecredit.sk/

A sample GET request could be directed, for example, to
  * CZ: [https://api.homecredit.cz/*authentication/v1/partner*](https://apicz-test.homecredit.net/verdun-train/authentication/v1/partner) 
  * SK: [https://api.homecredit.sk/*authentication/v1/partner*](https://apicz-test.homecredit.net/verdun-train/authentication/v1/partner)

You can check whether the production environment is functional (and not undergoing technical maintenance, for example) using the [health check endpoint](https://csoneclicknewfuture.docs.apiary.io/#reference/health-check/api-health-check/api-health-chceck)
* CZ: https://api.homecredit.cz/financing/v1/health
* SK: https://api.homecredit.sk/financing/v1/health

## Payment calculator

There are three main ways to implement a payment calculator in production:

### 1. Partner's own solution 
The most developmentally demanding option is a partner's own solution built on calculation endpoints ([see PSP TD](/docs/api/Reference/installments-calculator-resources) nebo [eshop TD](/docs/api/eshopReference/installments-calculator-resources)).
The advantage of this solution is, for example, the possibility of creating a calculator user interface entirely according to the partner's ideas and UX requirements.

### 2. Partner's partial solution using a JavaScript widget
The golden mean is a solution where the e-shop's own backend uses a JavaScript widget from Home Credit, which handles the frontend part, calculates suitable offers, and, based on the result, prepares the e-shop backend data for calling the endpoint to create a loan application.
   * The JavaScript widget for the repayment calculator solution is available [here](/docs/documentation/widgets/install)

### 3. External repayment calculator issued by Home Credit
> **This is the only option for partners cooperating in the "Tipař" mode**

The simplest way, where, apart from securing the redirection of the client to the repayment calculation page via a simple link, no development is required. 

A sample URI for redirection may look like this, for example
- CZ: **https://kalkulacka.homecredit.cz?productSetCode=COCHCONL&price=1000000&downPayment=0&apiKey=buhGztsSbU2Evsx57tYn&fixDownPayment=false**
 - SK: **https://kalkulacka.homecredit.sk?productSetCode=COCHCONL&price=200000&downPayment=0&apiKey=QWburxYCnSewbQ2zM8Qj&fixDownPayment=false**

   where the individual parameters mean:

   - `productSetCode` – the code of the product set that you have commercially agreed with Home Credit

   - `price` – the financed purchase amount (i.e., the final price after deducting any down payment paid directly by the customer) in halers/cents

   - `downPayment` – down payment in halers/cents

   - `apiKey` - assigned API key

   - `fixDownPayment` – if `true`, down payment support in the calculator is disabled (always zero); if `false`, down payment is supported


---
***Please report any errors from the production environment via helpdesk@homecredit.cz***