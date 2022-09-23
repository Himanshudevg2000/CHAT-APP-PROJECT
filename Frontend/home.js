
window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();


    const token = localStorage.getItem('token');
    axios.get("http://localhost:9000/chatroutes/chatroutes", {headers: {"Authorization": token}})
        .then(result => {
            console.log(result.data.result[0].name)
            showuser(result.data.result[0].name)
            // showuser(result.data.result[1].name)
        })

    axios.get("http://localhost:9000/chatroutes/getmessages", {headers: {"Authorization": token}})
        .then(result => {
            for(let i=0; i<result.data.result.length; i++){
                console.log(result.data.result[i].messages)
                showmessage( result.data.result[i].userId,result.data.result[i].messages)
            }

        })
})

function showmessage(res, result){
    const showmsg = document.getElementById('show')
    showmsg.innerHTML+= `<h3>${res} - ${result} </h3>`
}


function showuser(result){
    const main = document.getElementById('mess')
    main.innerHTML += `<h2> ${result} joined </h2>`
}

const logout = document.getElementById('logout')
logout.addEventListener('click', () => {
    if(confirm("do you reallt want to logout")){
        window.location = "login.html"
    }
})


// const sendbtn = document.getElementById('msgbtn')

// sendbtn.addEventListener('click',(e)=> {
//     const messages = document.getElementById('msginput').value

//     const msg = {
//         messages:messages
//     }

//     const token = localStorage.getItem('token');
//     axios.post("http://localhost:9000/chatroutes/messages", msg, { headers: {"Authorization" : token} })
//         .then(result => {
            
//             console.log(result)
//             console.log("message sent")
//         })
//         .catch(err => {
//             console.log('Oh no')
//             console.log(err)
//         })
// })
