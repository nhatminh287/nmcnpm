function HandleLogin(){
    const username = document.getElementById('loginName').value;// email
    const password = document.getElementById('loginPassword').value;// Password
    if(username=="admin@admin.com" && password=="admin"){// kiem tra tu trong database
        alert("Login sucessfully!");
        // chuyen huong toi trang chu
    }
    else if(username=="" || password==""){// tai khoan hoac mat khau de trong
        document.getElementById("errorMsg")="";
        document.getElementById("errorMsg")="You must fill in all the information!";
    }
    else{// sai tai khoan hoac mat khau
        document.getElementById("errorMsg")="";
        document.getElementById("errorMsg")="Invalid Username or password!";
        // clear and refocus
        document.getElementById('loginName').value="";
        document.getElementById('loginPassword').value="";
        document.getElementById('loginName').focus();

        return false;
    }
}