Orbit
=====

Orbit- Contextual Asset Service 

BACKGROUND
In the world of front-end development there have been many recent advances in best practices and solutions for delivering powerful web apps. Amongst them, the introduction of the Contextual UI mentality and asynchronous loading of front-end assets. Popular packages that enable these include YepNope, Require.js and others. While these front-end solutions offer great flexibility for asking for and receiving only the required files, they don’t offer an easier work environment for SDLC, nor do they offer a scalable solution for handling front-end assets across projects. To rephrase - you need to ‘build’ the files beforehand and specify ‘buckets’ of assets in each page in the project. In comes Orbit.

BASICS (or The Idea)
Orbit is a ‘static’ file server and service, that is able to derive what files and/or packages need to be sent to the client based on a context.

A context could be derived from the requested URL, URI, Request Headers, Query Parameters, Origin (whether server or environment), Origin Requestor (User Agent, Device, Media Queries) and/or named keys for specific packages.

Based on a context, Orbit would determine how to serve the static files and which ones should be served. Some of the considerations could be:
* Not compiled and sent along with a preprocessor
* Precompiled on the fly
* Minified
* GZip
* From Filesystem
* From Cache
* From In-Memory
* Concatenated
* Piped through a socket or transferred as a single file
	- http://stackoverflow.com/questions/9220144/using-websocket-for-file-transfer

We could provide settings that would deliver unconcatenated files in a dev environment, and concatenated, minified, obfuscated, gzipped in production.


CONTEXT EXAMPLES
1) Front-end example 1 - A standard “context discovery” script could be written which will assess all defined contextual criteria (e.g. device size, orientation, primary interaction method (touch, mouse, keyboard, motion), device pixel ratio, etc.) and send a single request to the server with this information as query parameters:
<link rel=”.../orbit/?ds=640x300&o=p&in=touch&dpr=2x&ua=chrome” />

2)Front-end example 2 - A js file is loaded:
<script src=”.../orbit/page_specific_object.js”>
This file is loaded into the browser and starts pulling all the required static assets for the page

3) Preferred (imo) back-end option: 
<script rel=”../orbit/page_or_route_or_keyname.js”>
<link rel=”../orbit/page_or_route_or_keyname.css”>
A request is received by orbit, which matches the requested route with a registered page/module/keyname objects. Pre-processes, compiles, concatenates and does whatever to the file, and sends it off. Based on request origin, this can also deliver based on the type of environment the request is coming from (if dev, follow dev settings etc.)

WHY NODE?
Node.js, a javascript based web server, is in a great place to be the right tool for the job. This is not the only reason, there are a few others:
* It is able to easily interact with a host of other solutions, preprocessors and tools that are js based (handlebars, coffeescript, sass etc.)
* It is asynchronous and therefore can handle a large request load (aka non-blocking IO) while still being able to provide ‘packages’ on the fly
* JS is ‘not’ (it is but it isn’t) a scripting language and therefore isn’t recompiled for every request, this means it can maintain fully compiled documents in memory, thereby speeding up the performance of sending off files
* It is able to work easily with HTML5 websockets
* It is wicked cool (a little brit can’t hurt)

WORRIED ABOUT PERFORMANCE?
http://zgadzaj.com/benchmarking-nodejs-basic-performance-tests-against-apache-php (this isn’t a great comparison, but nonetheless... and I agree with this comment from there: “who cares about file-server performance in these days of CDNs and server-side caches. ” - true dat

http://centminmod.com/siegebenchmarks/2013/020313/index.html

THOUGHTS ON IMPLEMENTATION
* Lactate is cool, and already does half of the things I was hoping for: https://github.com/wltsmrz/Lactate
* Obviously Orbit won’t be able to maintain every single version of the packages in memory - so a nice sort algo based on number of requests is needed
* Multiple machines could be spun up to provide this service, each loading files in memory based on how a proxy wants to route to them. Of course, there needs to be a central asset storage - this could actually be a single server as most requests would go cache. Only specific environments or requests might go to actual Orbit...
* Need to form syntax for package or bundle definition files on the server side (most likely this will be a js object that is loaded by the node server on request, or pre-loaded in memory)
* I imagine that at some point it would be cool to have one repo for all front-end assets across projects... That way we will be more keen on reusing stuff, and Orbit would be able to pull from that repo
* This would need a front-end solution/addition - based on a talk with Cory, jsManager seems like the best solution
* More to come... (Just didn’t feel like writing any more)
