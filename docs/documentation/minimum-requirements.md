# Minimum Requirements

Here is a list of steps necessary to fulfill the minimum functional implementation variant:

1. Payment calculator located in the product details - calculator variant referred to as **_Standalone for Tipsters_**. 
  * This is just a link containing the **price** (in cents/euro cents), **product set code** (*COCHCONL*) and **API key** (each e-shop has its own).
  * This link opens a new window above the existing page. **This calculator is for informational purposes only**; clicking on "Select installments" will simply close the window - the customer must then add the item to their cart.
2. In the cart, in the payment method selection, allow the customer to select installments.
3. After completing the order in your e-shop, you will create an application (*Application*) using **_Create application_**, with the client selecting the installment parameters in HC - you do not need to deal with this in any way, just redirect the client to HC (to *redirect URI*), where they will fill in the necessary information and request installments
4. Notifications and other things are no longer necessary; you can now manage individual order statuses through our Webclient application.