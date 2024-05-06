<?php
    include_once('functions.php');
    session_start();

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_POST['name'])) {
            $_SESSION['name'] = $_POST['name'];
        }

        header('Location: '.$_SERVER['REQUEST_URI'].'&success=1&message=Name updated');

        exit();
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/todos/1");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    var_dump($status);
    if($status === 200) {
        $data = json_decode($output);
    var_dump($data->title);

    $data = json_decode($output, true);
    var_dump($data['title']);
    }
    else {
        var_dump($output);
    }

    
?>
<?php
    $title = "My page";
    include('header.php');
?>
        <?php
            $greeting = "Hello ";

            if(isset($_SESSION['name'])) {
                $name_from_session = $_SESSION['name'];
            }
            else {
                $name_from_session = null;
            }

            $name = get_name($name_from_session);

            echo($greeting.$name);

            ?>
                <form method="POST">
                    <input name="name" />
                    <input type="submit" />
                </form>
            <?php

            $list = array(
                array("type" => "annans", "url" => "page.php?type=annans", "description" => "...1"),
                array("type" => "banan", "url" => "page.php?type=banan", "description" => "...2"),
                array("type" => "citron", "url" => "page.php?type=citron", "description" => "...<br />3")
            );

            foreach($list as $item) {
                if($item['type'] === $_GET['type']) {
                    ?>
                        <div>
                            <h1><?php echo($item['type']); ?></h1>
                            <div>
                                <?php echo($item['description']); ?>
                            </div>
                        </div>
                    <?php
                }
            }

            foreach($list as $item) {
                include('listitem.php');
            }

            //[]
        ?>
<?php
    include('footer.php');
?>