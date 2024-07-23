I did want to make one note: I had a bunch of trouble with CORS errors with the Census geocode and created a workaround for this: 

In App.tsx, there's an option to switch the geocoding service between the Census bureau's and Google's. 

> All that needs to be done is switch which import statement is commented out. 

Currently I have it set to use Google's, since that works just fine. 

If you try the census bureau's, I'm pretty confident it will work if you don't have the same CORS error that I did, however, if you do:

> Entering 0 as an address will trigger the program to use a json file (the-white-house.json) in source code (see the IF in CensusGeocodeService.ts). 

Even this workaround will show up-to-date weather info for Washington, D.C., as it just scrapes the coordinates from the file before passing them off to the weather service. All I did to get the json file was manually input the URL the CORS error displayed in DevTools into a non-local browser to get it to work and save the file into my program. 
