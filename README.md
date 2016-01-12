# Team-3-Telerik
---

## Team Members
* Adrian Apostolov
* Chavdar Angelov
* Nikolay Mishev

## Secret Agent Service

Web site for connecting Secret Agents and Commisioners. 

## Applicataion Logic 

 -	Users can register as Agents or Commisioners
 - 	Administrators are initially seeded
 -	Users (Admins) can delete missions and any other users
 -	Agents can enroll into mission, view mission details and to send messages to everyone else. 
 -	Commisioners can create missions and interact with the other users.
 -	There is public availible data such as bassic info about Missions, Agents and Commisioners
 -	Live chat for easier communication between registred users
 -	Private messgaes are offered as well
 - Server side paging and sorting;

 ## RESTful API Overview
| HTTP Method | Web service endpoint | Description |
|:----------:|:-----------:|:-------------|
|GET (for admin) | /api/users | Gets all users |
|POST (public) | /api/users | Adds new user 
|PUT (for registered)| /api/users | Updates user profile |
|GET (for registered)| /profile/edit | Loads html section for updating user|
|GET (public)|/missions|Gets all public missions|
|GET (for registered))|/missions/add|Loads html section for creating mission|
|POST (for registered))|/missions/add|Creates a new mission|
|GET (for registered))|/missions/details/:id|Get mission details|
|POST (for registered))|/missions/details/:id|Agent accepts the mission|
|GET (for admin))|/admin|Gets admin panel|
|DELETE (for admin))|/missions/:id|Deletes the given mission|
|DELETE (for admin))|/users/:id|Deletes the given user|
|GET (public))|/users/agents|Gets public information about agents|
|GET (public))|/users/commissioners|Gets public information about commissioners|
|GET (for registered))|'/users/details/:id|Gets user details|
|GET (for registered))|/messages/inbox|Gets all messages to the given user|
|GET (for registered))|/messages/outbox|Gets all messages sent by the given user|
|GET (for registered))|'/messages/send/:username|Loads the page for sending messages|
|POST (for registered))|'/messages/send/:username|Sends message to the given user|
|GET (for registered))|'/chat|Gets the chat screen|
