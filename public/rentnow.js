// (function($){
//     function floatLabel(inputType){
// 		$(inputType).each(function(){
// 			var $this = $(this);
// 			// on focus add cladd active to label
// 			$this.focus(function(){
// 				$this.next().addClass("active");
// 			});
// 			//on blur check field and remove class if needed
// 			$this.blur(function(){
// 				if($this.val() === '' || $this.val() === 'blank'){
// 					$this.next().removeClass();
// 				}
// 			});
// 		});
// 	}
// 	// just add a class of "floatLabel to the input field!"
// 	floatLabel(".floatLabel");
// })(jQuery);

(function($) {
	function floatLabel(inputType) {
	  $(inputType).each(function() {
		var $this = $(this);
		// on focus add cladd active to label
		$this.focus(function() {
		  $this.next().addClass("active");
		});
		//on blur check field and remove class if needed
		$this.blur(function() {
		  if ($this.val() === '' || $this.val() === 'blank') {
			$this.next().removeClass();
		  }
		});
	  });
	}
	// just add a class of "floatLabel to the input field!"
	floatLabel(".floatLabel");
  })(jQuery);
  
  // Radio Button
  
  function showTextBox() {
	document.getElementById("regno").style.display = "block";
  }
  
  function hideTextBox() {
	document.getElementById("regno").style.display = "none";
  }
  
  // Aadhar
  $(function() {
  
	$('#aadhar').keydown(function(e) {
	  var key = e.charCode || e.keyCode || 0;
	  $text = $(this);
	  if (key !== 8 && key !== 9) {
		if ($text.val().length === 4) {
		  $text.val($text.val() + ' ');
		}
		if ($text.val().length === 9) {
		  $text.val($text.val() + ' ');
		}
		if ($text.val().length === 14) {
		  $text.val($text.val() + ' ');
		}
  
	  }
  
	})
  });