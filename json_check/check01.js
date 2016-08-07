#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	check01.js
//
//					Aug/07/2016
//
// ---------------------------------------------------------------
function analyze_proc (data_in)
{
	console.log (data_in.totaltime)
	console.log (data_in.publicdate)
	console.log (data_in)
	console.log ()
}

// ---------------------------------------------------------------
console.log ("*** start ***")
var fs = require("fs")
var filename = "combined.json"
var json_str = fs.readFileSync (filename,'utf8')
var data_aa = JSON.parse (json_str)

// console.log (data_aa["id_9612"])

analyze_proc (data_aa.id_9612)
analyze_proc (data_aa.id_11021)

console.log ("*** end ***")
// ---------------------------------------------------------------
