curl -X POST localhost:3000/api/donations \
-d '{"user":"123456789012345678901234", "name":"Toster", "category":"thatdog", "entryDate":"10/31/23", "donor":"123456789012345678901234", "value":"123546789012354678901234" }' | jq .
