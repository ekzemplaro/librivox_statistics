// -----------------------------------------------------------------------
//	librivox_statistics.js
//
//					Aug/07/2016
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** librivox_statistics *** start *** Aug/07/2016 ***");

	var file_json = "latest_on_going.json";


	var text_months = '<select class="year_month" name="year">'

	text_months += '<option value="All">All</option>'

	for (var year=2016; 2005 <= year; year = year-1)
		{
		text_months += '<option value="' + year + '">' + year + '</option>'
		}
	text_months += '</select>'
	text_months += '&nbsp&nbsp';

//	var month_array = new Array ("All","Jan","Feb","Mar","Apr","May","Jun",
//		"Jul","Aug","Sep","Oct","Nov","Dec");

	var month_array = new Array ("All","01","02","03","04","05","06",
		"07","08","09","10","11","12");

	text_months += '<select class="year_month" name="month">'

	for (var it in month_array)
		{
		var month=month_array[it]
		text_months += '<option value="' + month + '">' + month + '</option>'
		}
	text_months += '</select>'

	fetch_json_proc (text_months,file_json);

	jQuery("#outarea_hh").html
		("*** librivox_statistics *** end *** Aug/07/2016 ***");
});

// -----------------------------------------------------------------------
// [2]:
function gen_month_button_row_proc (year,nn_month)
{
}

// -----------------------------------------------------------------------
function year_month_gen_procxx (year, imonth)
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

				case "authors":
					authors_display_proc
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
