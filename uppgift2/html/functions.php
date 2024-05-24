<?php
    include_once(__DIR__ . "/.env");
    
    function test_function() {
        var_dump(getenv('UNIQID'));
    }

    function create_user($email, $password) {

        md5($password.$salt);

        //INSERT in database
    }

    function login($email, $password) {


        $hash = md5($password.$salt);

        //SELECT * FROM Users WHERE email = $email AND $password = $hash 
    }

    function send_mail() {

        $domain = "sandbox5ffb1f028ba341da88f8e3e8377dee6d.mailgun.org";

        //Hämta mottagare
        $to = "developedbymecom+test1@gmail.com";
        //Hämta subject och body
        $subject = "Test email";
        $body = "Reset password here";
        //Hämta from
        $from = "postmaster@$domain";

        //Hämta api nyckel
        $api_key = "f5c0374e8b15c590719849f7d9c81467-32a0fef1-6f6fbb6c";

        $endpoint = "https://api.mailgun.net/v3/$domain/messages";
        echo("<pre>");
        var_dump($endpoint);
        $ch = curl_init($endpoint);

        $form_fields = array(
            'to' => $to,
            'from' => $from,
            'subject' => $subject,
            'text' => $body
        );

        var_dump($form_fields);

        $query = http_build_query($form_fields);
        var_dump($query);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query); // Encode the array as a URL-encoded query string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, "api:$api_key");

        $result = curl_exec($ch);

        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        var_dump($code);

        var_dump($result);
        echo("</pre>");

        curl_close($ch);
    }
