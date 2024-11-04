# Table of Contents:


1. Introduction
2. Application Idea
3. Features
4. Technologies Used
5. Advanced React-Native
6. Getting Started
7. Prerequisites
8. Additional Setup for react-native-vector-icons
9. Installation
10. Contributors




# Introduction

A React Native to-do list application powered by Firebase that helps users organize and manage their daily tasks. Users can add, delete, and mark tasks as complete, making it easier to track and remember their important activities.

# Application Idea


The application is a to-do list that helps users organize and manage their daily tasks. It
also allows them to add and delete tasks, as well as mark tasks as complete. The aim
of the application is to facilitate the follow-up of activities and helps the user not to
forget the tasks that he must work on.

# Features

 • Add, delete, and mark tasks as complete

 • Firebase real-time database for task management

 • Cross-platform compatibility (iOS and Android)

 • Dynamic styling and animations for a smooth user experience

# Technologies Used

 • React Native: For building a cross-platform mobile application.

 • JavaScript: Primary programming language.

 • Firebase: Used as the backend database to store tasks in real-time.

 • Expo: For easier development, building, and testing on multiple devices.

# Advanced React-Native:

**1. Dynamic styling native concept**
The Signup Screen in the provided React Native code utilizes dynamic styling to
enhance user experience by adapting the interface based on the platform (iOS or
Android) and user interactions. It employs conditional logic for platform-specific
styles, such as different background colors, and dynamically renders components like
an ActivityIndicator during loading states to indicate ongoing processes. The input
fields are linked to state variables that update in real-time as users type, ensuring
responsive feedback. Overall, this approach creates an intuitive and visually appealing
interface that feels native across devices while providing essential interactive features
like loading indicators and platform-specific aesthetics.


**2. Create animation**
The provided React Native code implements a settings screen featuring multiple
animations for enhanced user experience. When the screen loads, a fade-in effect is
applied to the main view by animating its opacity from 0 to 1 over 500 milliseconds.
Each section in the settings can be expanded or collapsed smoothly through a height
animation controlled by an interpolated value, allowing for a dynamic display of
content. Additionally, each row button exhibits a scale animation that reduces its size
slightly when pressed, providing immediate feedback to users. This combination of
fade-in, expandable sections, and responsive button interactions creates an engaging
and intuitive interface.

# Getting Started

Follow these steps to set up the project locally:

**Prerequisites**

 • Node.js and npm installed

 • Run the following commands to install required packages:

npm install @react-navigation/native

npx expo install react-native-screens react-native-safe-area-context

npm install @react-navigation/native-stack

npm install @react-navigation/bottom-tabs

npm install react-native-elements

npm install firebase

npm install uid



**Additional Setup for react-native-vector-icons**

If using react-native-vector-icons, make sure to follow these steps:

 1. Install the package:

npm install react-native-vector-icons


 2. Add the following import statements in your components where you use icons:

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Fontisto from 'react-native-vector-icons/Fontisto';

import AntDesign from 'react-native-vector-icons/AntDesign';


 3. Modify the build.gradle file:

 • Go to android/app/build.gradle

 • Add the following line at the top of the file:

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


 • Then, inside the dependencies block, add:

dependencies {
    implementation project(':react-native-vector-icons')
    // other dependencies...
}



**Installation**

 1. Clone the repository:

git clone https://github.com/yourusername/todo-list-app.git


 2. Navigate to the project folder:

cd todo-list-app


 3. Install dependencies:

npm install


 4. Start the application:

expo start


# Contributors

 • Alhanouf Alaloey

 • Norah Alammar

 • Samar Almuhanna

 • Wasan Alowayed
