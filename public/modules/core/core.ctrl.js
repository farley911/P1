(function() {
	'use strict'

	angular
		.module('P1.core')
		.controller('Core', Core);

	Core.$inject = ['coreFactory'];

	function Core(coreFactory) {
		// Properties
		var core = this;
		core.factory = coreFactory;

		// Methods
		core.closeModal = coreFactory.closeModal;
		core.openModal = coreFactory.openModal;
	}
})();