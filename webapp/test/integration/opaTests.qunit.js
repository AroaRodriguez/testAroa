/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["testaroa/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
