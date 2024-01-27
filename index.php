<?php

//Processing time
include("classes/role.php");
$webdevrole = new Role("webdev", "Web Developer", "I am a web developer....more to be added");
$gamedevrole = new Role("gamedev", "Game Developer", "I am a game developer using Unity and Godot");
$cadrole = new Role("CAD", "CAD Designer", "I have designed CAD files for 3D printing since 2022");
$roles_array = array($webdevrole, $gamedevrole, $cadrole);


//Drawing HTML time
include("views/header.php");
include("views/home.php");
include("views/footer.php");