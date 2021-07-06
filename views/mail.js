function myFunction() {
    const nodemailer = require('nodemailer');
    const { google } = require('googleapis');
    
    //OAuth details
    const CLIENT_ID = '707895967980-g6t3plkggnb1c19i1h8q9ei5ljo5nbs1.apps.googleusercontent.com'
    const CLEINT_SECRET = '-60bUG_BnYE_xaUWD6GtLcSk'
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04MxJWjPmRGM7CgYIARAAGAQSNwF-L9Ir7Lxzd-0aUH6BbtZwa7u_ATKTKUXuXcaiNNmoCQBl1eMB7KiKbrpMSTA9DS-JZPMl4l8';
    
    // Sending Email
    
    
    
    
    
    
        console.log("Function Invoked");
        
        
        
        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        
        async function sendMail(){
            try{
                const accessToken = await oAuth2Client.getAccessToken()
        
                const transport = nodemailer.createTransport({
                     service: 'gmail',
                     auth :{
                         type: 'OAuth2', 
                         user: 'join.khat@gmail.com',
                         clientId: CLIENT_ID,
                         clientSecret: CLEINT_SECRET,
                         refreshToken: REFRESH_TOKEN,
                         accessToken: accessToken
                     }
                })
        
        
                const mailOptions = {
                    from: 'Anshul Prasad,<join.khat@gmail.com>',
                    to: 'anshulprasad25@gmail.com',
                    subject: 'Helloooo Brrooooo',
                    text: 'This mail has been sent through  APIIIIIII ..... Whatya doingggggg????!!!!',
                    html: '<h1>This mail has been sent through  APIIIIIII ..... Whatya doingggggg????!!!!</h1><br><p style="color:white; background-color:red; text-align:center;";>Dont just sleep move ya lazy assss!!!</p>'
                };
        
        
                const result = await transport.sendMail(mailOptions)
                return result
        
        
            }catch(error){
                return error
            }
        }  
        
        
        sendMail()
        .then((result) => console.log('Mail sent.... ', result))
        .catch((error) => console.log(error.message));
        }
        
    