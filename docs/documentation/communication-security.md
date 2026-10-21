# Securing reverse communication with partner e-shops

## Securing transmitted notifications

The content of notifications sent to partner e-shops is protected against information tampering or falsification by potential attackers by adding a checksum constructed from the message content and a *secret key* that is not part of the message. 

### How it works in practice (API v1/v2)

These two attributes are encrypted: order number (`orderNumber`) and request status (`stateReason`). Both attributes are assembled into the string `#orderNumber:#stateReason` (the parameters are separated by a colon). The string is then encrypted using the HMAC hash function with the SHA512 algorithm and the `secret key` and assigned to the body of the message as the `checkSum` attribute in this form.

> The currently valid ***secret key*** for the test environment for a given test store can be found [here](/docs/documentation/dev-env "Test environment")

> You should receive the ***secret key*** for the production environment from the responsible person at HC at one of the introductory meetings on the integration of our payment method.

### Example (API v1/v2)
- signed request with order number: `018884`
- secret key: `n#z?9:;a%&(\*er2`  
- the string for hashing will be as follows: `018884:PROCESSING_SIGNED`
- the resulting checksum will then be: `f61c69a259b702d564b2032e554984dec3b713ff7bdde17fcb727d403ea0d730816f46ad2bbc06a1914225d5dfba0396927dbf1b0698081814877b5486950a15`


### How it works in API v3

In API v3 the checksum is calculated from these attributes of `notificationContent`: application ID (`applicationId`), application status (`applicationStatus`), order number (`orderNumber`), order status (`orderStatus`) and down payment (`downPayment.value`). They are assembled into the string `#applicationId:#applicationStatus:#orderNumber:#orderStatus:#downPayment` (the parameters are separated by a colon). The down payment is given in minor units (halers/cents); if there is no down payment, `0` is used. The string is hashed with the same HMAC function with the SHA512 algorithm and the `secret key` and is sent in the message as the `checksum` attribute (in v1/v2 it was `checkSum`).

### Example (API v3)
- secret key (test store **034342**, see [Test environment](/docs/documentation/dev-env "Test environment")): `(u$5a$r3#8t+ug`
- notification with application `b452a713-3052-4b86-9b53-918e3abc5988`, status `CONFIRMED`, order number `449890`, order status `IN_PROCESS` and down payment `100000` (1 000 CZK)
- the string for hashing will be as follows: `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:100000`
- the resulting checksum will then be: `65fde9a7fe6246f950eeadfb01f3a3452641f367ee6c6bffe03be24a1b9fb6df4c48cb02e55901634e10fac0269bef3c0f059bf1119e9da50f66bbd918aae880`
- the same notification without a down payment – string for hashing: `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:0`, resulting checksum: `06fa0950bcaffcea73a3a3add6a0f9c20a70424aece745a1724d5ab5a8ad4d70ddccb859b023221e31c491810e848e13aa355e238c0f100b80f2f0f80f0986b6`

> The checksum is a hexadecimal string. Compare it case-insensitively – it may be sent in upper case.

## Securing information transmitted when redirecting the client back to the partner website

When redirecting the client back to the partner website after completing the process, we also add some data to the link that the e-shop can use. Again, to ensure the authenticity of the transmitted information, a checksum is added to the body of the link. The same mechanism is used to construct it as for constructing the checksum for notifications.
