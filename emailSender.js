var nodemailer = require('nodemailer');
/*
var generator = require('xoauth2').createXOAuth2Generator({
    user: '{dfwroomy}',
    clientId: '{830211718461-jfb1dflo679p1sif4tlq9dha9t26jrsc.apps.googleusercontent.com}',
    clientSecret: '{MGkIKs43PkwiVDi1ElAwen6Y}',
    refreshToken: '{refresh-token}',
    accessToken: '{cached access token}' // optional
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

// send mail
transporter.sendMail({
    from: 'dfwroomy@google.com',
    to: 'receiver@example.com',
    subject: 'hello world!',
    text: 'Authenticated with OAuth2'
}, function(error, response) {
   if (error) {
        console.log(error);
   } else {
        console.log('Message sent');
   }
});

*/

function emailSender(smtpsInfo){
	this.transporter = nodemailer.createTransport(smtpsInfo);
	console.log("work");
	
};

emailSender.prototype.createMailOptions = function(from, to, subject, text, body){
	var mailOptions = {
		from: from, // sender address
		to: to, // list of receivers
		subject: subject, // Subject line
		text: text, // plaintext body
		html: body // html body
	};
	return mailOptions;
};

emailSender.prototype.sendMail = function(mailOptions){
	this.transporter.sendMail(mailOptions,function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
}
module.exports =emailSender;
/*

function emailSender(smtpsInfo){
	this.transporter = nodemailer.createTransport('smtps://dfwroomy%40gmail.com:1qaz2wsx3e@smtp.gmail.com');
	
	
}
// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"DFWRoomy" <dfwroomy@gmail.com>', // sender address
    to: 'liur180855@gmail.com', // list of receivers
    subject: 'Hello 3', // Subject line
    text: 'Hello world 1', // plaintext body
    html: '<b>Hello world 2</b>' // html body
};


module.exports = function(name, age) {

    this.name = name;
    this.age = age;
    
    this.get_name = function() {
        return this.name;
    }
    
    this.get_age = function() {
        return this.age;
    }
};
*/