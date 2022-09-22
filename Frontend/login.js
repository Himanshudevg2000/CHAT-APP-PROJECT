const loginbtn = document.getElementById('loginbtn')

loginbtn.addEventListener('click', (e) => {

    e.preventDefault();
    
    const email = document.getElementById('emailid').value
    const password = document.getElementById('passid').value
    
    const logindetails = {
       email: email,
       password: password
    }
    
    axios.post("http://localhost:9000/signup/login" , logindetails)
    .then(response => {
            console.log(response)
            alert(response.data.message);
            localStorage.setItem('token',response.data.token);
            window.location = 'HomePage.html'
            console.log(response)
    })
    .catch(err => {
        // alert(err)
        console.log(err)
        document.body.innerHTML += `<div> ${err.message} <div/>`
    })
})