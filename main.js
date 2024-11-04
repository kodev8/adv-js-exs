// 1. **Create an object `student`** with the following properties:
//     - `name`: "Marie"
//     - `age`: 20
//     - `courses`: an empty array `[]`
// 2. **Access and modify the object's values**:
//     - Change the `age` property to 21.
//     - Add a new property `grade` with the value "A".
// 3. **Work with the `courses` array of the object**:
//     - Add the elements "Math," "Physics," and "Chemistry" to the `courses` array using the `push` method.
//     - Use the `indexOf` method to find the index of "Physics" in the `courses` array.
//     - Use the `slice` method to create a new array containing the first two elements of `courses`.
// 4. **Display the results**:
//     - Log the complete `student` object with the modifications to the console.
//     - Display the index of "Physics."
//     - Display the new array created with `slice`.

// ---

// 1. **Create a `User` class** with the following properties and methods:
//     - Properties:
//         - `firstName`: String
//         - `lastName`: String
//         - `age`: Number
//         - `email`: String
//         - `admin`: Boolean
//     - Methods:
//         - `getUserInfo()`: Returns a string containing the user's full name and age in the format "Full Name: [firstName] [lastName], Age: [age]".
//         - `setAge(newAge)`: Modifies the user's `age` property to the specified `newAge`.
// 2. **Test the `User` class**:
//     - Create an instance of the `User` class.
//     - Use the `getUserInfo()` method to display the user's full name and age.
//     - Use the `setAge(newAge)` method to update the user's age, then use `getUserInfo()` again to verify the change.

const student = { 
    name: "Marie",
    age: 20,
    courses: []
}

student.age = 21;
student.grade = "A";

student.courses.push("Math", "Physics", "Chemistry");
const physicsIndex = student.courses.indexOf("Physics");
const firstTwoCourses = student.courses.slice(0, 2);

console.log(student);
console.log(physicsIndex);
console.log(firstTwoCourses);

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

const user = new User("John", "Doe", 30, "johndoe@email.com", true);
console.log(user.getUserInfo());

user.setAge(35);
console.log(user.getUserInfo());
 