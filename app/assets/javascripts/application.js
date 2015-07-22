// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-fileupload
//= require turbolinks
//= require_tree .
	
	$(document).ready(function() {
	    var multiple_photos_form = $('.edit_parent');
	    var wrapper = multiple_photos_form.find('.progress-wrapper');
	    var bitrate = wrapper.find('.bitrate');
	    var progress_bar = wrapper.find('.progress-bar');

	    multiple_photos_form.fileupload({
	      dataType: 'script',
	      dropZone: $('#dropzone'),
	      add: function (e, data) {
	        types = /(\.|\/)(gif|jpe?g|png|mov|mpeg|mpeg4|avi)$/i;
	        file = data.files[0];
	        if (types.test(file.type) || types.test(file.name)) {
	          data.submit();
	        }
	        else { alert(file.name + " is not a image or movie file."); }
	      }
	    });
	    multiple_photos_form.on('fileuploadstart', function() {
	      wrapper.show();
	    });
	    multiple_photos_form.on('fileuploaddone', function() {
	      wrapper.hide();
	      progress_bar.width(0);
	    });

	    multiple_photos_form.on('fileuploadprogressall', function (e, data) {
	      bitrate.text((data.bitrate / 1024).toFixed(2) + 'Kb/s');
	      var progress = parseInt(data.loaded / data.total * 100, 10);
	      progress_bar.css('width', progress + '%').text(progress + '%');
	    });
	    $(document).bind('dragover', function (e) {
	      var dropZone = $('#dropzone'),
	              timeout = window.dropZoneTimeout;
	      if (!timeout) {
	        dropZone.addClass('in');
	      } else {
	        clearTimeout(timeout);
	      }
	      var found = false,
	              node = e.target;
	      do {
	        if (node === dropZone[0]) {
	          found = true;
	          break;
	        }
	        node = node.parentNode;
	      } while (node != null);
	      if (found) {
	        dropZone.addClass('hover');
	      } else {
	        dropZone.removeClass('hover');
	      }
	      window.dropZoneTimeout = setTimeout(function () {
	        window.dropZoneTimeout = null;
	        dropZone.removeClass('in hover');
	      }, 100);
	    });
	});
