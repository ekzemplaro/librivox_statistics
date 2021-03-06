// -----------------------------------------------------------------------
//	librivox_utility.js
//
//					Dec/04/2014
//
// -----------------------------------------------------------------------
function convert_to_second (totaltime)
{
	var second = 0;

	var aa = 0;

	if (typeof (totaltime) != "string")
		{
		second = 0;
		}
	else if (totaltime == null)
		{
		second = 0;
		}
	else if (totaltime.length < 6)
		{
		second = 0;
		}
	else
		{
		aa = totaltime.indexOf (":");

	var hour = parseInt (totaltime.substring (0,aa),10);

	var str_min = totaltime.slice (aa + 1);
	var bb = str_min.indexOf (":");

	var min = parseInt (str_min.substring (0,bb),10);

	var sec = parseInt (str_min.slice (bb +1),10);

	second = hour * 3600 + min * 60 + sec;

		}

	if (second.toString () == "NaN")
		{
		second = 0;
		}

	return	second;
}

// -----------------------------------------------------------------------
function convert_to_hour (second)
{
	var str_ret = "";

	var day = 0;

	if (second.toString () == "NaN")
		{
		str_ret = "--:--:--";
		}
	else
		{ 
		var hour = Math.floor (second / 3600);

		if (24 < hour)
			{
			day = Math.floor (hour / 24);
			hour = hour - day * 24;
			}


		var sec_tmp = (day * 24 + hour) * 3600;

		var min = Math.floor ((second - sec_tmp) / 60);

		var ss = second - sec_tmp - min * 60;

		if (hour < 10)
			{
			hour = "0" + hour;
			}

		if (min < 10)
			{
			min = "0" + min;
			}

		if (ss < 10)
			{
			ss = "0" + ss;
			}

		str_ret = "" + hour + ":" + min + ":" + ss;

		if (0 < day)
			{
			str_ret = day + ":" + str_ret;
			}
		}

	return	str_ret;
}

// -----------------------------------------------------------------------
function sort_by_number (obj)
{
	var ary = new Array();
	for(var it in obj)
		{
		ary.push({key:it, value:obj[it]});
		}

	ary = ary.sort(sort_by_number_single);
	var ret = new Object();
	for(var it = 0; it < ary.length; it++)
		{
		var iv = ary[it];
		ret[iv.key] = iv.value;
		}

	return ret;
}

// -----------------------------------------------------------------------
function sort_by_number_single(left, right)
{
	aa = parseInt(left.value.num,10);
	bb = parseInt(right.value.num,10);
	return aa > bb ? -1 : aa < bb ? 1 : 0;
}

// -----------------------------------------------------------------------
