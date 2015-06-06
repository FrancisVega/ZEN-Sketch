// Sketch nudge distance to 8px and small 4px
// defaults write com.bohemiancoding.sketch3 nudgeDistanceSmall -float 4.0
// defaults write com.bohemiancoding.sketch3 nudgeDistanceBig -float 8.0


var doc = context.document;

function writeFile(filename, the_string) {

	var path =[@"" stringByAppendingString: filename];
	var str = [@"" stringByAppendingString: the_string];

	str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true)

}

var documentPath = "/" //[[doc fileURL] path].split([doc displayName] + ".sketch")[0];

documentPath = "lalala2.txt"

writeFile(documentPath, "jandler")
