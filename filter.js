<script>
$(function () {
	$('input#id_search').quicksearch('div.mentorSummaryWrapper', {
		'delay': 400,
		'selector': '.mentorSummary',
		'stripeRows': ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
		'noResults': '.noResultsToShow',
		'bind': 'keyup click',
		'minValLength': 2,
    'prepareQuery': function (val) {
			return new RegExp(val, "i");
		},
		'testQuery': function (query, txt, _row) {
			return query.test(txt);
		},
		'show': function() {
			$(this).removeClass('hideByTextbox');
		},
		'hide': function() {
			$(this).addClass('hideByTextbox');
		}
	});
});

$(function () {
	$('#selectbox').quicksearch('div.mentorSummaryWrapper', {
		'delay': 100,
		'selector': 'span.studentType',
		'bind': 'change',
    'prepareQuery': function (val) {
			return new RegExp(val, "i");
		},
		'testQuery': function (query, txt, _row) {
			return query.test(txt);
		},
		'show': function() {
			$(this).removeClass('hideByDropdown');
		},
		'hide': function() {
			$(this).addClass('hideByDropdown');
		}
	});			
});
</script>


