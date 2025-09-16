<?php
/**
 * Ezoic ads.txt redirect for minglemining.com
 * This PHP file redirects /ads.txt to Ezoic's ads.txt manager
 * 
 * Usage: Rename this file to ads.txt or configure server to use this file
 */

// Set proper headers for ads.txt
header('Content-Type: text/plain');
header('Location: https://srv.adstxtmanager.com/19390/minglemining.com');
header('HTTP/1.1 301 Moved Permanently');

// Exit to prevent further execution
exit;
?>
