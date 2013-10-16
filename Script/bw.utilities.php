<?php
    $values = $_POST;
    
    if($values['toSave'] == true)
	SaveScoreInTable($values);
    else
	echo GetScoreTable($values);
    
    function GetScoreTable($values){
	$fp = fopen ("../score.txt", "a+");
	$scores = array();
	var_dump("PWAAAAAAAAAAAAAAAAAAAAA");
	while(!feof($fp)) { //on parcourt toutes les lignes
	    $ligne = fgets($fp, 4096); // lecture du contenu de la ligne
	    $id = explode(':', $ligne);
	    $id = $id[0];
	    $name_array = explode(':', $ligne);
	    $name = explode(',', $name_array[1]);
	    $name = $name[0];
	    $score = $name[1];
	    
	    $scores[] = array('id' => $id, 'name' => $name, 'score' => $score);
	}
	var_dump($values);
	var_dump($scores);
	return $scores;
    }
    function SaveScoreInTable($values){
	$fp = fopen ("../score.txt", "w+");
	
	fputs($fp, $values['id']. ':' . $values['name'] . ',' . $values['score']);
	fclose ($fp);
    }
?>
