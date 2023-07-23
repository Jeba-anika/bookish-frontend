import React from 'react';

const Blogs = () => {
    return (
        <div className='flex flex-col gap-6 my-4 mx-auto'>
            <div className='border p-8 rounded-xl my-4'>
                <h2 className='text-2xl font-bold'>1. What are the different ways to manage a state in a React application?</h2>
                <p>The ways to manage a state in a React application : 1.Local State: Local state is data we manage in one or another component.
                    Local state is usually managed by useState hook. Local state is only to be used when the components are being managed locally.
                    2. Global State: Global state is data we manage across multiple components. Global state is necessary when we want to get and update 
                    data anywhere in our app, or in multiple components at least. We can use useContext hook in React app for managing global state.
                    3. Server State: Data that comes from an external server that must be integrated with our UI state. There might be several states that
                    need to be managed while we fetch or post data to server for example: error or loading state.
                </p>
            </div>
            <div className='border p-8 rounded-xl my-4'>
                <h2 className='text-2xl font-bold'>2. How does prototypical inheritance work?</h2>
                <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object 
                    can inherit the properties and methods of another object. When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with 
                    null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.
                </p>
            </div>
            <div className='border p-8 rounded-xl my-4'>
                <h2 className='text-2xl font-bold'>3. What is a unit test? Why should we write unit tests?</h2>
                <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly,
                     it can help detect early flaws in code which may be more difficult to find in later testing stages. In order to execute Unit Tests, developers write a section of code to test a specific function in software application. Developers can also isolate this function to test more rigorously which reveals unnecessary dependencies
                      between function being tested and other units so the dependencies can be eliminated.
                </p>
            </div>
            <div className='border p-8 rounded-xl my-4'>
                <h2 className='text-2xl font-bold'>4. React vs. Angular vs. Vue?</h2>
                <p>React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.Angular is the perfect choice for those who wish to create refined Single Page Applications (SPA). The framework’s two-way data binding, which automatically synchronizes the data between the database and the client and eases the
                     development process, is another reason to prefer creating Angular applications. With React's easy-to-learn nature, this open-source JavaScript Framework can help you save a significant amount of time since it allows you to create reusable components, in other words, creating packages of code to use across the entire application. In addition, 
                     React may also be the right framework choice for you since it reigns supreme when it comes to search engine optimization (SEO). Vue combines two essential aspects of its rivals: Angular’s two-way data binding and React’s virtual DOM. Free and open-source like the others, Vue distinguishes itself as a flexible and lightweight framework.
                </p>
            </div>
        </div>
    );
};

export default Blogs;