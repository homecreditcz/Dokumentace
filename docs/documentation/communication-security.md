# Securing reverse communication with partner e-shops

## Securing transmitted notifications

The content of notifications sent to partner e-shops is protected against information tampering or falsification by potential attackers by adding a checksum constructed from the message content and a *secret key* that is not part of the message. 

### How it works in practice 

These two attributes are encrypted: order number (`orderNumber`) and request status (`stateReason`). Both attributes are assembled into the string `#orderNumber:#stateReason` (the parameters are separated by a colon). The string is then encrypted using the HMAC hash function with the SHA512 algorithm and the `secret key` and assigned to the body of the message as the `checkSum` attribute in this form.

> The currently valid ***secret key*** for the test environment for a given test store can be found [here](/docs/documentation/dev-env "Test environment")

> You should receive the ***secret key*** for the production environment from the responsible person at HC at one of the introductory meetings on the integration of our payment method.

### Example 
- signed request with order number: `018884`
- secret key: `n#z?9:;a%&(\*er2`  
- the string for hashing will be as follows: `018884:PROCESSING_SIGNED`
- the resulting checksum will then be: `f61c69a259b702d564b2032e554984dec3b713ff7bdde17fcb727d403ea0d730816f46ad2bbc06a1914225d5dfba0396927dbf1b0698081 814877b5486950a15`

## Securing information transmitted when redirecting the client back to the partner website

When redirecting the client back to the partner website after completing the process, we also add some data to the link that the e-shop can use. Again, to ensure the authenticity of the transmitted information, a checksum is added to the body of the link. The same mechanism is used to construct it as for constructing the checksum for notifications.
