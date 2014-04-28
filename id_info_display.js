// ---------------------------------------------------------------
//	id_info_display.js
//
//					Mar/21/2014
//
// ---------------------------------------------------------------
// [8]:
function id_info_display_proc (data_received,array_going)
{
	var str_menu = display_select_box_proc ('id_info','going',array_going);
	str_menu += "<p />";
	jQuery("#menu").html (str_menu);

	var str_out = sorted_id_display_proc (data_received);

	jQuery("#summary").html (str_out);
	jQuery("#contents").html ("<br />");


	jQuery (".id_info").change (function ()
               	{
		var index_going = jQuery (".id_info#going").get(0).selectedIndex;

		var going = array_going[index_going];

		var data_out = new Object ();
		if (going === array_going[0])
			{
			data_out = data_received;
			}
		else
			{
			data_out = filter_going_proc (going,data_received);
			}

		var str_summary = sorted_id_display_proc (data_out);
		jQuery("#summary").html (str_summary);
		});
}

// ---------------------------------------------------------------
// [8-4]:
function sorted_id_display_proc (book_in)
{
	var array_sorted = sort_by_id_proc (book_in);

	jQuery("#outarea_dd").text ("array_sorted.length = " + array_sorted.length);
	var icount = 0;

	var str_out = "";

	str_out += "<table class=\"id_info\">";

	str_out += "<tr>";
	str_out +="<th>id</th>";
	str_out +='<th>completed</th>';
	str_out +="<th>title</th>";
	str_out +="<th>author</th>";
	str_out +="<th>language</th>";
	str_out +="<th>genres</th>";
	str_out +="<th>totaltime</th>";
	str_out +="<th>readers</th>";
	str_out +="</tr>";

	var icount = 0;
	for (var it in array_sorted)
		{
		var key = array_sorted[it].key;
		var value = array_sorted[it].value;

		str_out += gen_id_record_proc (key,value);

		icount++;

		if (10000 <= icount)
			{
			break;
			}

		}

	str_out += "</table>";

	return	str_out;
}

// ---------------------------------------------------------------
// [8-4-6]:
function gen_id_record_proc (key,dd_cur)
{
	var str_out = "";

	str_out += "<tr>";

	str_out += td_id_gen_proc (key,dd_cur);

	str_out += "<td>";

	if ("publicdate" in dd_cur)
		{
		str_out += dd_cur.publicdate.substring (0,16);
		}
	else
		{
		str_out += "in progress";
		}

	str_out += "</td>";

	str_out += td_title_gen_proc (dd_cur);
	str_out += td_author_gen_proc (dd_cur);

	str_out += td_language_gen_proc (dd_cur);

	str_out += td_genres_gen_proc (dd_cur);

	if ("totaltime" in dd_cur)
		{
		str_out += "<td>" + dd_cur.totaltime + "</td>";
		}
	else
		{
		str_out += "<td><br /></td>";
		}

	str_out += td_reader_gen_proc (dd_cur);
 
	str_out += "</tr>";

	return	str_out;
}

// ---------------------------------------------------------------
