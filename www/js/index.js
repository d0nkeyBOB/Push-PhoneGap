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
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
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
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        app.log('Received Event: ' + id);

        var initPromise = Kinvey.init({
            appKey: window.APP_KEY,
            appSecret: window.APP_SECRET,
            apiHostName: window.API_HOSTNAME
        });
        initPromise.then(function(activeUser) {
            app.log("init worked");
            if (activeUser === null){
                return Kinvey.User.signup({
                    username:"phonegap",
                    password:"phonegap"
                });
            }

        }, function(error) {
            app.log("init fail: " + error);
        }).then(function(activeUser){
            app.log("logged in!");

            if (device.platform.toLowerCase() === 'android') {
                app.log(window.GOOGLE_PROJECT_ID);
                window.plugins.pushNotification.register(function() { }, function() { }, {
                    ecb      : 'onNotificationGCM',
                    senderID : window.GOOGLE_PROJECT_ID
                });
            }
            else {// iOS.
                window.plugins.pushNotification.register(app.registrationHandler, function(err) {
                    // Failed to register device.
                    app.log("couldn't register with plugin ");
                }, {
                    alert : 'true',
                    badge : 'true',
                    sound : 'true',
                    ecb   : 'onNotificationAPN'
                });
            }
        }, function(error){
            app.log("login fail: " + error);
        });
    },

    registrationHandler: function(deviceId) {
        app.log("reg handler");
        if (!Kinvey.getActiveUser()) {
            // Error: there must be a logged-in user.
            app.log("no logged in user? ");
        }
        else {
            Kinvey.Push.register(deviceId).then(function() {
                // Successfully registered device with Kinvey.
                app.log("done with reg!");
            }, function(error) {
                // Error registering device with Kinvey.
                app.log("couldn't register with kinvey! ");
            })
        }
    },

    log: function(text) {
        var node = document.createElement('p');
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        document.getElementById('output').appendChild(node);
    }
};

// Method to handle device registration for Android.
var onNotificationGCM = function(e) {
    if('registered' === e.event) {
        app.registrationHandler(e.regid);// Register with Kinvey.
    }
    else if('message' === e.event) {
        navigator.notification.app.log(e.payload.message);
    }
    else if('error' === e.event) {
        app.log("couldn't register with plugin "); // Failed to register device.
        // Failed to register device.
    }
    else {
        app.log("couldn't register");
        // Unknown event.
    }
}

// Method to handle notifications on iOS.
var onNotificationAPN = function(e) {
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
