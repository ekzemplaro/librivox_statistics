// ---------------------------------------------------------------
//	sort_by_size.js
//
//					Aug/03/2012
//
// ---------------------------------------------------------------
function sort_by_size_proc (obj_in)
{
	var array = new Array();
	for(var it in obj_in)
		{
		array.push({'key':String (it), 'value':obj_in[it]});
		}

	array.sort (sort_func);

	return array;
}
  
// ---------------------------------------------------------------
function sort_func(left, right)
{
	var aa = 1;
//	if (left.value instanceof Array)
	if (typeof left.value == "object" && "length" in left.value)
		{
		aa = parseInt(left.value.length,10);
		}

	var bb = 1;
//	if (right.value instanceof Array)
	if (typeof right.value == "object" && "length" in right.value)
		{
		bb = parseInt(right.value.length,10);
		}


	var rvalue = 0;

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
