# FODMAP Pantry

## Summary
For this Unit 2 project I was required to build a complete CRUD app connected to MongoDB and hosted on Heroku. I used this opportunity to begin modeling the backend functionality of my nutrition app from Unit 1.

## Approach and Background
I began by getting the database structure sketched out so I had something I could send and retrieve data from. Once I had an initial structure set up I worked on building the CRUD application and getting all 7 RESTful routes functional. Once I had this basic functionality working I began fleshing out my draw on the database and realized that my choice of using an array of objects in a field of the database was proving to be difficult. I did figure out how to send an array of objects to a field in the database in such a way that I could later retrieve specific keys later. I then worked on getting the log in and account setup functionality working. After fixing my Heroku connection I turned to the styling. I chose to style a little differently from the Unit 1 app so they look different and to try out different themes.

## Struggles
#### Database Design:
I had initially set up my database to have a field that was an array of objects. I did not realize until a little while into my development process that it was going to be difficult to actually send and access keys within the array's objects. I eventually figured out through trial and error console.log testing that I could create a function that created each object and then pushed it into an array, and then set the req.body.field equal to that array before either creating or updating it.

#### Passing currentUser to all pages for partials nav
I used header and nav partials for this project to have standard html elements used by all pages. I wanted to have the user's name on each page so I put it in the navs. I discovered that I needed to pass the user: req.session.currentUser to all routes rendering a page. However I struggled for a long time getting the sessions to recognize the user. I eventually resorted to tearing down all items related to the sessions functionality and rebuilding. I'm not entirely sure what was wrong, but cleaning up my server.js was generally helpful.

#### Learning to use connect-mongodb-session
I wanted to keep a user logged in for a period of time if they didn't log out before closing the window or browser. In part, I just didn't want to keep logging in every time I restarted the server, but I wanted to know how to do this anyway. Karolin directed me to some helpful information that got me headed in the right direction and after tearing down all sessions functions and rebuilding I got it working. I did miss a hard coded uri link to the local database which prevented Heroku from deploying correctly. Dan Lawrence assisted with finding this and helping me correct the assignment of the uri.

#### Creating New Repository and Heroku App Last Minute
In a near-last ditch effort to get my app to deploy through Heroku I created a new repository and new Heroku app. Which of course was a waste of time, but it at least gave me a little more practice in creating new repositories and connecting them to Heroku. Once I figured everything out I wanted to retain all of my original commits so I moved everything back to the original repository folders. This was a good lesson in removing a heroku remote setup as well as doing a force push.

#### COMMENTING MY CODE!
I still failed to properly comment my code. I am disinclined to comment my code when I am working on just getting a piece functional, and then I'm so excited when I get it working that I move on to the next piece.

## Lacking Features and Future Development
#### CSS
I did not put a lot of time into making this particularly responsive. This is something I would like to improve on.

#### API
I would like to find a better API for food data.

#### Integration with Unit 1 App
Either as a final project for this course or after graduation I would like to integrate the features of this Unit 2 project with that of my Unit 1 project. 

## Resources
- I depended heavily on the markdowns from Unit 2 classes to help me get through this project and used far fewer resources from research on the internet to solve problems.
- save session user as variable to send to all templates: https://stackoverflow.com/questions/37183766/how-to-get-the-session-value-in-ejs
- Karolin Rafalski supported me in finding resources to save session data to mongoDB with this link: https://www.npmjs.com/package/connect-mongodb-session
- Setting config vars in Heroku app: https://devcenter.heroku.com/articles/config-vars
- Dan Lawrence assisted with troubleshooting Heroku connection when using connect-mongodb-session
- Heroku force push: https://evilmartians.com/chronicles/git-push---force-and-how-to-deal-with-it
- Remove heroku connection from respository: https://www.kevinleary.net/git-remotes-existing-heroku-app/
