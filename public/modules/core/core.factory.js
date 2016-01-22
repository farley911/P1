(function () {
	'use strict';

	angular
		.module('P1.coreFactory', [])
		.factory('coreFactory', coreFactory);

	coreFactory.$inject = ['$uibModal'];

	function coreFactory ($uibModal) {
		var core = {
			//Properties
			modal: null,

			// Methods
			closeModal: closeModal,
			openModal: openModal
		};

		return core;

		function closeModal () {
			core.modal.close();
		}

		function openModal (template, controller, controllerAs) {
			core.modal = $uibModal.open({
				controller: controller,
				controllerAs: controllerAs,
				templateUrl: template,
			});
		}
	}
})();