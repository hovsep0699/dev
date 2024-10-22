export const poaTest1 = {
  "force": true,
  "document": {
    "type": "00000000",
    "poa": {
      "info": {
        "internalNumber": "12",
        "issuedAt": "10.10.2024",
        "expireAt": "10.10.2025",
        "additionalNumber": "21",
        "reAssignable": "none"
      },
      "predecessors": [
          {
              "russianOrg": {
                  "organization": {
                      "name": "Test",
                      "inn": "1135756756",
                      "kpp": "373844646",
                      "ogrn": "1133947686575"
                  },
                  "directors": [
                      {
                          "russianOrg": {
                              "organization": {
                                  "name": "Test",
                                  "inn": "1135756756",
                                  "kpp": "373844646",
                                  "ogrn": "1133947686575",
                                  "powers": {
                                      "name": "21312",
                                      "issuedAt": "10.10.2020",
                                      "issuedBy": "efwefw",
                                      "certification": "dfwffw"
                                  }
                              },
                              "persons": [
                                  {
                                  "socialNumber": "string",
                                  "inn": "312952231200",
                                  "personalData": {
                                      "fio": {
                                          "name": "Test",
                                          "surname": "Test",
                                          "patronymic": "Test"
                                      }
                                  }
                              }
                              ]
                          }
                      }
                  ]
              }
          }
        ]
      },
      "assignees": [
        {
            "individualEntrepreneur": {
					"name": "IP Samoylov",
                    "ogrn": "316861700133226",
                    "inn": "639287562410",
                    "socialNumber": "949-408-216 44",
                    "personalData": {
                        "fio": {
                                "name": "ssss",
                                "surname": "sss",
                                "patronymic": "dsada"
                        },
					"gender": "male",
					"citizenshipMark": "russian",
					"ernNumber": "123123123123",
					"birthday": "01.01.1995",
					"birthPlace": "Moscow",
					"citizenship": "688",
					"address": "Moscow",
					"contacts": {
						  "phone": "+789999999999",
						  "email": "test@me.com"
						},
					"identificationDocument": {
						  "kind": "10",
						  "serialNumber": "12319",
						  "issuedAt": "10.10.2020",
						  "issuer": "1234567",
						  "issuerCode": "1231234",
						  "expireAt": "10.10.2030"
						}
                    }
            }
        }
    ],
      "powers": {
        "type": "text",
        "isGroupAllowed": true,
        "isRevokeOnReDelegation": true,
        "textPowers": "ifhwiuufhiw"
      }
}
}