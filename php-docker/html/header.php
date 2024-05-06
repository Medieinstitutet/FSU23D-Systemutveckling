<html>
    <head>
        <title>
            <?php echo(get_window_title($title)); ?>
        </title>
        <style>
            a {
                color: #F0E234;
            }

            .list-item {
                border: 1px solid #000000;
            }
        </style>
    </head>
    <body>
        <header>
            <div>Logo</div>
            <nav>
                <a href="#">Länk 1</a>
                <a href="#">Länk 2</a>
            </nav>
        </header>
        <?php include("notice.php") ?>