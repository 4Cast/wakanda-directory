# wakanda-directory

- inside the folder `backend/modules` create a folder `directory`
- copy the three files in this repo into the new directory
- declare the `index.js` file as a service ( [how-to](http://wakanda.github.io/wakanda-server-doc/#/doc/overview/services) )
- start the server or restart it if it is already started

Now from the client side you can send requests to `/api/v1/user` using the `post` method and the following body : 

```json
{
	"l" : "hamzahik",
	"p" : "password",
	"f" : "Hamza HIKMAT",
	"g" : [
		"Moderators"
	]
}
```

- l : login
- p : password
- f : full name
- g : groups
