# Exercise 1: NodeJs

## Creating and Modifying an Object

### 1. Create an Object `student`
We start by creating an object called `student` with three properties:
   - `name`: A string with the value `"Marie"`
   - `age`: A number with the value `20`
   - `courses`: An empty array `[]` to store the courses the student is enrolled in

Code:b
```javascript
const student = { 
    name: "Marie",
    age: 20,
    courses: []
};
```

### 2. Access and Modify the Object's Values
Change age: Modify the age property from 20 to 21.
Add grade: Add a new property grade with the value "A".
Code:

```javascript

student.age = 21;
student.grade = "A";
```

### 3. Work with the courses Array
Add elements to courses: Add the courses "Math", "Physics", and "Chemistry" to the courses array using the push method.
Find the index of "Physics": Use the indexOf method to find the position of "Physics" in the courses array.
Slice the array: Use the slice method to create a new array with the first two elements in the courses array. Here we use the starting index (0) and the ending index (2) as parameters to slice the array from the beginning up to, but not including, the third element.
Code:

```javascript
student.courses.push("Math", "Physics", "Chemistry");
const physicsIndex = student.courses.indexOf("Physics");
const firstTwoCourses = student.courses.slice(0, 2);
```

### 4. Display the Results
Log the complete student object to the console.
Display the index of "Physics".
Display the array containing the first two elements of courses.
Code:

```javascript

console.log(student);
console.log(physicsIndex);
console.log(firstTwoCourses);
```

## Creating and Using a Class
### 1. Create a User Class
The User class contains the following properties and methods:

Properties:
- firstName: A string representing the user's first name
- lastName: A string representing the user's last name
- age: A number representing the user's age
- email: A string representing the user's email
- admin: A boolean indicating if the user has administrative privileges

Methods:
- getUserInfo(): Returns a string containing the user's full name and age in the format "Full Name: [firstName] [lastName], Age: [age]". The implementation uses template literals to concatenate the properties.
- setAge(newAge): Updates the user's age to newAge by assigning the new value to the age property.
Code:

```javascript

class User {
    constructor(firstName, lastName, age, email, admin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.admin = admin;
    }

    getUserInfo() {
        return `Full Name: ${this.firstName} ${this.lastName}, Age: ${this.age}`;
    }

    setAge(newAge) {
        this.age = newAge;
    }
}
```

### 2. Testing the User Class
Create an instance: Instantiate a User object with example data.
Display user information: Use the getUserInfo() method to show the user's name and age.
Update and verify age: Use the setAge(newAge) method to update the user's age, then use getUserInfo() again to confirm the change.
Code:

```javascript

const user = new User("John", "Doe", 30, "johndoe@email.com", true);
console.log(user.getUserInfo());

user.setAge(35);
console.log(user.getUserInfo());
```

---
## Running the code
You can run the code locally using `npm start`.


