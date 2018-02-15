# MapApp

Technologies Used- AngularJs 1.6, Bootstrap 3, Asp.Net MVC 5, WebAPI, Sql Server, Goole Map API, Microsoft Unit Testing

Tools Used - Microsoft Visual Studio 2015, Chrome, IIS

Approach - 
Left side panel-
Javascript helps us to get the current location of the application using geolocation API. As application knows current location, 
It will load the map and puts one marker with tag name 'Current Location'. When the user hit on the marker, a short popup will come up to
help us to save the note. 

Right side panel-
UserName - username textbox is the current user of the application.
Add note - find the center lat and lng of the map and create the marker on the random location.
Search - search textbox will help us to search the save notes into the database.
List - List out all the saved notes for all user.

Limitations - Test cases are misbehaving sometime because of this issue(https://stackoverflow.com/questions/12566036/an-attempt-to-attach-an-auto-named-database-for-file-database1-mdf-failed).
