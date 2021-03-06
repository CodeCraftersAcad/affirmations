exports.generateSignupEmailTemplate = user => {
    return {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: `Sign-up success: Thank you for signing up with CCA Affirmations`,
        html: `
       <div style="height: 50vh;
                 width: 80%;
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
                 overflow: hidden;">

    <div style="">
        <h1 style="text-align: center;
                    color: #e53935">Thank you ${user.name}:</h1>
        <p style="text-align: center;
                    width: 60%;
                    margin: 0 auto 20px auto;
                    color: black">
            You have successfully created an account with Affirmations
        </p>
    </div>

    <div style="width: 60%;
                height: auto;
                background-color: lightgrey;
                margin: 0 auto;
                padding: 2em;">
        <h3 style="text-align: center;
        margin: 0 20px; 
        color: black">
            You can log in with your username ${user.username}
        </h3>
        <p style="text-align: center;
               margin-top: 5px;
               color: black">
            You are now recieving daily affirmations!
        </p>

    </div>
</div>
                `
    };
};


exports.generateAffirmationEmail = (email) => {
    return {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: `Sign-up success: Thank you for signing up with CCA Affirmations`,
        html: `
       <div style="height: 50vh;
                 width: 80%;
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
                 overflow: hidden;">

    <div style="">
        <h1 style="text-align: center;
                    color: #e53935">Your First Affirmation:</h1>
        <p style="text-align: center;
                    width: 60%;
                    margin: 0 auto 20px auto;
                    color: black">
            You have successfully created an account with Affirmations
        </p>
    </div>

    <div style="width: 60%;
                height: auto;
                background-color: lightgrey;
                margin: 0 auto;
                padding: 2em;">
     
        <p style="text-align: center;
               margin-top: 5px;
               color: black">
            You are now receiving daily affirmations!
        </p>

    </div>
</div>
                `
    };
}

exports.generatePasswordResetEmailTemplate = (user) => {
    const returnUrl = `https://localhost:3000/user/passwordreset/${user.resetPassword.resetCode}`
    return {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: `CCA Affirmation password reset`,
        html: `
       <div style="height: 50vh;
                 width: 80%;
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
                 overflow: hidden;">

    <div style="">
        <h1 style="text-align: center;
                    color: #e53935">Your Password reset request:</h1>
        <p style="text-align: center;
                    width: 60%;
                    margin: 0 auto 20px auto;
                    color: black">
            You requested a password reset. Please <a href="${returnUrl}">click here.</a>
        </p>
    </div>
</div>
                `
    };
}

exports.generateUserUpdatedEmailTemplate = (user) => {
    return {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: `CCA Affirmation updated account information`,
        html: `
       <div style="height: 50vh;
                 width: 80%;
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
                 overflow: hidden;">

    <div style="">
        <h1 style="text-align: center;
                    color: #e53935">Your account has been updated:</h1>
        <p style="text-align: center;
                    width: 60%;
                    margin: 0 auto 20px auto;
                    color: black">
            You have recently updated your information
        </p>
    </div>
</div>
                `
    };
}

exports.generateUserDeleteAccountEmailTemplate = (user) => {
    const returnUrl = `https://localhost:3000/survey/improvement`

    return {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: `CCA Affirmation deleted account`,
        html: `
       <div style="height: 50vh;
                 width: 80%;
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
                 overflow: hidden;">

    <div style="">
        <h1 style="text-align: center;
                    color: #e53935">Your account has been deleted:</h1>
        <p style="text-align: center;
                    width: 60%;
                    margin: 0 auto 20px auto;
                    color: black">
            Your account has been deleted and all stored information we have on you. We hope to see you back soon. 
            If there is anything you think we can do to improve please leave us a comment <a href="${returnUrl}">here.</a>
        </p>
    </div>
</div>
                `
    };
}