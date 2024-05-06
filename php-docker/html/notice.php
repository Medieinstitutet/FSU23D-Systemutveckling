<?php
    if(isset($_GET['success']) && $_GET['success'] == "1") {
        ?>
            <div style="border: 2px solid #00FF00;">
                <?php
                    if(isset($_GET['message'])) {
                        echo($_GET['message']);
                    }
                    else {
                        ?>Success<?php
                    }
                ?>
            </div>
        <?php
    }
?>