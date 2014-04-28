// ---------------------------------------------------------------
//	readers_display.js
//
//					Oct/26/2013
//
// ---------------------------------------------------------------
// [8]:
function readers_display_proc (data_received,array_going,array_group)
{
	var nn_min = 4;
	var data_readers =  readers_summary_display_proc (nn_min,data_received);
	readers_click_parser_proc (data_received,data_readers);

	var str_menu = display_select_box_proc ('readers','going',array_going);
	str_menu += display_select_box_proc ('readers','group',array_group);

	jQuery("#menu").html (str_menu);
	jQuery("#contents").html ("<br />");

	jQuery (".readers").change (function ()
               	{
		jQuery("#contents").html ("<br />");
		jQuery("#outarea_cc").text ("***  readers ***" + this.id);

		var index_going = jQuery (".readers#going").get(0).selectedIndex;
		var index_group = jQuery (".readers#group").get(0).selectedIndex;

		var str_tmp = "***  readers ***" + array_going[index_going] + "<br />" ;
		str_tmp += "***  readers ***" + array_group[index_group] + "<br />" ;
		jQuery("#outarea_ee").html (str_tmp);

		var going = array_going[index_going];
		var group = array_group[index_group];

		var data_out = new Object ();
		data_out = data_received;


		if (group !== array_group[0])
		{
		data_out = filter_group_proc (group,data_out);
		if (group === array_group[2])
			{
			nn_min = 1;
			}
		}

		if (going !== array_going[0])
			{
			data_out = filter_going_proc (going,data_out);

			if (going === array_going[1])
				{
				if (nn_min !== 1)
					{
					nn_min = 3;
					}
				}
			else
				{
				nn_min = 1;
				}
			}

		data_readers = readers_summary_display_proc (nn_min,data_out);
		readers_click_parser_proc (data_received,data_readers);
		});

}

// ---------------------------------------------------------------
// [8-2]:
function readers_summary_display_proc (nn_min,book_in)
{
	var data_readers = convert_to_reader_proc (book_in);
	var array_sorted = sort_by_size_proc (data_readers);
	var str_tmp = "*** readers_summary_display_proc *** array_sorted.length = " + array_sorted.length + '<br />';
	str_tmp += "*** nn_min = " + nn_min + '<br />';
jQuery ("#outarea_cc").html (str_tmp);
	var str_out = sorted_readers_display_50_proc (nn_min,array_sorted);
	jQuery("#summary").html (str_out);

	return	data_readers;
}

// ---------------------------------------------------------------
function readers_click_parser_proc (data_received,data_readers)
{
	jQuery ("table.readers td").click (function ()
     		{
		var idx = this.id;

		if (idx != "")
			{
			jQuery ("#outarea_aa").text (idx);

			var id_array = data_readers[idx];
			var data_out = data_out_generate_proc
				(id_array,data_received);

			var str_contents = display_books_proc (data_out);
			jQuery("#contents").html (str_contents);
			}
		});
}

// ---------------------------------------------------------------
// [8-8]:
function data_out_generate_proc (id_array,data_in)
{
	var data_out = new Object ();

	for (var it in id_array)
		{
		var idx = id_array[it];
		data_out[idx] = data_in[idx];
		}

	return	data_out;
}

// ---------------------------------------------------------------
// [8-4]:
function convert_to_reader_proc (book_in)
{
	var data_readers = new Object ();

	for (var key in book_in)
		{
//		var readers = book_in[key].readers;
		var readers = book_in[key]['readers'];

//		if ((reader=="object") && ("length" in reader))
//		if (reader instanceof Array)
//			{
//			for (var it=0; it< readers.length; it++)
			for (var it in readers)
				{
				data_readers = data_add_proc (key,readers[it],data_readers);
				}
/*
			}
		else
			{
			data_readers = data_add_proc (key,reader,data_readers);
			}
*/

		}


	return	data_readers;
}

// ---------------------------------------------------------------
function data_add_proc (key,reader,data_readers)
{
	if (reader in data_readers)
		{
		var llx = data_readers[reader].length;
		data_readers[reader][llx] = key;
		}
	else
		{
		var array_aa = new Array ();
		array_aa[0] = key;
		data_readers[reader] = array_aa;
		}

	return	data_readers;
}

// ---------------------------------------------------------------
function sorted_readers_display_50_proc (nn_min,array_sorted)
{
	var icount = 0;

	var str_out = "<blockquote>";
	str_out += "Click a reader-name & scroll down, please.";
	str_out += "</blockquote>";
	str_out += "<table class=\"readers\">";

	var nn_out = 0;
	for (var it in array_sorted)
		{
		var value = array_sorted[it].value;

		if (value.length < nn_min)
			{
			break;
			}

		nn_out += 1;
		}

	var nnx = Math.floor (nn_out / 5) + 1;

var str_tmp = "*** sorted_readers_display_50_proc *** array_sorted.length = " + array_sorted.length + '<br />';
	str_tmp += "*** nn_out = " + nn_out + '<br />';
	str_tmp += "*** nnx = " + nnx + '<br />';
jQuery ("#outarea_dd").html (str_tmp);
	var array_aa = new Array (nnx);

	for (var it=0; it< array_aa.length; it++)
		{
		array_aa[it] = new Array (10);
		for (var kt=0; kt<10; kt++)
			{
			array_aa[it][kt] = "";
			}
		}


	var icount = 0;
	for (var it in array_sorted)
		{
		var jt = Math.floor (icount / 5);
		var kt = icount % 5;

		var key = array_sorted[it].key;
		var value = array_sorted[it].value;

		if (value.length < nn_min)
			{
			break;
			}

		array_aa[jt][kt*2] = key;
		array_aa[jt][kt*2+1] = value.length;

		icount++;

		if ((array_aa.length * 5) <= icount)
			{
			break;
			}

		}

		
	for (var jt=0; jt<array_aa.length; jt++)
		{
		if (array_aa[jt][0] === "")
			{
			break;
			}

		str_out += "<tr>";

var p_count = jt * 5 + 1;
str_out += "<th>" + p_count + "<th />";

		for (var kt=0; kt<10; kt++)
			{
			var vv = array_aa[jt][kt];
			if ((kt % 2) === 0)
				{
			str_out += "<td class=\"reader\" id=\"" + vv + "\">";
				str_out += "id_";
				}
			else
				{
				str_out += "<td>";
				}

			str_out += vv + "</td>";
			}

		str_out += "</tr>";
		}

	str_out += "</table>";

	return	str_out;
}

// ---------------------------------------------------------------
