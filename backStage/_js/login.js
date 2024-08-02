window.onload = function(){
    let loginUrl = 'http://localhost/frontend/bigProject/root/public/backStage/login/login.php'
    
    $('#forgetBN').click(function(){
        window.location.href = './loginForget.html';
    })
    

    document.getElementById('loginBN').addEventListener('click', async () => {
        const account = document.getElementById('account').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch('http://localhost/frontend/bigProject/root/public/backStage/login/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account, password })
        });
    
        const data = await response.json();
        // console.log(data);
        if (data.success) {
            window.location.href = '../overAll.html';
        } else {
            alert('Login failed');
        }
    });
    
}