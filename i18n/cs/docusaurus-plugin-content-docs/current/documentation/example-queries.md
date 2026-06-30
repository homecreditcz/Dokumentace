# Vzorové dotazy (requesty)

Následuje příklad provolání endpointu pro získání *access tokenu*, díky kterému pak lze provést následné provolání endpointu pro vytvoření žádosti o financování nákupu.

## Authentication

### Request POST 

* CZ
  * https://apicz-test.homecredit.cz/verdun-train/authentication/v1/partner
* SK
  * https://apisk-test.homecredit.sk/verdun-train/authentication/v1/partner

```javascript
Body: { "username": "024242tech",  "password": "024242tech" }
```

### Response POST

```javascript
{
  "expiresIn": 7200,
  "accessToken": "25167daf5c0d489f8b50ab685004ad5f", // použije se pro authorizaci v dalším requestu
  "tokenType": "bearer"
}
```

## Create application

* CZ
  * https://apicz-test.homecredit.cz/verdun-train/financing/v1/applications 
* SK
  * https://apisk-test.homecredit.sk/verdun-train/financing/v1/applications

### Request POST

```http
Header: 
  Content-Type:application/json; charset=UTF-8 
  Authorization: bearer 25167daf5c0d489f8b50ab685004ad5f 
```

```javascript
Body: {
    "customer": {
    "firstName": "Tom",
    "lastName": "Best",
    "email": "jan.urban@homecredit.cz",
    "phone": "+420795787720",
    "addresses": [
                      {
                        "country": "CZ",
                        "city": "Brno",
                        "streetAddress": "Holandská",
                        "streetNumber": "10",
                        "zip": "60500",
                        "addressType": "PERMANENT"
                      }
                   ],
                    "tin": "12333321",
        "vatin": "CZ8402154456"
  },
  "order": {
    "number": "578234700523",
  "variableSymbols": [
                "989595949"
            ],

    
    "totalPrice": {
      "amount": 5200000,
      "currency": "CZK"
    },
    "totalVat": [
      {
        "amount": 210000,
        "currency": "CZK",
        "vatRate": 21
      }
    ],
    "addresses": [
      {
        "country": "CZ",
        "city": "Brno",
        "streetAddress": "Holandská",
        "streetNumber": "22",
        "zip": "60500",
        "addressType": "DELIVERY"
      }
    ],
    
   
    "items": [
      {
                "code": "97878",
                "ean": "9999545",
        "name": "iPhone 6s 32GB SpaceGray",
        "quantity": 1,
        "unitPrice": {
          "amount": 999500,
          "currency": "CZK"
        },
        "unitVat": {
          "amount": 210000,
          "currency": "CZK",
          "vatRate": 21
        },
        "totalPrice": {
          "amount": 999500,
          "currency": "CZK"
        },
        "totalVat": {
          "amount": 210000,
          "currency": "CZK",
          "vatRate": 21
        },
        "productUrl": "https://www.example.com?itemId=10"
       

      }
    ]
  },
  "type": "INSTALLMENT",
  "settingsInstallment": {
    "preferredMonths": 10,
     "preferredInstallment": {
      "amount": 0,
      "currency": "CZK"
    },
    "preferredDownPayment": {
      "amount": 0,
      "currency": "CZK"
    },
    "productCode": "",
    "productSetCode": "MIXHCONL"
  },
  "sentDate": "2017-01-10",
  "agreementPersonalDataProcessing": true,
  "merchantUrls": {
    "approvedRedirect": "http://localhost9",
    "rejectedRedirect": "http://localhost",
    "notificationEndpoint": "http://uzjepekne.cz"
  }
}
```

#### SK varianta dotazu

```http
Header: 
  Content-Type:application/json; charset=UTF-8 
  Authorization: bearer 25167daf5c0d489f8b50ab685004ad5f 
```

```javascript
Body: { 
    "customer": {    
    "firstName": "Honza",    
    "lastName": "Bohaty",    
    "email": "jan.bohaty@homecredit.sk",    
    "phone": "+421795587720",    
    "addresses": [                      
      {                        
        "country": "SK",                        
        "city": "Piešťany",                        
        "streetAddress": "Teplická",                        
        "streetNumber": "147",                        
        "zip": "92122",                        
        "addressType": "PERMANENT"                      
      }                   
    ],                    
    "tin": "12333321",        
    "vatin": "SK8402154456"
  },  
	"order": {    
    "number": "9786661967",  
    "variableSymbols": [                
      "989495949"            
    ],      
  	"totalPrice": {      
      "amount": 240000,      
      "currency": "EUR"    
    },    
    "totalVat": [      
      {        
        "amount": 36000,        
        "currency": "EUR",        
        "vatRate": 15      
      }    
    ],    
  	"addresses": [      
      {        
        "country": "SK",        
        "city": "Piešťany",        
        "streetAddress": "Teplická",        
        "streetNumber": "147",        
        "zip": "92122",        
        "addressType": "BILLING"      
      }    
    ],       
    "items": [      
      {        
        "code": "97878",        
        "ean": "9999545",        
        "name": "iPhone 6s 32GB SpaceGray",        
        "quantity": 2,        
        "unitPrice": {          
          "amount": 120000,          
          "currency": "EUR"        
        },        
        "unitVat": {          
          "amount": 18000,          
          "currency": "EUR",          
          "vatRate": 15        
        },        
        "totalPrice": {          
          "amount": 240000,          
          "currency": "EUR"        
        },        
        "totalVat": {          
          "amount": 36000,          
          "currency": "EUR",          
          "vatRate": 15        
        },        
        "productUrl": "https://www.example.com?itemId=10"      
      }    
    ]  
  },  
  "type": "INSTALLMENT",  
  "settingsInstallment": {    
    "preferredMonths": 24,    
    "preferredDownPayment": {      
      "amount": 50000,      
      "currency": "CZK"    
    },    
    "productCode": "COCONL24",    
    "productSetCode": "COCHCONL"      
  },  
  "sentDate": "2017-01-10",  
  "merchantUrls": {    
  "approvedRedirect": "http://localhost9",    
  "rejectedRedirect": "http://localhost",    
  "notificationEndpoint": "http://tunotifikovat.sk"  }
}
```



Na konci response se nachází atribut s údajem o bráně, na kterou je potřeba klienta obratem přesměrovat, ta může vypadat:

```javascript
{ 
…
"gatewayRedirectUrl": https://myloan.cz40a1.hciapp.net/entry;uuid=d3eddf91-08f9-43cd-a1ae-3222005ec43b 
…
}
```

Po přesměrování se klient dostane na první okno HC aplikace MyLoan, ve které dokončí kroky nezbytné pro schválení nákupu/ úvěru.