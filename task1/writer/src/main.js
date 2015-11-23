var fs = require('fs');

var file_path = process.argv[2],
	write_interval,
	write_stream;

var create_write_stream = function(target_file) {
	var writer = fs.createWriteStream(target_file);
	return writer;
}

var generate_random_word = function() {
	return Math.random().toString(36).substring(7)+' ';
}

var start_writing = function(writer) {

	console.log('Begin writing');
	writer.write(new Date().toString().replace(/T/, ' ').replace(/\..+/, '')+'\n', 'utf-8');
	for(var i=0;i < 20; i++)
		writer.write(generate_random_word(), 'utf-8');
	console.log('End writing');
	//terminate_writing();
}

var terminate_writing = function() {
	console.log('Terminating the interval');
	clearInterval(write_interval);
	write_stream.write('finish', 'utf-8', function(err){
		if(err) {
			console.log(err);
			throw err;
		}
		write_stream.end();
	})
	process.exit();
};

process.on('error', function(){terminate_writing();} );
process.on('exit', function(){terminate_writing();} );
process.on('SIGINT', function(){terminate_writing();} );
process.on('uncaughtException', function(err){
  console.error(err);
  terminate_writing();
});

write_stream = create_write_stream(file_path);
start_writing(write_stream);
