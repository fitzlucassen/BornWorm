<?php
    $values = $_POST;

    if($values['toSave'] == 'true')
	SaveScoreInTable($values);
    else
	echo json_encode(GetScoreTable($values));
    
    function GetScoreTable($values){
	$fp = fopen ("../score.txt", "a+");
	$scores = array();
	while(!feof($fp)) { //on parcourt toutes les lignes
	    $ligne = fgets($fp, 4096); // lecture du contenu de la ligne
	    $id = explode(':', $ligne);
	    $id = $id[0];
	    $name_array = explode(':', $ligne);
	    $name = explode(',', $name_array[1]);
	    $name = $name[0];
	    $score = explode(',', $name_array[1]);
	    $score = $score[1];
	    
	    $scores[] = array('id' => $id, 'name' => $name, 'score' => $score);
	}
	
	return $scores;
    }
    function SaveScoreInTable($values){
	$fp = fopen ("../score.txt", "a+");
	
	fputs($fp, $values['id']. ':' . $values['name'] . ',' . $values['score'] . "\n");

	fclose ($fp);
    }
?>
