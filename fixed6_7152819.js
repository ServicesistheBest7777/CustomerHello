var request = $request;

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
     'Authorization' : request.headers["authorization"],
     'X-Platform' : 'iOS' ,
     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1', // Spoofed US iPhone User-Agent
     'X-Forwarded-For': '104.28.0.1',  // US-based IP address spoofing
     'X-Geo-Location': '37.7749,-122.4194' // San Francisco, USA coordinates
    }
}

$httpClient.get(options, function(error, newResponse, data){
  
const ent = JSON.parse(data);

let jsonToUpdate = {
        "request_date_ms": 1704070861000,
        "request_date": "2025-01-06T01:01:01Z",
        "subscriber": {
            "entitlement": {},
            "first_seen": "2025-01-06T01:01:01Z",
            "original_application_version": "9692",
            "last_seen": "2025-01-06T01:01:01Z",
            "other_purchases": {},
            "management_url": null,
            "subscriptions": {},
            "entitlements": {},
            "original_purchase_date": "2025-01-06T01:01:01Z",
            "original_app_user_id": "70B24288-83C4-4035-B001-573285B21AE2",
            "non_subscriptions": {}
        }
    };

const productEntitlementMapping = ent.product_entitlement_mapping

for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
  const productIdentifier = productInfo.product_identifier;
  const entitlements = productInfo.entitlements;


  for (const entitlement of entitlements) {
    jsonToUpdate.subscriber.entitlements[entitlement] = {
      "purchase_date": "2025-01-06T01:01:01Z",
      "original_purchase_date": "2025-01-06T01:01:01Z",
      "expires_date": "2025-01-22T01:01:01Z",
      "is_sandbox" : false,
      "ownership_type": "PURCHASED",
      "store": "app_store",
      "product_identifier": productIdentifier
    };

    // Add product identifier to subscriptions
    jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
      "expires_date": "2025-01-22T01:01:01Z",
      "original_purchase_date": "2025-01-06T01:01:01Z",
      "purchase_date": "2025-01-06T01:01:01Z",
      "is_sandbox" : false,
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };
  }
}

body = JSON.stringify(jsonToUpdate);
$done({body});

});
