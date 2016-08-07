// -----------------------------------------------------------------------
//	check_statistics.js
//
//					Aug/07/2016
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** librivox_statistics *** start *** Aug/07/2016 ***");

	var file_json = "latest_on_going.json";


	fetch_json_proc (file_json);

	jQuery("#outarea_hh").html
		("*** librivox_statistics *** end *** Aug/07/2016 ***");
});

// -----------------------------------------------------------------------
// [6]:
function fetch_json_proc (file_json)
{
	var array_going = []

	var text_months = ""
	jQuery.getJSON (file_json,function (data_received)
		{
		statistics_display_proc (text_months,data_received)
		});
}

// -----------------------------------------------------------------------
