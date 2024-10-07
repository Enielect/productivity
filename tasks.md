Need to know the createdAt date of the first taskGroup Created, and we define weekly progress from the moment.

filter taskGroups by the weeks cretaed in this format:

```js
const result = [
    "12-2023"//: [{id: 1, }, {id: 2}, ...], //task groups fot the 12 week of the year
    "13-2023" //: [{id: 4}, {id: 6}, ...]
    
]
```
~~so we'd loop over this arrray(sorry object) to get the links to be display for weekly taskGroups.~~
so we'd loop over this array and pass the values to dyamic routes on the links that they'd each represent.

we would need a way to convert this (weekday-year) formate to a query parameter for to get the tasks for that week.

```js
//so we'd say on click of the link for a particular week we'd add a dynamic route to take one to the days of that week(we don't need to fetch any data to display these. we'd just define a convention starting our numbering from 0 - 6) 0 for Sunday and 6 for saturday.
```
since we have the week number, and the tasks groups for that particular week, we could then sort the available taskGroups based on the day created as in (20/05/2024) from the date created as in (Date type), and then create an object that maps this key (20/05/24) to the task groups that belong to each respective one.

We use the above to create a list of link that navigate to that page. In the page we retrieve this date formatted string and use it to filter the object we retrieved in the previous page(we fetch it again), and then we are able to display tasks for a particular day.

we'd use a dynamic route and pass the kay ad the route parameter.
