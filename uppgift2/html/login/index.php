<?php
    include_once("../functions.php");

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $password = $_POST['password'];

        $mysqli = new mysqli("db", "root", "notSecureChangeMe", "uppgift2");

        $email = $mysqli->real_escape_string($_POST['email']);
        $query = "SELECT * FROM users WHERE email = '$email'";

        $id = (int)$_POST['id'];
        //"SELECT * FROM newsletter WHERE id = $id"

        var_dump($query);
        $result = $mysqli->query($query)->fetch_assoc();

        $query = "SELECT * FROM users WHERE email = ? AND password = ? AND category = ?";
        $statement = $mysqli->prepare($query);
        $statement->bind_params('ssi', $_POST['email'], $_POST['password'], $_POST['id']);
        $statement->execute();

        if($result !== null) {
            if($password === $result["password"]) {

                session_start();
                $_SESSION['is_logged_in'] = true;
                $_SESSION['role'] = $result["role"];
                
                header("Location: /my-account/");
            }
            else {
                header("Location: ".$_SERVER['REQUEST_URI']."?error=Incorrect password");
            }
        }
        else {
            header("Location: ".$_SERVER['REQUEST_URI']."?error=No user found");
        }

        die();
    }
?>
<?php
   include("../components/header.php");
?>
<form method="POST">
    <?php
        if(isset($_GET['error']) && $_GET['error']) {
            ?>
                <div><?php echo($_GET['error']); ?></div>
            <?php
        }
    ?>
    <input name="email" />
    <input name="password" type="password" />
    <input type="submit" />
</form>