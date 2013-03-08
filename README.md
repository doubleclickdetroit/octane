Octane Mobile
=============

Boilerplate for Octane

## How does it work?

####main.js
main.js kicks off the require chain of dependencies since it’s the main module and publishes the event _‘app’_ _‘start’_.

####subscribers/main.js
This file simply lists all of the subscribers (app, menu, fuelsites, alerts, etc) and then invokes their _.init()_ method on them to run any other code and/or instantiate any classes; which have primarily been the MV and now Collections. The subscribers/main.js way of doing this isn’t set in stone and may change, but in the meantime this does suffice. 

####Subscribers
A subscriber is a means to connect (in a fairly clean way) the event subscriber to the controller method. Some thought about automating this by subscriber channels (e.g. _‘app'_ or _‘fuelsites’_) need only the controller and they would try and catch the name of the action on the controller _‘app’_, _‘ready’_, it would try _AppController.ready()_, but it wouldn't necessariliy be conducive to be 1:1, it should offer flexibility to run other code, in addition to following the convention of connecting an action on the controller as well.

####Controllers
The controllers are initializing MV|Collections and their actions are bound to the subscribed event to handle Models and Views accordingly. Views as Backbone convention are aware of their model (or collection, if it exists) and bind to its events to which it reacts by rendering or doing some other method that then, usually, publishes an event, to which the controller is subscribed to and handles the MVC accordingly.  

####Mediator & Facade Patterns
Additionally, we’re using the Mediator pattern through a Façade which is run against _permissions.js_ (future extensibility) to ensure that subscribers can in-fact subscribe to that event. For example, AccountView should never be able to subscribe if the _‘hasSignedIn’_ property has a value of _false_. That is the reason it’s set up to have a dependency on the façade and not the mediator by name. 

Whew, that’s a lot of ground to cover, so hopefully it makes sense. This setup works quite nicely and is somewhat popular (with the exception of our controllers ;) ) within the JS and Backbone community based on work published by Addy Osmani.

Please file any issues above.

Thanks!
- The Team
