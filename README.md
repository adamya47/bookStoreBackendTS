ALL THE ENDPOINTS AND INPUT INFO

FOR THIS BOOKSTORE BACKEND SERVER ( https://bookstore-backend-ts.vercel.app )

*Get all users - https://bookstore-backend-ts.vercel.app/api/v1/helper/allUsers

*Get all Books -  https://bookstore-backend-ts.vercel.app/api/v1/helper/allBooks

*Get all transactions -                     https://bookstore-backend-ts.vercel.app/api/v1/helper/allTransactions

*Enter bookname or term to find-     https://bookstore-backend-ts.vercel.app/api/v1/search/ByName?term=A          (INPUT IS TAKEN in the form of query "term" )

*Find Books by rent range -           https://bookstore-backend-ts.vercel.app/api/v1/search/byRange?minRent=10&maxRent=45 (INPUT-query- minRent and maxRent (number format))

*Filter by category+bookname+rent range-  https://bookstore-backend-ts.vercel.app/api/v1/search/filterBooks?category=fiction&bookname=B&minRent=10&maxRent=30 (INPUT TAKEN BY QUERY(category,bookname,minRent,maxRent)

*Rent a book transaction-                 https://bookstore-backend-ts.vercel.app/api/v1/transaction/rented (INPUT bookname,username,issueDate(Date) )

*Returna a book transaction -            https://bookstore-backend-ts.vercel.app/api/v1/transaction/returned (INPUT bookname,username,returnDate(Date) )

*Get totalRent earned by a book-          https://bookstore-backend-ts.vercel.app/api/v1/transaction/totalRent (INPUT BOOKNAME)

*No of books rented and returned in a particular date range      https://bookstore-backend-ts.vercel.app/api/v1/transaction/totalRentedAndReturned?startDate=2024-01-01&endDate=2024-09-15       (input from query startDate and endDate)


*Create a user-                           https://bookstore-backend-ts.vercel.app/api/v1/create/userCreate  (INPUT username,password)

*Create a book entry -                 https://bookstore-backend-ts.vercel.app/api/v1/create/bookCreate      (INPUT bookname,category, rentPerDay(NUMBER) )

