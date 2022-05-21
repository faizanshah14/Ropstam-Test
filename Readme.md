
# Running
to run both of the repo just clone the repo and install node modules for both frontend and backend seperately and then run this in the root directory
```javascript
    npm start
```

# API document
## due to time limit i am just documenting without formatting it as my normal template is is the first response in the docs 
## Postman collection is available in the repo as well 
> prefix: /
# Employe apis

[Create Employee](#Create-Employee)  
[Add Policy](#Add-Policy)

***

* **Success Result template**  
    <!-- `status code:` 200 -->

    ```javascript
    {
        "result": "ok",
        "data": {
            
        }
    }
    ```

* **Failed Result template **  
`status code:` 400

    ```javascript
    {
        "result:": "error",
        "message": error_string
    }
    ```



# Employee apis details

## Create Employee
_User is created , send verification mail._  

```
 POST employee/createEmployee
```

### QUERY PARAMS

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
email | String | YES | User email
name | String | YES | full name of the user
mobile | String | YES | phone number of the user
city | String | YES | city name of the user

### RETURN

* **Success Result**  
    `status code:` 200

    ```javascript
    {
        "_id": "6288bee2c3d7793950d44940",
        "fullName": "faizan",
        "email": "faizanshaha1496@gmail.com",
        "mobile": "123132131",
        "password": "123456789",
        "city": "islamabad",
        "__v": 0
    }
    ```

* **Failed Result**  
`status code:` 400

    ```javascript
    {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "email": 1
        },
        "keyValue": {
            "email": "faizanshah1496@gmail.com"
        },
        "errmsg": "E11000 duplicate key error collection: EmployeeDB.employees index: email_1 dup key: { email: \"faizanshah1496@gmail.com\" }"
    }
    ```


# Policies apis details

## Add Policy
policy is created._  

```
 POST policy/addPolicy
```

### QUERY PARAMS

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
category | String | YES | FK of category 
policyNumber | String | YES | numebr of policy
policyDescription | String | YES | description of policy 

### RETURN

* **Success Result**  
    `status code:` 200

    ```javascript
    {
    "category": [
        "6288a2378489ad1b54193f0d"
    ],
    "_id": "6288bfcbc3d7793950d44941",
    "policyNumber": "highCat3a",
    "policyDescription": "high policy cat3",
    "__v": 0
    }
    ```

* **Failed Result**  
`status code:` 400

    ```javascript
    {
        errorMessage: errorMessage 
    }
    ```
