# **_Curb Alert_**

## **Work In Progress: 2/15/22 through 3/10/22**

### _Capstone Project for Epicodus Bootcamp_

#### Created By: **Christopher Neal**

## Technologies Used

- _Javascript_
- _React Native_
- _npm_
- _PropTypes_
- _UUID_
- _Babel_
- _React Native Vector Icons_

## Description

_This project was created as an independent Capstone project for Epicodus bootcamp. It shows proficiency in React Native._
_Curb Alert: Connecting Trash with Folks to whom it's Treasure. A user can upload an image of discarded furniture for others to see. A user can find discarded furniture near their location._

## Project Component Diagram

![Project Component Diagram](./project-diagram.drawio.png)

Components:

- Header

  - logo (link to ItemMap)
  - Settings link button (ideally opens camera, then uses image in form)
  - NewItem link button

- Settings

  - email
  - password
  - update email/password
  - default location
  - notification settings?
  - signout

- AddItem (appears after taking a picture?)

  - picture (should be automatic)
  - location (should be automatic)
  - title
  - detail

- ItemDetail

  - image
  - map
  - title
  - description
  - timestamp
  - is_taken (only appears if true, plus timestamp)
  - take button (unless can_take is false)
  - is_damaged (only appears if true)
  - damaged button
  - thumbs_up button
  - thumbs_up count (if count > 0)
  - update button
  - flag as innapropriate

- ItemMap

  - image
  - location (as map)
  - title?

- ImageList
  - image
  - title
  - distance from current location
  - description

## Database Schema

users:

- email (required)
- password (required)
- is_admin, boolean (default false)
- default_location, zipcode (for push notifications)
- current_location, coordinates? (ideally from GPS, or entered zipcode, required)
- is_banned, boolean (default false, for users with malicious content)

items:

- posting user_id (allow multiple if )
- image, image file (required)
- location, coordinates? (pull from image or current location?, required)
- title, string (limit 50 chars)
- description, string (limit 140 chars)
- timestamp (listing should dissapear 1 week after being posted unless taken before)
- display, boolean (would this be the best way to determine whether to display an item?)
- is_taken, boolean
- is_damaged, boolean
- thumbs_up, integer (for users to confirm item is still there and in good condition)
- taken_time, timestamp (listing should dissapear 2 hours after being taken)
- can_take, boolean (default true, false for fruit trees or tiny libraries, extends listing lifetime?)
- flagged, boolean (default false, flag as innapropriate, plus immediatly remove for review)

## Setup/Installation Requirements

- _React version 3.2.0_
- _React version 17.0.2_
- _React-Native version 0.67.2_
- _Xcode_
- _Watchman_
- _Android Studio_
  (For detailed information on environment setup, see [React Native's Documentation](https://reactnative.dev/docs/environment-setup))

### Basic Setup

- Clone the GitHub repository: [https://github.com/christophermneal/curb-alert](https://github.com/christophermneal/curb-alert)
- From the main project directory, run `npm install` in the terminal to load necessary plugins and packages.
<!-- - Run `npm install --save-exact react-scripts@3.2.0` to install React version 3.2.0
- Run `npm run start` to start the application. -->

## Known Bugs

_None as of 2/19/22 10:14AM_

### License

_[MIT](https://opensource.org/licenses/MIT)_
Copyright (c) _2022_ _Christopher Neal_

### Support and Contact Details

- _[christopher.m.neal@gmail.com](mailto:christopher.m.neal@gmail.com)_

## Research & Planning Log

### Tuesday, 02/15

- **7:56PM - 8:42PM** Begin watching [Traversy Media React Native Crash Course Video](https://www.youtube.com/watch?v=Hf4MJH0jDb4&t=709s)
- **8:42PM - 10:00PM** Begin setting up environment using [React Native Docs](https://reactnative.dev/docs/environment-setup)
- **10:00PM - 10:22PM** Create README

### Friday, 02/17

- **8:00AM - 9:10AM** Finish setting up dev environment and walk through [Traversy Media React Native Crash Course Video](https://www.youtube.com/watch?v=Hf4MJH0jDb4&t=709s) to set up "Hello World" view

- **10:22AM - 11:32AM** Continue working through [Traversy Media React Native Crash Course Video](https://www.youtube.com/watch?v=Hf4MJH0jDb4&t=709s) to set up state and delete functionality. Got to 40:18 on video.

- **11:32AM - 12:43PM** Troubleshooting importing UUIDV4 and ReactNativeVectorIcons. Tried: update Ruby version to 3.0.3, reinstalling CocoaPods, running `pod install` from `CurbAlert/ios` Still not working but making progress.

- **12:43PM - 1:41PM** ReactNativeVectorIcons and UUIDV4 still not working. Still troubleshooting. Tried rebuilding project using Expo Cli Quickstart to no avail. Now researching linking libraries in [React Documentation](https://reactnative.dev/docs/linking-libraries-ios)

- **1:41PM - 3:14PM** Still not working and I'm out of ideas. Setting up Andriod dev environment (following the [React Documentation's guide](https://reactnative.dev/docs/environment-setup)) to see if packages will work there.

  - _Note: installation taking a while, reading through the rest of the React Documentation while I wait._

  - Build still fails on Android. Going to try something different.

- **4:32PM - 4:41PM** Adding Capstone Proposal and creating GitHub Repo
- **4:41PM - 5:56PM** Researching the problem:

  - [React Native Docs](https://reactnative.dev/docs/environment-setup)
  - [CocoaPods Docs](https://guides.cocoapods.org/using/a-gemfile.html) - Tried Bundle Install - not sure whether it helped.
  - [React Native Vector Icons Docs](https://github.com/oblador/react-native-vector-icons/blob/master/README.md#installation) and [Vimniky Luo's post on Medium](https://medium.com/@vimniky/how-to-use-vector-icons-in-your-react-native-project-8212ac6a8f06) - Tried manually linking the modules but they are already linked.
  - GOT IT! [This StackOverflow Article](https://stackoverflow.com/questions/2718246/xcode-warning-multiple-build-commands-for-output-file) told me to look in the "Copy Bundle Resources" Build Phase in XCode. I deleted the `.ttf` files and it _magically_ works now!

- **5:56PM - 6:42PM** UUID still not working. Researching:

  - Attempting to install [React Native Get Random Values](https://github.com/LinusU/react-native-get-random-values#readme)
  - Works now! I think the import needed updating too.

- **6:42PM - 7:19PM** Finish [Traversy Media React Native Crash Course Video](https://www.youtube.com/watch?v=Hf4MJH0jDb4&t=709s) and implement some features.

### Tuesday, 02/22

- **9:32PM - 11:54PM** Planning database structure, component diagram, and app UI layout.

### Thursday, 02/24

- **5:39PM - 5:59PM** Finish component diagram
- **5:59PM - 6:19PM** Adding Header icons and styling using flexbox, reference: [React styling docs](https://reactnative.dev/docs/flexbox)
- **6:19PM - 6:41PM** Add component files with boilerplate code
- **9:44PM - 9:58PM** Organize project structure
- **9:58PM - 10:36 PM** Research React Navigation:
  - [YouTube: Navigation in React Native](https://www.youtube.com/watch?v=9K7JCQbOHVA)
  - [ReactNavigation.org documentation](https://reactnavigation.org/docs/getting-started/)

### Friday, 02/25

- **7:59AM - 8:57AM** Troubleshoot program not building on Android - not sure what's happening here.
- **8:57AM - 9:33AM** Organize components, WIP: add description field to AddItem form.
  - Research React Native forms [YouTube: React-Native tutorial # Handle Input](https://www.youtube.com/watch?v=pF8ae5j9Q3g&list=PL8p2I9GklV44z6euF3nqS0TlKbaGiFUGO&index=18)
- **10:34AM - 11:45AM** Continue research:
  - [YouTube: React-Native tutorial # submit simple form](https://www.youtube.com/watch?v=FZDOxrQNMjs&list=PL8p2I9GklV44z6euF3nqS0TlKbaGiFUGO&index=19)
  - Add description to state
- **11:45AM - 11:50AM** Research calculating distance using coordinates
  - [LogRocket Tutorial](https://blog.logrocket.com/react-native-geolocation-a-complete-tutorial/)
  - Never mind! I'll use an API when I incorporate the map
- **11:50AM - 12:06PM** Add dummy calculateDistance function, add distance to item state
- **12:06PM - 12:21PM** Research and implement Flex Boxes for main view
  - [Stack OverFlow](https://stackoverflow.com/questions/45132731/cannot-scroll-to-bottom-of-scrollview-in-react-native)
- **12:21PM - 1:03PM** WIP: display item full details
- **2:01PM - 2:58PM** Trying to set up item details using hooks for state, but I'm just not getting it, so reviewing with [YouTube: Traversy Media React JS Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
  - I'm on the right track, just trying to get the details to display.
- **2:58PM - 3:33PM** Get ItemDetail to display. Move delete functionality to ItemDetail
- **3:33PM - 5:04PM** Got ImageDetail to display all details! Plus did a little styling.
  - Research displaying text with [React Native Docs - Text](https://reactnative.dev/docs/text)
- **6:49PM - 7:23PM** Research map APIs:
  - [YouTube: React Native Maps Mini Course](https://www.youtube.com/watch?v=qlELLikT3FU)
- **7:59PM - 9:05PM** Research using phone location:
  - [AboutReact.com - Geolocation](https://aboutreact.com/react-native-geolocation/)
  - [YouTube: Get started with Background Geolocation in React Native](https://www.youtube.com/watch?v=heuEY5NY6cw)
  - Attempted using `react-native-community/geolocation` but I'm going to try another method

### Wednesday, 03/02

- **7:58PM - 10:45PM**
  - Refactor ItemControl as a class component (WIP)
  - Implement React Native Geolocation using [this LogRocket tutorial](https://blog.logrocket.com/react-native-geolocation-a-complete-tutorial/)
- **10:45PM - 11:00PM** Researching Camera Access
  - (GitHub Documentation: React Native Image Picker)[https://github.com/react-native-image-picker/react-native-image-picker]
  - (YouTube: Pradip Debnath - React Native Image Picker Tutorial) [https://www.youtube.com/watch?v=3_ldEVWlL18]

### Thursday, 03/03

- **1:14PM - 1:29PM** Pick up where I left off on researching camera access, same resources.
- **2:29PM - 2:59PM** Switching gears to research React Navigation before implementing maps
  - [React Navigation Documentation](https://reactnavigation.org/docs/getting-started/)
  - [YouTube: Pradip Debnath - Getting Started with React Navigation v5 in React Native | Stack Navigator Tutorial](https://www.youtube.com/watch?v=a9jSyZXYGn8&list=PLQWFhX-gwJbmmqcP-9zMXBaxQbGKfIJY2&index=1)
- **3:00PM - 3:40PM** WIP: Implement React Navigation:

  - Move ItemControl component to App.js to faciliate using Navigator
  - Successfully render some components as screens, others still need refactoring

- **5:07PM - 7:11PM** WIP: Implement React Navigation:

  - Experimenting with passing props
  - Add nav buttons with
    - [YouTube: LogRocket - Learning React Native Navigation](https://www.youtube.com/watch?v=3hLQURJM7ws&t=641s)
    - [React Native Navigation Docs - Moving Between Screens](https://reactnavigation.org/docs/navigating)

- **8:35PM - 10:26PM** Continue reading React Native Navigation Docs and implementing concepts.

### Friday, 03/04

- **8:28AM - 9:37AM** Setting React Navigation headers

  - [React Native Navigation Docs - Header Buttons](https://reactnavigation.org/docs/header-buttons)

- **10:39AM - 12:28PM** Creating Home Screen

  - [YouTube: Pradip Debnath - Getting Started with React Navigation 6 | Stack Navigator Tutorial](https://www.youtube.com/watch?v=FWwKjxSgLl8&list=PLQWFhX-gwJbmtZY4mcRE-k7hL9DigcGS-&index=1)

- **1:21PM - 2:45PM** Continue working thorugh YouTube Tutorial:

  - [YouTube: Pradip Debnath - Gaming App UI in React Native with React Navigation 6](https://www.youtube.com/watch?v=I5doVFcG94U&list=PLQWFhX-gwJbmtZY4mcRE-k7hL9DigcGS-&index=2&t=266s)

- **4:13PM - 5:16PM** Continue working thorugh same YouTube Tutorial.

  - Organize files:
    - Add components to `src` directory
    - Add `assets` directory for images
    - Move `HomeScreen()` component to `HomeScreen.js`
    - Move `ItemList()` component to `ItemList.js`
    - Rename `ListItem` to `Item`
    - WIP: Add dummy list data to `src/model/data.js` and store in state

- **5:16PM - 6:17PM** Get ItemList.js working and add styling

  - rename IMG files
  - change image_path in data.js
  - add Dimensions.js

- **6:17PM - 6:50PM** Research improving navigation
- **Several Hours This Evening**
  - Research and install React Native Maps
  - Add logo, styling, and adjust color pallate

### Saturday 03/05

- **12:30PM - 2:15PM** Troubleshooting React Native Maps
- **3:35PM - 4:30PM** Troubleshooting React Native Maps
- **6:50PM - 8:15PM** WIP: Incorporate React Native Location data into React Native Maps
- **8:50PM - 10:13PM** Add marker and description to map
- **10:13PM - 10:37PM** Begin researching adding items to map:
  - [YouTube: Pradip Dibnath - #2 Sliding Items on MapView with Animation React Native Maps Tutorial](https://www.youtube.com/watch?v=2vILzRmEqGI)
- **10:37PM - 11:24PM** Research and begin setting up Firestore:
  - [YouTube: Born To Code - React Native, Firebase v9, authentication and firestore](https://www.youtube.com/watch?v=20TSEoJkg5k)
  - [LearnHowToProgram - Setting up a Firebase Project](https://www.learnhowtoprogram.com/react/react-with-nosql/setting-up-a-firebase-project)

### Sunday 03/06

- **9:54AM - 11:02AM**
  - Continue researching and setting up Firestore: [Firestore Documentation](https://firebase.google.com/docs/firestore)
  - Create new API key since former key was exposed: [Google Cloud Docs](https://cloud.google.com/docs/authentication/api-keys?visit_id=637821881490377539-2283733015&rd=1)
  - Configure .env file
  - Troubleshooting using .env file
- **3:39PM - 7:28PM** Begin implementing Redux... I'm totally lost
- **8:05PM - 12:24AM** Take another shot at implementing Redux. Almost there...?

  - https://www.youtube.com/watch?v=9jULHSe41ls
  - https://www.youtube.com/watch?v=BtJoy4G3N8U
  - https://www.youtube.com/watch?v=eET0YtDBWWg&t=10s
  - https://www.youtube.com/watch?v=LYi1gwPWDto&list=PLsprmdocuVe9SvIQveOWqMvxHdkXjcRO_

### Monday 03/07

- **7:30PM - 10:00PM** Add data to Map

### Tuesday 03/08

- **8:10AM - 11:13AM** Implement Firestore, implement Firestore in AddItem

  - Resources: [YouTube: Born to Code - Building a React Native app - #6 Understanding react native states](https://www.youtube.com/watch?v=AvgrS-cCcXQ&list=PLYSxLlUA2IkEUZjlxfk-ecd6kD9vJjs2b&index=7)
  - [YouTube: Born to Code - React Native, Firebase v9, authentication and firestore](https://www.youtube.com/watch?v=20TSEoJkg5k)

- **11:13AM - 12:04PM** WIP implement Firestore and passing params with React Navigation in ItemDetail and Item

- **12:36PM - 1:37PM** Troubleshoot issue with ItemList passing params
- **1:37PM - 2:28PM** BUGFIX:

  - ItemList updates from Firestore with useEffect hook
  - Map updates to current location with useEffect hook

- **2:28PM - 2:53PM** Turn off useEffect for now because it's making too many calls.
- **2:53PM - 3:17PM** Add getLocation function to AddItem
- **3:17PM - 3:35PM** Pull map items from Firestore
- **3:35PM - 4:51PM** WIP: configure React Native Image Crop Picker
  - [GitHub: ivpusic/react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
  - [YouTube: Pradip Debnath - React Native Image Picker Tutorial | Pick from Camera, Gallery | Crop Photo](https://www.youtube.com/watch?v=3_ldEVWlL18)
- **6:27PM - 6:55PM** Configure React Native Image Crop Picker
- **6:55PM - 7:16PM** WIP: Integrate Image Picker with AddItem component
- **9:06PM - 10:11PM** WIP: Integrate Image Picker
  - correct path exports to Firestore
  - but the images won't load.
  - Sometimes gives this error: Warning: Failed prop type: Invalid prop `source` supplied to `Image`, expected one of type [number].
- **10:11PM - 12:36PM**
  - Fixed useEffect endless loop bug.
    - Still need to get ItemList to update when adding an item from AddItem.
    - Fixed location update when adding an item.
    - [LogRocket - The last guide to the useEffect Hook you’ll ever need](https://blog.logrocket.com/guide-to-react-useeffect-hook/)
    - [LogRocket - Data fetching with React Native](https://blog.logrocket.com/data-fetching-react-native/)
  - Add icons in place of buttons and style
- **7:14AM - 7:39AM**
  - Improve styling on ItemList
  - Tinker with getting images to load
- **7:43AM - 8:24AM** Fix timestamp display, write function to display as words
- **8:24AM - 9:23AM**
  - Move getLocation to utility folder
  - Research getDistance function
    - [GeoDataSource](https://geodatasource.com/developers/javascript)
  - Tidy code, delete old comments
- **9:23AM - 9:48AM** Implement getDistance function in ItemDetail
