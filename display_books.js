// -----------------------------------------------------------------------
//	display_books.js
//
//					Mar/21/2014
//
// -----------------------------------------------------------------------
// [4]:
function display_books_proc (data_out)
{
	var data_sorted = sort_by_date_proc (data_out);

	var array_rowspan = rowsapn_check_proc (data_sorted);
	array_rowspan = 1;

	var out_str = "<table>";

	out_str +="<tr><th>no</th>";
	out_str +='<th>completed</th>';
	out_str +="<th>id</th>";
	out_str +="<th>title</th>";
	out_str +="<th>author</th>";
	out_str +="<th>language</th>";
	out_str +="<th>genres</th>";
	out_str +="<th>totaltime</th>";
	out_str +="<th class=\"reader\">readers</th>";
	out_str +="</tr>";

	var ncount = 0;

	for (var it in data_out)
		{
		ncount += 1;
		}

	var it = 0;

	for (var it in data_sorted)
		{
		var key = data_sorted[it].key;

		var dd_cur = data_sorted[it].value;

		var nn_rowspan = array_rowspan[it];

		out_str += gen_record_proc (ncount,nn_rowspan,key,dd_cur);


		ncount--;
		it++;
		}

	out_str += "</table>";

	delete data_sorted;
	delete array_rowspan;

	return	out_str;
}

// -----------------------------------------------------------------------
// [4-2]:
function rowsapn_check_proc (data_sorted)
{
	var array_rowspan = new Array ();
	var array_keys = new Array ();

	for (var it in data_sorted)
		{
		array_keys.push (data_sorted[it].key);
		array_rowspan.push (1);
		}

	for (var it = (array_keys.length -1); 0 < it; it--)
		{
		if (data_sorted[it -1].value.completed
				=== data_sorted[it].value.completed)
			{
			array_rowspan[it-1] += array_rowspan[it];
			array_rowspan[it] = 0;

			}
		}

	delete array_keys;

	return	array_rowspan;
}

// -----------------------------------------------------------------------
// [4-6]:
function gen_record_proc (ncount,nn_rowspan,key,dd_cur)
{
	var out_str = "<tr><td>" + ncount + "</td>";


	nn_rowspan = 1;

	if ("publicdate" in dd_cur)
		{
		if (0 < nn_rowspan)
			{
			var ddx = dd_cur.publicdate.substring (0,16);
		out_str += "<td>" + ddx + "</td>";
			}
		}
	else
		{
		out_str += "<td>in progress</td>";
		}

	out_str += td_id_gen_proc (key,dd_cur);

	out_str += td_title_gen_proc (dd_cur);

	out_str += td_author_gen_proc (dd_cur);

	out_str += td_language_gen_proc (dd_cur);

	out_str += td_genres_gen_proc (dd_cur);

	if ("totaltime" in dd_cur)
		{
		out_str += "<td>" + dd_cur.totaltime + "</td>";
		}
	else
		{
		out_str += "<td><br /></td>";
		}

	out_str += td_reader_gen_proc (dd_cur);
 
	out_str += "</tr>";

	return	out_str;
}

// -----------------------------------------------------------------------
// [4-6-2]:
function td_id_gen_proc (key,dd_cur)
{
	var out_str = "<td>";

	var b_id = "b" + key.substr (3,7);

	if ("url_iarchive" in dd_cur)
		{
		if (5 < dd_cur.url_iarchive.length)
			{
		out_str += "<a href=\"" + dd_cur.url_iarchive + "\">";
		out_str += b_id +  "</a>";
			}
		else
			{
			out_str += b_id;
			}
		}
	else
		{
		out_str += b_id;
		}

	out_str += "</td>";

	return	out_str;
}

// -----------------------------------------------------------------------
// [4-6-4]:
function td_title_gen_proc (dd_cur)
{
	var out_str = "<td>";

	if ("url_librivox" in dd_cur)
		{
		if (5 < dd_cur.url_librivox.length)
			{ 
		out_str += "<a href=\"" + dd_cur.url_librivox + "\">";
		out_str += dd_cur.title + "</a>";
			}
		else
			{
		out_str += dd_cur.title;
			}
		}
	else
		{
		out_str += dd_cur.title;
		}

	out_str += "</td>";

	return	out_str;
}

// -----------------------------------------------------------------------
// [4-6-4]:
function td_author_gen_proc (dd_cur)
{
	var out_str = "<td>";

	if ("authors" in dd_cur)
		{
	out_str += "a" + dd_cur.authors;
		}
	else
		{
		}
	out_str += "</td>";

	return	out_str;
}

// -----------------------------------------------------------------------
// [4-6-6]:
function td_language_gen_proc (dd_cur)
{
	var out_str = "<td><br /></td>";

	if ("language" in dd_cur)
		{
		var language = dd_cur.language;

		out_str = "<td class=\"" + language + "\">" + language + "</td>";
		}

	return	out_str;
}

// -----------------------------------------------------------------------
// [4-6-8]:
function td_genres_gen_proc (dd_cur)
{
	var out_str = "";

	var genres = "<br />";

	if ("genres" in dd_cur)
		{
		genres = dd_cur.genres;
		}

	out_str += "<td>" + genres + "</td>";

	return	out_str;
}

// -----------------------------------------------------------------------
function category_define_proc (category_in)
{
	switch (category_in)
		{
		case	"Fiction":
		case	"Non-fiction":
		case	"Poetry":
		case	"Dramatic Works":
			category = category_in;
			break;

		default:
			category = "Others";
		}

	return	category;
}

// -----------------------------------------------------------------------
// [4-6-10]:
function td_reader_gen_proc (dd_cur)
{
	var out_str = "";

	if ("readers" in dd_cur)
		{
		out_str += "<td class=\"reader\">";
			{
			for (var it in  dd_cur.readers)
				{
				if (0 < it)
					{
					out_str += ", ";
					}

				out_str += dd_cur.readers[it];
				}
			}

		out_str += "</td>";
		}
	else
		{
		out_str += "<td><br /></td>";
		}

	return	out_str;
}

// -----------------------------------------------------------------------
