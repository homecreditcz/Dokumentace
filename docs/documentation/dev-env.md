# Development Environment

An environment where production-like data is available and where you can test the implementation of individual endpoint calls. Any issues with these environments should be addressed via [integrace_eshop@homecredit.cz](mailto:integrace_eshop@homecredit.cz) or another specially agreed channel.

## Prerequisites

- In order to call the test interface (the same applies to production), you must first obtain the *username + password* access data, which will then allow you to obtain an *access token*, without which it is not possible to call individual interface endpoints (more details in [PSP TD](/docs/api/Reference/login-partner) or [eshop TD](/docs/api/eshopReference/login-partner)).
- You should receive your access credentials from the responsible person at HC at one of the introductory meetings on the integration of our payment method.

## Environment

- The test environment is available at:
  * CZ: https://apicz-test.homecredit.cz/verdun-train/ 
  * SK: https://apisk-test.homecredit.sk/verdun-train/
- A sample GET request could be directed, for example, to:
  * CZ: https://apicz-test.homecredit.cz/verdun-train/authentication/v1/partner
  * SK: https://apisk-test.homecredit.sk/verdun-train/authentication/v1/partner

- You can check whether the test environment is functional (and not undergoing technical maintenance, for example) using the health check endpoint (see [TD](../api/Reference/api-health-check)).
  * CZ: https://apicz-test.homecredit.cz/verdun-train/financing/v1/health
  * SK: https://apisk-test.homecredit.sk/verdun-train/financing/v1/health

### Available variants of the consumer API entity in the test environment:

 A) Sale **without down payment** (store ID **024242**)

  > ***username: 024242tech, password: 024242tech***

  > ***apiKey*** for the installment calculator in the [javascript widget](./widgets/install) variant
  > - CZ: `calculator_test_key`
> - SK: `calculator_test_key`

> secret key for hashing [back communication to the e-shop](./communication-security):
> - CZ: `!;8ez62oe{*,_`
  > - SK: `%j:o)t:y/8)`

B) Sale **with down payment** (store ID **024243**)

  > ***username: 024243tech, password: 024243tech***

  > ***apiKey*** for the installment calculator in the [javascript widget](./widgets/install) 
  > - CZ: `calculator_test_key_dp`
  > - SK: `calculator_test_key_dp`

  > secret key for hashing [back communication to the e-shop](./communication-security):
> - CZ: `..dw2{&q!.30`
  > - SK: `wq%?ch.q%55r_`

## Payment calculator

The following payment calculator options are available for testing purposes:

### 1. Partner's own solution - API 
The most developmentally demanding variant is the partner's own solution based on calculation endpoints ([see TD](../api/Reference/cancel-application)). 
The advantage of this solution is, for example, the possibility of creating a calculator user interface entirely according to the partner's ideas and UX requirements.
> Note: It is necessary to use the endpoint variant in the train environment.
> * CZ: https://apicz-test.homecredit.cz/verdun-train/...
> * SK: https://apisk-test.homecredit.sk/verdun-train/...

### 2. Partial partner solution using a JavaScript - Widget
The golden mean is a solution where the e-shop's own backend uses a JavaScript widget from Home Credit, which handles the frontend part, calculates suitable offers, and, based on the result, prepares the e-shop backend data for calling the endpoint to create a loan application.
   * The JavaScript widget for the repayment calculator solution is available [here](./widgets/install)
   * Test values are described in the [widget installation guide](./widgets/install)

### 3. External repayment calculator issued by Home Credit - Standalone
> **This is the only option for partners cooperating in the "Tipař" mode**

The easiest way, where, apart from redirecting the client to the repayment calculation page via a simple link, no development is required

A sample URI for redirection may look like this, for example
- CZ: **https://hc-calc-standalone.cz00t3.hccs.cz/?productSetCode=COCHCONL&price=1000000&downPayment=0&apiKey=calculator_test_key&fixDownPayment=false**
 - SK: **https://hc-calc-standalone.sk00t3.hccs.cz/?productSetCode=COCHCONL&price=200000&downPayment=0&apiKey=calculator_test_key&fixDownPayment=false**
 where the individual parameters mean:

   - `productSetCode` – the code of the product set that you have commercially agreed with Home Credit

   - `price` – the financed purchase amount (i.e., the final price after deducting any down payment paid directly by the customer) in halers/cents

   - `downPayment` – down payment in halers/cents

   - `apiKey` – assigned API key

   - `fixDownPayment` – if `true`, down payment support in the calculator is disabled (always zero); if `false`, down payment is supported


## Test queries

o   Even before implementation, the behavior of the interface can be tested quite easily using the [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) application, which is installed as a plug-in for the Chrome browser

o   Complete sample requests that can be tested using the Postman application can be found at the end of this document (or in [TD](../api/Reference/home-credit-partner-api-order) – however, relevant data must be used for these)

o   The underlying data for sample requests, along with simple instructions, can also be found [here](../api/Reference/create-application)

> NOTE: For testing purposes, always use a financed purchase amount greater than 1000 (100,000 in minor units) for CZ, and greater than 40 (4000 in minor units) for SK

## Working with applications in integration/test mode

When testing in the integration phase, if you want to verify the entire process

- from creating a request for financing of a client's purchase
- through its approval and dispatch/delivery
- to its successful completion

it is necessary to artificially simulate the client's behavior in the Home Credit front-end application (MyLoan). For this purpose, use the special *Change application state* resource, which is described in the technical documentation [here](../api/Reference/home-credit-partner-api-order#24-applicationresponse---major-changes). This resource only works on the testing/integration environments specified in this document (or technical documentation).

### Test run "approved"
There is a special account for approval in the test environment (see above). The account function is activated by filling in the item ***last name = "Trener"*** when creating a request using the *Create Application* resource (in the request call `POST https://apicz-test.homecredit.cz/verdun-train/financing/v1/applications`, `customer.lastName = Trener` must be specified). Subsequently, whether you change the order status using the special *Change state* resource or fill out the application "manually," this application will always be approved. To sign the contract, you will ultimately need an OTP, which is ***123456*** for testing purposes.
