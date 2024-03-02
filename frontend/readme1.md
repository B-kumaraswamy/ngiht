folder/file structure :
Why backend and frontend? Why (create-react-app .) within frontend?

Our objective is to develop the backend in the backend folder and react/frontend related development in the frontend folder. 

(Create-react-app .) creates the folders like src, public, node modules in the current directory (ie frontend here). If we specify create-react-app appname then folders will get created in the specified appname folder. 

--------------------------

What commands are to be given in the terminal of both backend and frontend to setup the project ?

Backend: 
1) npm init -y  (creates package.json file and -y is for default values about the application like name, version, scripts etc)

2) npm install express mongoose cors bcrypt jsonwebtoken
why express ? As a part of MERNstack, E stands for express. Instead of plain javascript...ES6 syntaxes is used. For ex: import express from 'express';  As part of ES6 syntaxes, "type" : "module"  has to be included in the package.json file. 

why cors? : It is a middleware to enable the cross origin resource sharing. For ex: Frontend port is 3000 and backend port is 8080. So, to establish communication/resource sharing(ie request, response) between frontend and backend, cors comes to the rescue. 

why mongoose? : As a part of MERNstack, the database used here is M-Mongo db. Mongoose is a module which helps in interacting with mongo db. 

why bcrypt ? : Allows to encrypt and decrypt the password. 
Why jsonwebtoken? : Allows to generate jwt-token which wil be stored as a cookie in the frontend(for authentication and authorization). 

3) npm install nodemon --save-dev 
Nodemon monitors for the changes in the source code and automatically restarts node js application.
This command allows us to install nodemon as a dev dependency. Upon running the server using nodemon index.js for the first time in the terminal, nodemon keeps running until we stops the server(ie ctrl + c) whenever we save a file by making changes to the code. 

--save-dev is used to make it as a development dependency and not in production phase. 
The development phase is focused on creating the software, while the production phase is focused on deploying, maintaining, and supporting the software in a live environment.

Front end:
1) (npx create-react-app .)
2) npm install js-cookie, react-router-dom etc. 

------------------------------------

Node follows MVC design pattern. M-model, V-view(these files will be saved with ejs extention and views are used when there is no frontend framework. Since we are using frontend react framework, views help is not required.)
C-controllers (It acts as a bridge between model and view. But we used routes which also acts as controllers)

------------------------------------
Front end flow questions ? 

protected route... authorization... rendering components.. useeffect
Protectedroute file allows us to write common code required for all the necessary components that we want to authorization here. 
 <Route exact  path = '/home' element = {<ProtectedRoute component = {HomeComponent}/>}/>
 In the above code line.. we shouldn't directly render the component to be protected. Instead we pass such component as a prop to the protectedRoute. 

const { component } = props;
const Component = component;

Upon taking required components as a prop, renaming the components within the props to PascalCase (see above two lines) is compulsory because Components always starts with capital letter and we've to render the components taken as props. So renaming does the job. 

Component life cyle in react and useEffect (ie in the protectedRoute)?
First JSX element and useState(replaces the need for a constructor to initialize state.) wil be rendered (ie mounting phase). 
Then whatever the effects present in the application (useEffect replicate componentDidMount, componentDidUpdate and componentWillUnmount)

-------------------
Why are we using useEffect in the protectedRoute ?
        if (token) {
          setLoggedIn(true);

        }
Goal : Authorization ie localhost:8080/admin should navigate to login page (localhost:8080/login) when the user is unauthorized(absence of jwtToken) or not logged in. 

The above lines should be executed only once but if we don't use useEffect, setLoggedIn(true) will update the state and re-renders the application (because component re-renders upon a change in the state). On re-rendering setLoggedIn(true) executes again and results in infinite loop. To avoid this we need useEffect. It makes us to run the code only once. 
---------------------------------

Even if we use useEffect, still we occur an error in the protectedRoute. What's that and why?
Based on how component life cycle in react works, useEffect will be executed after rendering the jsx and useState. 

code flow : 
Because of const [loggedIn, setLoggedIn] = useState(false) in the context.. on hitting the url (localhost:3000/admin), Though the user is authenticated and token is generated and set in the cookie, still user will be navigated to login page. And the reason is life cyle of react components. Though we wrote useEffect, it will be executed last. 

As we need useEffect to get executed before loading the jsx, we maintain another state ie 
const [Loading, setLoading] = useState(true). 
Upon adding the above line, jsx is returned (ie  if (Loading) {
        return <div>Loading....</div>
    }) 
    and useEffect gets executed ---> loggedIn is set as true ---> concerned component is rendered (ie
    ie return loggedIn ? <Component/> : <Navigate to = '/'/>)


--------------------------------------------------

Need for context in this project? 
the state loggedIn, setLoggedIn has to be passed to signupanlogin.js(for login purpose) and header.js(for logout purpose). And we need authorization of components like admin, products. So there comes the need to maintain the state and to avoid prop drilling, we use context. Such state is maintained in HOC(higher order component) of these components ie App.js here. 

-----------------------------------

Upon logging in, you've to verify if the credentials already exist in the database or not. Explain the flow of the code. 

The user will enter the credentials (ie username, password). But in order to confirm the presence of these credentials in the db, we need to compare the password given by the user with hashedPassword(which is stored in the db while the same user created/signup an account.) So to encrypt the password and later compare, we use bcrypt. 
We encrypt the password when user creates an account (ie backend --> route --> signup.js here) and 
compare the hashedPassword with the password given by the user in the backend --> route --> login.js 

const hashedPassword = await bcrypt.hash(password, 10)
    const user = new signupuser({
        username, password : hashedPassword, mobile, email
    })

username, password, mobile, email are the fields(columns in SQL) in the db. So the hashedPassword must be saved with existing field name ie password. We can do that by writing password : hashedPassword.

--------------------------------


About pushing the product details pushing to the database as an Admin? 

 <input type="text" onChange={(event) => onUpdatingState('id', event.target.value)}/>
 <input type="text" onChange={(event) => onUpdatingState('title' ,event.target.value)}/>


Usually when only one variable is maintained in the state, and to update the state with the value given in the input tag... i wrote <input type="text" onChange={(event) => setState(event.target.value)}/>
But here, we maintained more than one variable in the state and we've to update each state individually with the corresponding value as given in the input tag and at the sametime we should keep remaining variable intact. 
To make that happen we'll write a function which takes (key, inputvalue) as arguments. Here key is dynamic text (for ex: 'id', 'title', 'vendor'). 

 const onUpdatingState = (key, value) => {
        console.log('key in function', key, 'value is', value)
        setProduct((prevProduct) => ({
            ...prevProduct,
        [key] : value
        }))
    }

prevProduct["id"] works
and prevProduct."id" will not work. 
Since we already destructured the prevProduct, we only use [key]. 

const fullName = {name : "john", age : 20}

fullName.name = "James" updates the name. Output is  {name : "James", age : 20}

const propertyName = "name" (here key = 'id', 'title', 'vendor' etc)
fullName[propertyName] = "Shelton". Output is  {name : "Shelton", age : 20}
So, in the above code ie [key] dynamically updates. 
Example : ('title', event.target.value). Upon entering in the input tag, 
value of the property (ie 'title' here) keeps getting updated with the input value. 

---------------------------












 



