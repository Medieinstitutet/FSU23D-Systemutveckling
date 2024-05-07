<?php
    session_start();

    $films = array(
        "The good, the bad and the ugly",
        "Titanic",
        "Jönsonligan"
    );

    if(isset($_GET['add']) && $_GET['add']) {
        if(!isset($_SESSION['likedFilms'])) {
            $_SESSION['likedFilms'] = array();
        }
        $_SESSION['likedFilms'][] = $_GET['add'];
    }

    if(isset($_GET['remove']) && $_GET['remove']) {

        foreach($_SESSION['likedFilms'] as $index => $film) {
            if($film === $_GET['remove']) {
                unset($_SESSION['likedFilms'][$index]);

                $_SESSION['likedFilms'] = array_values($_SESSION['likedFilms']);
            }
        }
    }
?>
<html>
    <body>
        <?php
            foreach($films as $film) {
                ?>
                    <div style="border: 1px solid #000000">
                        <?php echo($film); ?>

                        <?php
                            $is_liked = in_array($film, $_SESSION['likedFilms']);
                            if($is_liked) {
                                ?>Ja gillar denna, <a href="?remove=<?php echo($film); ?>">Ta bort</a><?php
                            }
                            else {
                                ?><a href="?add=<?php echo($film); ?>">Gilla</a><?php
                            }
                            
                        ?>
                    </div>
                <?php
            }
        ?>
    </body>
</html>