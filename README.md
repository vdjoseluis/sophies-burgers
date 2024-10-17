
# Sophie's Burgers

Fake website of a fast food restaurant developed for my final FP DAW project.

You can view all content, register to make a reservation or place an order. Also the tasks of the administrator.
## Author

- [José Luis Vásquez Drouet](https://www.github.com/vdjoseluis)


## REST API Reference

#### Public routes
- #### Register a new user

```http
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `email` | **Required** |
| `password` | `password` | **Required** |
| `firstname` | `string` | **Required** |
| `lastname` | `string` | **Required** |
| `address` | `string` | **Required** |
| `phone` | `phone` | **Required** |
| `role` | `enum` | **Optional** - user (default) or admin|


- #### Login

```http
  POST /api/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `email` | **Required** |
| `password` | `password` | **Required** |

------------------------------------------------------------------------------
#### Routes for registered users

- #### Get all products
```http
  GET /api/product/list
```

- #### To book a table
```http
  POST /api/booking/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date_booking` | `date` | **Required** |
| `time_booking` | `time` | **Required** |
| `people` | `int` | **Required** |


- #### Get all my bookings
```http
  GET /api/booking/mybookings
```

- #### Place an order - generate a ticket with items
```http
  POST /api/ticket/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `delivery_option` | `enum` | **Required** pickup or delivery |
| Items: | | min 1 or many |
| `product_id` | `int` | **Required** |
| `Quantity` | `int` | **Required** |


---------------------------------------------------------------------------------

#### Shared routes, own or with role: admin

- #### Search user by id or phone
```http
  GET /api/user/search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Optional** |
| `phone` | `phone` | **Optional** |
| At least one is **required** |


- #### Update user data
```http
  PUT /api/user/update/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `email` | **Optional** |
| `password` | `password` | **Optional** |
| `firstname` | `string` | **Optional** |
| `lastname` | `string` | **Optional** |
| `address` | `string` | **Optional** |
| `phone` | `phone` | **Optional** |
| `role` | `enum` | **Optional** - user (default) or admin|

- #### Delete user
```http
  DELETE /api/user/delete/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required** |


- #### Change booking status
```http
  PUT /api/booking/changestatus/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required** |
| `status` | `enum` | **Required** cancelled or done (only admin) |


-----------------------------------------------------------------------
#### Admin routes
- #### Get all users
```http
  GET /api/user/list
```


- #### Get all bookings
```http
  GET /api/booking/list
```


- #### Search booking by id or phone
```http
  GET /api/booking/search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Optional** |
| `phone` | `phone` | **Optional** |
| At least one is **required** |


- #### Register a new product
```http
  POST /api/product/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `price` | `float` | **Required** |


- #### Get product by id
```http
  GET /api/product/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required** |

- #### Update product data
```http
  PUT /api/product/update/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required** |
| `name` | `string` | **Optional** |
| `price` | `float` | **Optional** |

- #### Delete a product
```http
  DELETE /api/product/delete/:id
```

- #### Get all tickets
```http
  GET /api/ticket/list
```