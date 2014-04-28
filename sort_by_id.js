// ---------------------------------------------------------------
//	sort_by_id.js
//
//					Aug/08/2012
//
// ---------------------------------------------------------------
function sort_by_id_proc (obj_in)
{
	var array = new Array();
	for(var it in obj_in)
		{
		array.push({'key':String (it), 'value':obj_in[it]});
		}

	array.sort (sort_id_func);

jQuery ("#outarea_cc").text ("*** sort_by_id_proc *** " + array.length);

	return array;
}
  
// ---------------------------------------------------------------
function sort_id_func(left, right)
{
	var rvalue = 0;

	var aa = parseInt (left.key.slice(3));
	var bb = parseInt (right.key.slice(3));

	if (aa < bb)
		{
		rvalue = 1;
		}
	else if (aa > bb)
		{
		rvalue = -1;
		}

	return rvalue;
}

// ---------------------------------------------------------------
