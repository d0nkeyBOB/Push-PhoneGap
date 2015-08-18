##Setup
__iOS__

1. Visit http://docs.urbanairship.com/reference/push-providers/apns.html#ios-apns-setup and follow the guide to create a certificate.
2. After you export the .p12 file, go to your application environment on https://console.kinvey.com.
3. Select Engagement on the left side menu.
4. Select the configuration tab and drag your .p12 certificate file where it says `DRAG FILES HERE`.
5. Click save.

__Android__

1. Visit https://console.developers.google.com.
2. Create a new project.
3. On the left side menu, select Overview.
4. Copy the Project Number found at the top of the page.
5. Go to your application environment on https://console.kinvey.com.
6. Select Engagement on the left side menu.
7. Select the configuration tab and paste your project number as the sender ID under Android.
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
2. Install PhoneGap CLI wtih `npm install -g phonegap`. (Optionally install ios-deply with `npm install -g ios-deploy` if you will run the application on an iOS device.)
3. Run `npm install` to install dependencies and setup the project.

**Note:** Mac OS X with Xcode installed is required to run the application on the iOS platform. Please visit https://developer.apple.com/.

**Note:** The Android SDK is required to be installed to run the application on the Android platform. Please see http://developer.android.com/index.html.

##Run

Execute `phonegap run ios --device` to run the project on an iOS device. You will have to install [ios-deploy](https://github.com/phonegap/ios-deploy#installation) to deploy it to your device.

*or*  

Execute `phonegap run android --device` to run the project on an Android device.

##Test 

From the 'Engagement' section of your application environment at console.kinvey.com, send a test message to your device.

##Business Logic

You can send targetted or conditional push notifications by writing business logic. The __businesslogic__ folder contains 4 javascript files, one for each of the four types of business logic push we support.  To use a script, create a custom endpoint and copy and paste the JS into it.

When executing the `Targetted*` scripts, change the username in the query to match the specific platform you are testing.  You can Execute these custom endpoints through the Console itself, so there is no need to write code to hit them.

##Troubleshooting

__Why won't the application install onto my iOS device?__  

1. Make sure you have installed `ios-deply` by executing `npm install -g ios-deply`. Follow the installation instructions at [ios-deploy installtion](https://github.com/phonegap/ios-deploy#installation). Try `phonegap run ios --device` again.

2. Refresh your account information in Xcode. Open Xcode and select Xcode > Preferences from the menu bar. Click on the Accounts tab. Select the account that you used to create your .p12 certificate and click view details in the bottom right hand corner. Click the circular arrow button in the left hand corner to refresh your provisioning profiles. Try `phonegap run ios --device` again.

3. Add your iOS device to your Apple Developer account. Visit https://developer.apple.com/account/ios/device/deviceList.action. Click the plus button in the top right hand corner. Give your device a name and enter its UUID. You can find the device UUID using iTunes (http://www.macworld.co.uk/how-to/iphone/how-find-out-your-iphone-or-ipad-udid-3530239/). Click continue and done. Try `phonegap run ios --device` again.   

__I am not receiving push notifications on my device__

1. Make sure you uploaded the .p12 certificate you created with your Apple Developer account into the Kinvey Management Console for your application. See the instructions above on how to setup push notifications for iOS.

2. Make sure your `Sender Id` and `API Key` are correct for your Android configuration. See the instructions above on how to setup push notifications for Android.


