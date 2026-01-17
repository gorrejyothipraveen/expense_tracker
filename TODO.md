# board plan

user Interface :

  just menu :
  - do you want insert items
  - do you want see the expenses

# architecture :

  for inserting , information needed :
  - it is taken by the functions written js - only purpose is to take data
  - after taking data validation happens here
  - after validation sqlite involves here , inserting the data , retrieving the data etc..[done]

  for showing the yearly , monthly and weekly total expenses :
  - handled by the js functions and but taking from the database so , sqlite involves here

# implementation :

  - first write the sql queries the test them
  - after that test the js functionality
  - merge the sql and js functions
  - implement the user interface (it is not tested)