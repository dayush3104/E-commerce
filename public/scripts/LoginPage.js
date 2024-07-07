const LoginForm = document.getElementById('loginForm');

localStorage.setItem('userID', '');
localStorage.setItem('isLoggedIn', false);

LoginForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	await fetch('/user/login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email,password})
	})
	.then(response => response.json())
	.then(data => {
		if(data.success){
			localStorage.setItem('userID', data.userID);
			localStorage.setItem('isLoggedIn', true);
			LoginForm.reset();
			window.location.href = '/user/home';
		}
		else{
            console.log(`(LoginPage.js) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`(LoginPage.js) : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`(LoginPage.js) : ${error}`);
    });

});