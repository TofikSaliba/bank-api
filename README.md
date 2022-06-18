# bank API - documentation

## base URL - https://tofik-bank-api.herokuapp.com/api

### To use must have an API Key, it can be generated on the homePage.

### Use the api key as a query and the key should be: apiKey

### usage example: https://tofik-bank-api.herokuapp.com/api/{End-Point}?apiKey={your-key}

# The following are the end points, and how to use them!

### note: most of the data must be sent in the request body and the param names must be exact!

## To start you must add users, to add users end point: /addUser

### must provide in body user passport ID as passportID and the name as name.

### example:

fetch("https://tofik-bank-api.herokuapp.com/api/addUser?apiKey={your-key}", {
method: "GET",
headers: {
"Content-Type": "application/json",
},
body: {
name: "name",
passportID: "pass ID",
},
});

## To add accounts to users use end point: /addAccount

### must provide in body user passport ID as passportID, cash as cash and credit as credit, credit and cash are optional, default will be set to 0.

### example:

fetch("https://tofik-bank-api.herokuapp.com/api/addUser?apiKey={your-key}", {
method: "GET",
headers: {
"Content-Type": "application/json",
},
body: {
name: "name",
passportID: "pass ID",
},
});
