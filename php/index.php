<?php
    include_once("startup.php");
    include_once("functions.php");
?>
<html>
    <body>
        <?php
            get_greeting("index.php");

            if(true) {
                ?>
                    <div>
                        <p>True</p>
                    </div>
                <?php
            }
            else {
                echo("False");
            }
        ?>
    </body>
</html>