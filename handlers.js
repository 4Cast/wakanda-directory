function userHandler(request, response){
	if(request.method.toLowerCase() != 'post'){
		setBadRequestInfo('Wrong HTTP method');
		return;
	}
	
	try{
		var userInfo = JSON.parse(request.body);
	}catch(e){
		setBadRequestInfo('Invalid JSON');
		return;
	}
	
	if(typeof userInfo.l !== 'string' || typeof userInfo.p !== 'string'){
		setBadRequestInfo('login and password should be strings');
		return;
	}
	
	if(userInfo.g && !(userInfo.g instanceof Array) ){
		setBadRequestInfo('group list should be an Array');
		return;
	}
	
	var login    = userInfo.l;
	var password = userInfo.p;
	var fullName = userInfo.f || '';
	var groups   = userInfo.g || [];
	
	try{
		var user = directory.addUser(login, password, fullName);
	}catch(e){
		setError(e);		
		return;
	}
	
	
	/**
	 * This can be customized to authorize users to join some groups if needed
	 */	 
	if(groups.length > 0){
		try{
			user.putInto.apply(user, groups);			
		}catch(e){
			setError(e);		
			return;
		}		
	}
	
	directory.save();
}

function setBadRequestInfo(message){
	var _message = (typeof message === 'string')? message : '';
	
	httpServer.response.statusCode = 400;
	httpServer.response.body       = _message;
}

function setError(e){
	httpServer.response.statusCode = 500;
	httpServer.response.body       = e.toString();
}