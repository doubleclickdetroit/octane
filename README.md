Octane Mobile
=============

Boilerplate for Octane

## How does it work?

**main.js**
main.js kicks off the require chain of dependencies since it’s the main module and publishes the event _‘app’_ _‘start’_.

**subscribers/main.js**
subscribers/main.js simply lists all of the subscribers (app, menu, fuelsites, alerts, etc) and then invokes their .init() method on them to run any other code and/or instantiate any classes; which have primarily been the MV and now Collections. The subscribers/main.js way of doing this isn’t set in stone, but until we have something like where the AppController handles all of the route requests and it decides at that time if a controller needs to be initialized, which we may never need to get to that point, in which case this would, IMO, suffice. And then the subscriber is a means to connect (in a fairly clean way) the event subscriber to the controller method. I had thought about automating this by subscriber channels (e.g. ‘app or ‘fuelsites’) need only the controller and they would try and catch the name of the action on the controller ‘app’, ‘ready’, it would try AppController.ready(), but the more I thought about it, I don’t’ know that we want it to be 1:1, it should offer flexibility to run other code, in addition to connection an action on the controller as well.

**Controllers**
The controllers are initializing MV|Collections and their actions are bound to the subscribed event to handle Models and Views accordingly. Views as Backbone convention are aware of their model (or collection, if it exists) and bind to its events to which it reacts by rendering or doing some other method that then, usually, publishes an event, to which the controller is subscribed to and handles the MVC accordingly.  

**Mediator & Facade Patterns**
Additionally, we’re using the Mediator pattern through a Façade which is run against permissions.js (future extensibility) to ensure that subscribers can in-fact subscribe to that event. E.g. AccountView should never be able to subscribe if the ‘hasSignedIn’ property has a value of false. That is the reason it’s set up to have a dependency on the façade and not the mediator by name. 

Whew, that’s a lot of ground to cover, so hopefully it makes sense. I think the setup we have works quite nicely and is somewhat popular (with the exception of our controllers ;) ) within the JS and Backbone community based on work published by Addy Osmani.
