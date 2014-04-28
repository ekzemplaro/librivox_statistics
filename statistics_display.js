// -----------------------------------------------------------------------
//	statistics_display.js
//
//					Nov/27/2013
//
// -----------------------------------------------------------------------
// [6]:
function statistics_display_proc (text_months,data_received)
{
	jQuery("#outarea_bb").html
		("*** statistics_display *** Nov/27/2013 ***");

	jQuery("#menu").html (text_months);

	display_data_proc (data_received,"all");

	jQuery ("button.month").click (function ()
  		{
		var month = this.id;

		jQuery ("button.month").css ("color","black");
		jQuery ("button#" + this.id).css ("color","blue");

		display_data_proc (data_received,month);
		});
}

// -----------------------------------------------------------------------
// [6-4]:
function display_data_proc (data_received,month)
{
	var data_out = filter_completed_proc (month,data_received);

	var languages = sum_by_languge_proc (data_out);
	var str_summary = summary_gen_proc (month,languages);

	jQuery("#summary").html (str_summary);

	var out_str = display_books_proc (data_out);
	jQuery("#contents").html (out_str);

	delete out_str;
}

// -----------------------------------------------------------------------
// [6-4-8]:
function sum_by_languge_proc (data_out)
{
	var languages = new Object ();

	for (var it in data_out)
		{
		var dd_cur = data_out[it];
		var language = dd_cur.language;
		var second = convert_to_second (dd_cur.totaltime);

		var genres = '';

		if ('genres' in dd_cur)
			{
			genres = dd_cur.genres;
			}

		if (! (language in languages))
			{
			languages[language] = languge_parser_new (genres);
			}

		languages[language] = genre_parser (genres,languages[language]);

		languages[language].second += second;
		languages[language].num += 1;
		}

	return	languages;
}

// -----------------------------------------------------------------------
function genre_parser (genres,lang_cur)
{
	if (1 < genres.length)
		{
		switch (genres.substring (0,2))
			{
/*
				case	"F":
					lang_cur.fiction += 1;
					break;
*/
			case	"*N":
				lang_cur.nonfiction += 1;
				break;

			case	"Po":
				lang_cur.poetry += 1;
				break;

			case	"Dr":
				lang_cur.drama += 1;
				break;

			default:
				lang_cur.others += 1;
				break;

			}
		}
	else
		{
		lang_cur.others += 1;
		}

	return	lang_cur;
}

// -----------------------------------------------------------------------
function languge_parser_new (genres)
{
	var lang_cur = new Object ();
	lang_cur.num = 0;
	lang_cur.second = 0;

	lang_cur.fiction = 0;
	lang_cur.nonfiction = 0;
	lang_cur.poetry = 0;
	lang_cur.drama = 0;
	lang_cur.others = 0;

//	lang_cur = genre_parser (genres,lang_cur);

	return	lang_cur;
}

// -----------------------------------------------------------------------
// [6-4-12]:
function summary_gen_proc (month,languages)
{
	languages = sort_by_number (languages);

	var nn_languages = 0;
	var sum_total = new Object ();
	sum_total.num = 0;
	sum_total.second = 0;
	sum_total.fiction = 0;
	sum_total.nonfiction = 0;
	sum_total.poetry = 0;
	sum_total.drama = 0;
	sum_total.others = 0;

	for (var it in languages)
		{
		sum_total.num += languages[it].num;
		sum_total.second += languages[it].second;
		sum_total.fiction += languages[it].fiction;
		sum_total.nonfiction += languages[it].nonfiction;
		sum_total.poetry += languages[it].poetry;
		sum_total.drama += languages[it].drama;
		sum_total.others += languages[it].others;
		nn_languages += 1;
		}

	var hour_sum = convert_to_hour (sum_total.second);

	var str_lang = "<blockquote>";
	str_lang += "<table>";
	str_lang +="<tr><th>" + month + "</th>";
	str_lang +="<th>no</th>";
	str_lang +="<th>time</th>";
	str_lang +="<th>Fiction</th>";
	str_lang +="<th>Non-fiction</th>";
	str_lang +="<th>Poetry</th>";
	str_lang +="<th>Dramatic Works</th>";
	str_lang +="<th>Others</th>";
	str_lang +="</th></tr>";

	str_lang +="<tr><td>Total (" + nn_languages +  ")</td>";
	str_lang +="<td>" + sum_total.num + "</td>";
	str_lang +="<td>" + hour_sum + "</td>";
	str_lang +="<td>" + sum_total.fiction + "</td>";
	str_lang +="<td>" + sum_total.nonfiction + "</td>";
	str_lang +="<td>" + sum_total.poetry + "</td>";
	str_lang +="<td>" + sum_total.drama + "</td>";
	str_lang +="<td>" + sum_total.others + "</td>";
	str_lang +="</tr>";

	for (var it in languages)
		{
		var hour_sum_ss = convert_to_hour (languages[it].second);
		str_lang += "<tr>";
		str_lang += "<td class=\"" + it + "\">";
		str_lang +=  it + "</td>";
		str_lang += "<td>";
		str_lang += languages[it].num + "</td>";
		str_lang += "<td>";
		str_lang += hour_sum_ss + "</td>";
		str_lang += "<td>" + languages[it].fiction + "</td>";
		str_lang += "<td>" + languages[it].nonfiction + "</td>";
		str_lang += "<td>" + languages[it].poetry + "</td>";
		str_lang += "<td>" + languages[it].drama + "</td>";
		str_lang += "<td>" + languages[it].others + "</td>";
		str_lang += "</tr>";
		}

	str_lang += "</table>";
	str_lang += "</blockquote>";

	return	str_lang;
}

// -----------------------------------------------------------------------
