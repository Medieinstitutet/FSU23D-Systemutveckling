import React, {useState} from 'react';

export default (props:object) => {

    let url = "login.json"; //METODO: change to live backend
    let successUrl = "#"; //METODO: change to live page

    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");

    let submit = async (e:Event) => {
        e.preventDefault();

        try {
            let result = await fetch(url, {
                "method": "POST",
                "body": JSON.stringify({"userName": userName, "password": password})
            });
            let resultData = await result.json();
    
            if(resultData.signedIn) {
                document.location.href = successUrl;
                console.log("Signed in");
            }
            else {
                alert("Unable to sign in");
            }
        }
        catch(error) {
            alert("Something went wrong");
        }
    }

    return <div>
        <div>
            <form onSubmit={(e) => submit(e)}>
                <div>
                    <div><label>User name</label></div>
                    <input type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="you@mail.com"/>
                </div>
                <div>
                    <div><label>Password</label></div>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                </div>
                <input type="submit" />
            </form>
        </div>
    </div>
  }