// -----------------------------------------------------------------------
//	librivox_statistics.js
//
//					Aug/02/2014
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** librivox_statistics *** start *** Aug/02/2014 ***");

	var file_json = "latest_on_going.json";

	var text_months = gen_month_button_row_proc (2014,8);
	text_months += gen_month_button_row_proc (2013,12);
	text_months += gen_month_button_row_proc (2012,12);
	text_months += gen_month_button_row_proc (2011,12);
	text_months += gen_month_button_row_proc (2010,12);
	text_months += gen_month_button_row_proc (2009,12);
	text_months += gen_month_button_row_proc (2008,12);
	text_months += gen_month_button_row_proc (2007,12);
	text_months += gen_month_button_row_proc (2006,12);
	text_months += gen_month_button_row_proc (2005,12);

	fetch_json_proc (text_months,file_json);

	jQuery("#outarea_hh").html
		("*** librivox_statistics *** end *** Aug/02/2014 ***");
});

// -----------------------------------------------------------------------
// [2]:
function gen_month_button_row_proc (year,nn_month)
{
	var month_array = new Array ("Jan","Feb","Mar","Apr","May","Jun",
		"Jul","Aug","Sep","Oct","Nov","Dec");

	var button_head = "<button class=\"month\" id=\"";
	var str_ret = button_head + year + "\">" + year + "</button>";

	str_ret += '&nbsp&nbsp';

	for (var imonth=0; imonth < nn_month; imonth++)
		{
		if ((imonth % 3) === 0)
			{
			str_ret += '&nbsp';
			}

		str_ret += button_head + year_month_gen_proc (year,imonth) + "\">"
			+ month_array[imonth] + "</button>&nbsp";
		}

	str_ret += "<br />";

	return	str_ret;
}

// -----------------------------------------------------------------------
function year_month_gen_proc (year, imonth)
{
	var month = imonth + 1;

	var year_month = year + '-' + month;

	if (month <= 9)
		{
		year_month = year + '-0' + month;
		}

	return	year_month;
}

// -----------------------------------------------------------------------
// [6]:
function fetch_json_proc (text_months,file_json)
{
	var array_going = new Array ("All status","completed","in progress");

	var array_group = new Array ("Group & Solo","Group","Solo");

	jQuery.getJSON (file_json,function (data_received)
		{
		statistics_display_proc (text_months,data_received);

		jQuery ("button.control").click (function ()
       			{
			var mode = this.id;

		jQuery ("button.control").css ("color","black");
		jQuery ("#" + this.id).css ("color","blue");

			switch (mode)
				{
				case "statistics":
					statistics_display_proc
						(text_months,data_received);
					break;

				case "search":
					search_display_proc
					(data_received,array_going,array_group);
					break;

				case "readers":
					readers_display_proc
					(data_received,array_going,array_group);
					break;

				case "id_info":
					id_info_display_proc
						(data_received,array_going);
					break;

				case "notes":
					notes_display_proc (data_received);
					break;
				}
			});
		});
}

// -----------------------------------------------------------------------
