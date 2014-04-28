// -----------------------------------------------------------------------
//	librivox_filter.js
//
//					Oct/27/2013
//
// -----------------------------------------------------------------------
function filter_going_proc (going_in,data_in)
{
	var data_out = new Object ();

	if (going_in === "completed")
		{
		for (var key in data_in)
			{
			if ("publicdate" in data_in[key])
				{
				data_out[key] = data_in[key];
				}
			}
		}
	else
		{
		for (var key in data_in)
			{
			if ("publicdate" in data_in[key])
				{
				}
			else
				{
				data_out[key] = data_in[key];
				}
			}
		}

	return	data_out;
}

// -----------------------------------------------------------------------
function filter_language_proc (language_in,data_in,array_languages)
{
	var data_out = new Object ();

	for (var key in data_in)
		{
		var lang = data_in[key].language;
		if (lang == language_in)
			{
			data_out[key] = data_in[key];
			}
		else if (language_in == "Others")
			{
			var flag = hantei_language_proc (lang,array_languages);

			if (flag)
				{
			data_out[key] = data_in[key];
				}
			}
		}

	return	data_out;
}

// -----------------------------------------------------------------------
function hantei_language_proc (lang,array_languages)
{
	var rvalue = true;

	for (var it=1; it< (array_languages.length - 1); it++)
		{
		if (lang === array_languages[it])
			{
			rvalue = false;
			break;
			}
		}

	return	rvalue;
}

// -----------------------------------------------------------------------
function filter_category_proc (category_in,data_in,array_categories)
{
	jQuery("#outarea_ff").text ("*** filter category = " + category_in);

//	var str_tmp = "";

	var data_out = new Object ();

	for (var key in data_in)
		{
		var categ = "";
		if ("category" in data_in[key])
			{
			var categ = data_in[key].category;
			}
		else if ("Category" in data_in[key])
			{
			var categ = data_in[key].Category;
			}

//		str_tmp += categ + "<br />";

		if (category_in == categ)
			{
			data_out[key] = data_in[key];
			}
		else if (category_in === "Others")
			{
			switch (categ)
				{
				case	"Fiction":
				case	"Non-fiction":
				case	"Poetry":
				case	"Dramatic Works":
					break;

				default:
					data_out[key] = data_in[key];
					break;
				}
			}

		}
//	jQuery("#outarea_gg").html (str_tmp);

	return	data_out;
}

// -----------------------------------------------------------------------
function filter_group_proc (group_in,data_in)
{
	jQuery("#outarea_ff").text ("*** filter group = " + group_in);

//	var str_tmp = "";

	var data_out = new Object ();

	if (group_in === "Group")
		{
		for (var key in data_in)
			{
			if ('readers' in data_in[key])
				{
				var readers = data_in[key].readers;
				if (1 < readers.length)
					{
					data_out[key] = data_in[key];
					}
				}
			}
		}
	else
		{
		for (var key in data_in)
			{
			if ('readers' in data_in[key])
				{
				var readers = data_in[key].readers;
				if (readers.length <= 1)
					{
					data_out[key] = data_in[key];
					}
				}
			else
				{
				data_out[key] = data_in[key];
				}
			}
		}
/*
	for (var key in data_in)
		{
		var readers = data_in[key].readers;

//		if (typeof reader=="object" && "length" in reader)
		if (1 < readers.length)
			{
			if (group_in === "Group")
                        	{
				data_out[key] = data_in[key];
				}
			}
		else
			{
			if (group_in === "Solo")
                        	{
				data_out[key] = data_in[key];
				}
			}




		}
*/

//	jQuery("#outarea_gg").html (str_tmp);

	return	data_out;
}

// -----------------------------------------------------------------------
function filter_completed_proc (month,data_in)
{
	var data_out = new Object ();

	if (month === "all")
		{
		for (var key in data_in)
			{
//			if ("completed" in data_in[key])
			if ("publicdate" in data_in[key])
				{
				data_out[key] = data_in[key];
				}
			}
		}
	else
		{
	for (var key in data_in)
		{
//		if ("completed" in data_in[key])
		if ("publicdate" in data_in[key])
			{
			ddx = data_in[key].publicdate;

			if (0 <= ddx.indexOf (month))
				{
				data_out[key] = data_in[key];
				}
			}
		}
		}

	return	data_out;
}

// -----------------------------------------------------------------------
function filter_title_reader_proc (data_in,key_title,key_reader)
{
	key_title = jQuery.trim (key_title);
	key_reader = jQuery.trim (key_reader);

	if (0 < key_title.length)
		{
		data_in = filter_title_proc (data_in,key_title);
		}

	if (0 < key_reader.length)
		{
		data_in = filter_reader_proc (data_in,key_reader);
		}

	return	data_in;
}

// -----------------------------------------------------------------------
function filter_title_proc (data_in,key_title)
{
	var data_out = new Object ();

	for (var key in data_in)
		{
		var title = "" + data_in[key].title;
		if (0<= title.indexOf (key_title))
			{
			data_out[key] = data_in[key];
			}
		}

	jQuery ("#outarea_ff").text ("title = " + key_title);

	return	data_out;
}

// -----------------------------------------------------------------------
function filter_reader_proc (data_in,key_reader)
{
	var data_out = new Object ();

	for (var key in data_in)
		{
//		var reader = "" + data_in[key].reader;
		var reader = "" + data_in[key].readers;
		if (0<= reader.indexOf (key_reader))
			{
			data_out[key] = data_in[key];
			}
		}

	jQuery ("#outarea_gg").text ("reader = " + key_reader);

	return	data_out;
}

// -----------------------------------------------------------------------
