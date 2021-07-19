<?php
require_once '../service/core.service.php';
$coreService = new CoreService();

require_once $coreService->requireConfig();
require_once '../service/list.service.php';

$coreService->setHeader();
$listId = $coreService->getParam('listId');
$language = $coreService->getParam('language');

$listService = new ListService();
echo $listService->listAll($listId, $language);
?>
