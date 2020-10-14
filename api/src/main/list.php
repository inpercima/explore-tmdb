<?php
require_once 'list.service.php';

$listsService = new ListsService();

// return json to client
echo $listsService->listAll($_SERVER['QUERY_STRING']);
?>
