<?php
    session_start();


    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        //METODO: add to database

        //var_dump($_POST['name']);
        $mysqli = new mysqli("db", "root", "notSecureChangeMe", "test");

        $old_name = $_SESSION['name'];

        $message = "Name updated ".$mysqli->real_escape_string($old_name)." -> ".$mysqli->real_escape_string($_POST['name']);

        $sql = "INSERT INTO logs (message) VALUES ('$message')";
        $result = $mysqli->query($sql);

        $_SESSION['name'] = $_POST['name'];

        header('Location: /?success=1');

        exit;
    }
?><html>
    <body>
        <?php
            
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                if(isset($_GET['success']) && $_GET['success'] == "1") {
                    ?>
                        <div style="border: 2px solid #FF0000">
                            Name updated
                        </div>
                    <?php
                }
                if(isset($_SESSION['name']) && $_SESSION['name']) {
                    echo "Hello " . $_SESSION['name'];
                    ?>
                        <p>Change name</p>
                        <form method="POST">
                            <input name="name" value="<?php echo($_SESSION['name']); ?>" />
                            <input type="submit" />
                        </form>
                    <?php
                }
                else {
                    ?>
                        <p>Who are you?</p>
                        <form method="POST">
                            <input name="name" />
                            <input type="submit" />
                        </form>
                    <?php
                }

                ?>
                    <h2>Logs</h2>
                <?php

                $mysqli = new mysqli("db", "root", "notSecureChangeMe", "test");

                $result = $mysqli->query("SELECT * FROM logs");

                $rows = $result->fetch_all(MYSQLI_ASSOC);

                foreach($rows as $row) {
                    ?>
                        <p><?php echo($row["message"]); ?></p>
                    <?php
                }
            }
        ?>
    </body>
</html>