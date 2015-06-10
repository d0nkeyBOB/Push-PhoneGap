/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        alert('Received Event: ' + id);

        var initPromise = Kinvey.init({
            appKey    : 'APPKEY',
            appSecret : 'APPSECRET'
        });
        initPromise.then(function(activeUser) {
            alert("init worked");
            if (activeUser === null){
                return Kinvey.User.signup({
                    username:"phonegap",
                    password:"phonegap"
                });
            }

        }, function(error) {
            alert("init fail: " + error);
        }).then(function(activeUser){
            alert("logged in!");

            if('android' === device.platform.toLowerCase()) {
                window.plugins.pushNotification.register(function() { }, function() { }, {
                    ecb      : 'onNotificationGCM',
                    senderID : 'GOOGLE_PROJECT_ID'// Google Project ID.
                });
            }
            else {// iOS.
                window.plugins.pushNotification.register(app.registrationHandler, function(err) {
                    // Failed to register device.
                    console.log(err);
                    alert("couldn't register with plugin ");
                }, {
                    alert : 'true',
                    badge : 'true',
                    sound : 'true',
                    ecb   : 'onNotificationAPN'
                });
            }
        }, function(error){
            alert("login fail: " + error);
        });
    },

    registrationHandler : function(deviceId) {
        alert("reg handler");
        if(null === Kinvey.getActiveUser()) {
            // Error: there must be a logged-in user.
            alert("no logged in user? ");
        }
        else {
            Kinvey.Push.register(deviceId).then(function() {
                // Successfully registered device with Kinvey.
                alert("done with reg!");
            }, function(error) {
                // Error registering device with Kinvey.
                alert("couldn't register with kinvey! ");
            })
        }
    }
};

// Method to handle device registration for Android.
function onNotificationGCM(e) {
    if('registered' === e.event) {
        app.registrationHandler(e.regid);// Register with Kinvey.
    }
    else if('message' === e.event) {
        navigator.notification.alert(e.payload.message);
    }
    else if('error' === e.event) {
        alert("couldn't register with plugin "); // Failed to register device.
        // Failed to register device.
    }
    else {
        // Unknown event.
    }
}

// Method to handle notifications on iOS.
function onNotificationAPN(e) {
    if(e.alert) {
        navigator.notification.alert(e.alert);
    }
    if(e.sound) {
        var snd = new Media(e.sound);
        snd.play();
    }
    if(e.badge) {
        window.plugins.pushNotification.setApplicationIconBadgeNumber(function() {
            // Success.
        }, function() {
            // Failure.
        }, event.badge);
    }
}
