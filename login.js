window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_FACEBOOK_APP_ID',
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
    });
};

document.getElementById('facebook-login-btn').addEventListener('click', function() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', function(response) {
                alert('Bem-vindo, ' + response.name + '!');
                window.location.href = 'welcome.html';
            });
        } else {
            alert('Erro no login com Facebook.');
        }
    });
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
}

gapi.load('auth2', function() {
    gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID'
    });
});

document.getElementById('google-login-btn').addEventListener('click', function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function(googleUser) {
        onSignIn(googleUser);
        alert('Bem-vindo, ' + googleUser.getBasicProfile().getName() + '!');
        window.location.href = 'welcome.html';
    }).catch(function() {
        alert('Erro no login com Google.');
    });
});

document.getElementById('github-login-btn').addEventListener('click', function() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID';
    // Adicionar lógica para redirecionar após login bem-sucedido
});

document.getElementById('linkedin-login-btn').addEventListener('click', function() {
    IN.User.authorize(function() {
        IN.API.Profile("me").result(function(result) {
            alert('Bem-vindo, ' + result.values[0].firstName + '!');
            window.location.href = 'welcome.html';
        }).error(function() {
            alert('Erro no login com LinkedIn.');
        });
    });
});
