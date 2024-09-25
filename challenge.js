const splitter = "\n\n*****************************************************************************************\n"

//---------------------------------------------- Question 1 ----------------------------------------------//
// Write a function "counter" that returns a function that increments and logs a counter variable.
// The counter should start at 0 and increment by 1 each time the returned function is called.
// Use closure to maintain the state of the counter.

function counter() {
    let n=0;
    return function() {
        return ++n
    }
}

const count = counter();
count(); // 1
count(); // 2
count(); // 3

console.assert(count() === 4, "[ Question:1 ] test case has failed." + splitter)


//---------------------------------------------- Question 2 ----------------------------------------------//
// Write a function "greet" that takes a person's name and returns a function that greets the person with the name provided.
// The returned function should log the greeting: "Hello, {name}!" using closure.

function greet(name) {
    return function(){
        return "Hello, "+name+"!"
        }
}

const greetJohn = greet("John");
console.assert(greetJohn() === "Hello, John!", "[ Question:2 ] test case has failed.")
const greetJane = greet("Jane");
console.assert(greetJane() === "Hello, Jane!", "[ Question:2 ] test case has failed." + splitter)


//---------------------------------------------- Question 3 ----------------------------------------------//
// Write a function "sum" that takes an initial number "x" and returns a function that continues summing a number provided.
// Every call should add to the total sum. Use closure to maintain the state of the sum.
// Example:
// const add = sum(10);
// add(5); // 15
// add(2); // 17

function sum(x) {
    let counter = x;
    return function(n){
        return counter +=n
    }

}

const add = sum(10);
console.assert(add(5) === 15, "[ Question:3 ] test case has failed.")
console.assert(add(2) === 17, "[ Question:3 ] test case has failed." + splitter)


//---------------------------------------------- Question 4 ----------------------------------------------//
// Write an async function "delayedHello" that takes a name as an argument and returns "Hello, {name}!" after 2 seconds.
// Use async/await and promises.

async function delayedHello(name) {
    return await new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Hello, "+name+"!")}, 2000)
    })
}

delayedHello("Alice").then((result) => {
    console.assert(result === "Hello, Alice!", "[ Question:4 ] test case has failed." + splitter);
});


//---------------------------------------------- Question 5 ----------------------------------------------//
// Write a function "fetchData" that returns a promise, which resolves with "Data fetched" after 1 second.

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve("Data fetched")}, 1000)
    })
}

fetchData().then((result) => {
    console.assert(result === "Data fetched", "[ Question:5 ] test case has failed." + splitter);
});


//---------------------------------------------- Question 6 ----------------------------------------------//
// Write a function "makeApiCall" that simulates an API call using promises. The function should take a URL as a parameter.
// If the URL is "good-url", resolve the promise with "API call successful" after 1 second.
// If the URL is "bad-url", reject the promise with "API call failed".

function makeApiCall(url) {
    return new Promise((resolve,reject)=>{
        if (url == "good-url")
            setTimeout(()=>{
                resolve("API call successful")},1000)
        else
            reject("API call failed")
    })
}

makeApiCall("good-url")
    .then((result) => {
        console.assert(result === "API call successful", "[ Question:6 ] test case has failed.")
    })
    .catch((error) => {
        console.assert(false, "[ Question:6 ] test case has failed.");
    });

makeApiCall("bad-url")
    .then(() => {
        console.assert(false, "[ Question:6 ] test case has failed.")
    })
    .catch((error) => {
        console.assert(error === "API call failed", "[ Question:6 ] test case has failed." + splitter);
    });


//---------------------------------------------- Question 7 ----------------------------------------------//
// Write a function "sequentialTasks" that executes two async tasks sequentially. 
// The first task is to call fetchData and the second task is to call delayedHello with a name argument.

async function sequentialTasks(name) {
    fetchData()
    return delayedHello(name)
}

sequentialTasks("Bob").then((result) => {
    console.assert(result === "Hello, Bob!", "[ Question:7 ] test case has failed." + splitter);
});


//---------------------------------------------- Question 8 ----------------------------------------------//
// Write a function "parallelTasks" that executes two async tasks in parallel using Promise.all.
// One task should call fetchData, and the other should call delayedHello with a name argument.

async function parallelTasks(name) {
    results = []
    results[0] = await fetchData()
    results[1] = await delayedHello(name)
    return results
}

parallelTasks("Charlie").then((results) => {
    console.assert(
        JSON.stringify(results) === JSON.stringify(["Data fetched", "Hello, Charlie!"]),
        "[ Question:8 ] test case has failed." + splitter
    );
});


//---------------------------------------------- Question 9 ----------------------------------------------//
// Write a function "retryApiCall" that calls makeApiCall with a URL.
// If the call fails, retry it up to 3 times before rejecting the promise.
async function retryApiCall(url) {
    let i = 0
    while(i<3){
    await makeApiCall(url).catch((err)=>{i++ /*, console.log(err, " number of time tried", i)*/})
    }
    if (i == 3){
        throw "API call failed"
    }
}

retryApiCall("bad-url")
    .then(() => {
        console.assert(false, "[ Question:9 ] test case has failed.");
    })
    .catch((error) => {
        console.assert(error === "API call failed", "[ Question:9 ] test case has failed." + splitter);
    });


//---------------------------------------------- Question 10 ----------------------------------------------//
// Write a function "raceToComplete" that takes an array of async tasks and resolves with the result of the first task to complete.
// Use Promise.race.

async function raceToComplete(tasks) {
    return await Promise.race(tasks)
}

const task1 = delayedHello("Fast");
const task2 = delayedHello("Slow");

raceToComplete([task1, task2]).then((result) => {
    console.assert(result === "Hello, Fast!", "[ Question:10 ] test case has failed." + splitter);
});
