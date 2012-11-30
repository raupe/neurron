<?php
header("Access-Control-Allow-Origin: *");

$empfaenger = "info@neurron.com";
$absendername = "Neurron - Server";
$absendermail = "info@neurron.com";
$betreff = "Server Maybe Down";
$text = "Close Event wurde auf dem Browser abgefeuert";

mail($empfaenger, $betreff, $text, "From: $absendername <$absendermail>");
