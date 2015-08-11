##Setup
__iOS__

_Coming Soon_

__Android__

1. Visit https://console.developers.google.com.
2. Create a new project.
3. On the left side menu, select Overview.
4. Copy the Project ID found at the top of the page.
5. Go to your application evironment on https://console.kinvey.com.
6. Select Engagement on the left side menu.
7. Select the Configuration tab and paste your project ID under Android.
8. Back on https://console.developers.google.com, on the left side menu select APIs & auth > credentials.
9. Under Public API access, create a new key.
10. Click Server key and then click create.
11. Copy the generated API Key.
12. Go back to your application evironment on https://console.kinvey.com.
13. Select Engagement on the left side menu.
14. Select the Configuration tab and paste the generated API Key under Android.
15. Click save.

##Install

1. Install NodeJS. Please visit https://nodejs.org/.
2. Install cordova cli wtih `npm install -g phonegap`
3. Run `npm install` to install dependencies.
4. Run `node setup.js` to setup the project.

**Note:** Mac OS X with Xcode installed is required to run the application on the iOS platform. Please visit https://developer.apple.com/.

**Note:** The Anrodid SDK is required to be installed to run the application on the Android platform. Please see http://developer.android.com/index.html.

##Run

Execute `phonegap run ios` to run the project on an iOS device.

*or*  

Execute `phonegap run android` to run the project on an Android device.

##Business Logic

The __businesslogic__ folder contains 4 javascript files, one for each of the four types of business logic push we support.  Create 4 custom endpoints, and copy and paste the JS into them.

When executing both the `Targetted*` scripts, change the username in the query to match the specific platform you are testing.  You can Execute these custom endpoints through the Console itself, so there is no need to write code to hit them.  


