// ---------------------------------------------------------------
//	notes_display.js
//
//					Aug/09/2012
//
// ---------------------------------------------------------------
function notes_display_proc ()
{
	var file_text = "doc/notes.txt";

	jQuery.get(file_text,function (data_read)
		{
		jQuery("#summary").html (data_read);
		});

	jQuery("#menu").html ("<br />");

	jQuery("#contents").html ("<br />");

}

// ---------------------------------------------------------------
