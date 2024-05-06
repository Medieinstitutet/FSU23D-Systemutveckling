<?php
    function get_name($name = null) {
        if($name) {
            return $name;
        }
        return "stanger";
    }

    function get_window_title($title) {
        return $title.' - My awesome site';
    }
?>