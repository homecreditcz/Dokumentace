# Process Flow

Below you will find a description of the purchase process flow in points:

1. **Calculator in the product details in your e-shop** (via API, JavaScript widget, standalone for Tipaře). When the client selects "Installments," you redirect them to the shopping cart with the selected goods and preset the payment method to *installments*. You **save** the client's preferred option (*not applicable for the standalone calculator option*) and, after completing the order in the shopping cart, enter it into *createApplication* in the *settingsInstallments* attribute. This will transfer the client's preferred option to us, so we will no longer force the client to select an installment product again in our environment. 
> Transferring the client's preferred installment settings does not work with the Standalone calculator.

> A parameter specifying the Home Credit product set is entered into the calculator at the input stage - if the goods are included in a special promotion (e.g., "0%"), which is subject to calculation under the promotional product set, it is necessary to use this set in this step. **It is desirable that you have the option to easily set this property in your e-shop's product management (an alternative is to have this option, for example, for a selected product category).**

2. **In the shopping cart, in the payment method selection**, show the customer the selected installment option and give them the option to change the selected option in the calculator. If the customer has added other goods/accessories/insurance/... to the shopping cart after selecting the installment plan (check the price), display the calculator again (it is necessary to select the appropriate installment plan for the valid financed purchase price).
 
3. **_Deprecated/Obsolete: Precheck in the shopping cart when selecting a payment method._** Based on at least 2 pieces of information, we will let you know whether it makes sense for the customer to request installments or whether you should offer them a different payment method right away (you need to get the client's consent! - see [GDPR terms and conditions](./production-env))

4. **Complete the order on your e-shop**

5. **Creating a request** using *createApplication* **and redirecting the customer to us**, where they will fill in the necessary information and request installments

6. **Assessment by us + notification of the result to the customer**

7. **Redirecting the customer back to the e-shop** to one of the two addresses you provided: for approval / for rejection

8. **Display of a thank you page** in case of approval, **or display of a selection of another payment method** without installments

9. **Forwarding notifications to the e-shop about changes in the order status**, shipped when the status is *READY_TO_SHIP* (shipping instruction)

10. **Confirmation of shipment** of goods (API/Webclient) to the client, **or confirmation of delivery** of goods to the client (API)
> You must always choose one option. Never combine them!

11. **Verification of delivery of goods** to the client on the HC side **and subsequent payment**
