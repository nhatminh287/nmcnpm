function HandleLogin(){
    const username = document.getElementById('loginName').innerHTML;
    const password = document.getElementById('loginPassword').innerHTML;
    document.getElementById('loginName').innerHTML = "asdasdasdasdasd";
}
document.getElementById("login-btn").onclick = HandleLogin();