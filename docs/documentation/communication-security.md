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
- Salesroom: **034342**
- Hash key: `(u$5a$r3#8t+ug`
- String for hashing: `77328b0c-e50f-408e-b9a8-301af0c2748b:CONFIRMED:OBJ-2026-73104:TO_SHIP:0`
- Format: Hex (uppercase)

**Calculating checksum for v3:**
- format: `#applicationId:#applicationStatus:#orderNumber:#orderStatus:#downPayment`
- example (with down payment): `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:100000`
- example (without down payment): `b452a713-3052-4b86-9b53-918e3abc5988:CONFIRMED:449890:IN_PROCESS:0`
- `downPayment` in checksum input is in minor units (e.g. cents).

**Example of a notification message:**

```json
{
  "notificationContent": {
    "applicationId": "77328b0c-e50f-408e-b9a8-301af0c2748b",
    "applicationStatus": "CONFIRMED",
    "orderNumber": "OBJ-2026-73104",
    "orderStatus": "TO_SHIP",
    "downPayment": {
      "value": 0,
      "currency": "CZK"
    },
    "notificationDate": "2026-10-19T21:11:56+02:00",
    "sequenceNumber": 1
  },
  "sentDate": "2026-10-19T21:14:02+02:00",
  "checksum": "E560793AE29860E87524E338628572DD4FEEB73CEE803502483DFE6C7AB63DA9A4823F997AC31A0BF7618168AF8A362B8917CEAB8AD6A82AC30C484A1A6E16F2"
}
```

## Securing information transmitted when redirecting the client back to the partner website

When redirecting the client back to the partner website after completing the process, we also add some data to the link that the e-shop can use. Again, to ensure the authenticity of the transmitted information, a checksum is added to the body of the link. The same mechanism is used to construct it as for constructing the checksum for notifications.
