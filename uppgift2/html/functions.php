<?php
    include_once(".env");
    
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
?>