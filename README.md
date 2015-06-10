##Setup
1) Install cordova cli wtih `npm install -g cordova`
2) Run `./setup.sh` to setup the project.
    _Mac OS X with Xcode installed is required to develop iOS applications._
    _The Anrodid SDK is required to be installed to develop Android applications._

##Run
`cordova run ios` to run the project on an iOS device.
`cordova run android` to run the project on an Android device.

##Business Logic

The __BusinessLogic__ folder contains 4 javascript files, one for each of the four types of business logic push we support.  Create 4 custom endpoints, and copy and paste the JS into them.

When executing both the `Targetted*` scripts, change the username in the query to match the specific platform you are testing.  You can Execute these custom endpoints through the Console itself, so there is no need to write code to hit them.  


