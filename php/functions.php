<?php
    function get_greeting($name) {

        $output = "Hello $name";

        //javascript `` = php ""
        //javascript "" = php '' 
        
        //echo($output);


        $number0 = 0;
        $number1 = 1;
        $number2 = 2.2;

        $result = (float)$number1 + (float)$number2;

        $result = (string)$result;

        //echo('<div>'.$result.'</div>');

        $boolean = true; //true | false

        $result2 = null;
        if(false) {
            $result2 = $boolean + (float)$number2;
        }
        else {
            //trigger_error("Felaktig typ", E_USER_NOTICE);
        }
        
        //echo('<div>'.$result2.'</div>');

        //[] {}

        $data = array(
            'firstName' => 'M',
            'lastName' => 'E',
            'address' => array(
                'address1' => 'Street 1',
                'city' => 'Stockholm'
            )
        );

        $data['email'] = 'mattias@example.com'; // data['email'] data.email

        $json = json_encode($data);
        echo($json);
        
        ?>
            <div>-----</div>
        <?php

        $data2 = array();

        $data2[] = 'item1'; // data.push('item1')
        $data2[] = 'item2';
        $data2[] = 'item3';

        $json = json_encode($data2);
        echo($json);

        ?>
            <div>-----</div>
        <?php

        $data3 = array();

        $data3[] = 'item1'; // data.push('item1')
        $data3[] = 'item2';
        $data3[] = 'item3';

        $data3['email'] = "m@example.com";

        $data3[] = 'item4';

        $json = json_encode($data3);
        echo($json);
        echo($data3['email']);

        ?>
            <div>-----</div>
        <?php

        $data4 = array();

        $data4[] = 'item1'; // data.push('item1')
        $data4[] = 'item2';
        $data4[] = 'item3';
        $data4[] = 'item4';

        unset($data4[1]);
        $data4 = array_values($data4);

        $json = json_encode($data4);
        echo($json);

        echo($data4[2]);

        ?>
            <div>-----</div>
        <?php

        $data = array(
            'firstName' => 'M',
            'lastName' => 'E',
            'address' => array(
                'address1' => 'Street 1',
                'city' => 'Stockholm'
            )
        );
        //var_dump($data);
        //var_dump($data['address']['city']);

        $data['email'] = 'mattias@example.com'; // data['email'] data.email

        $json = json_encode($data);

        //$data = json_decode($json);
        //var_dump($data->address->city);

        foreach($data as $name => $value) {
            echo($name.': ');
            var_dump($value);
            echo('<br />');

            if($name === 'email') {
                $data[$name] = 'mattias2@example.com';
            }
            else if($name === 'address') {
                ?>
                    <pre><?php
                    var_dump($value);
                    var_dump($value['city']);
                    $value['city'] = 'Göteborg';
                    $data[$name]['city'] = 'Göteborg';
                    var_dump($value['city']);
                    var_dump($value);
                ?>
                    </pre>
                <?php
            }
        }

        var_dump($data);
    }

    /*
    function getGreeting() {

    }
    */

    //get_greeting();
?>