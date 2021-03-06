// Copyright (c) 2019, IT-Geräte und IT-Lösungen wie Server, Rechner, Netzwerke und E-Mailserver sowie auch Backups, and contributors
// For license information, please see license.txt

frappe.ui.form.on('Socket', {
	refresh: function(frm) {

	},
	onload: function(frm) {
		frm.set_query("endpoint_socket", function() {  
			if (frm.doc.endpoint_room) {   
				return {
					'filters': {
						"location_room" : frm.doc.endpoint_room, 
					}
				};
			}
		});
	},
	connect_socket: function(frm) {
		if( frm.doc.endpoint_socket != "" ) {
			var msg = frappe.msgprint({
				title: __('Notification'),
				message: __('This will replace the currently connected Endpoint Socket. Are you sure?'),
				primary_action:{
					'label': 'Proceed',
					action(values) {
						msg.hide();
						var d = new frappe.ui.Dialog({
							title: __('Enter details'),
							fields: [
								{
									label: __('Identifier'),
									fieldname: 'identifier',
									options: "",
									fieldtype: 'Data'
								},
								{
									label: __('Location Room'),
									fieldname: 'location_room',
									options: "Location Room",
									fieldtype: 'Link'
								}
							],
							primary_action_label: 'Connect',
							primary_action(values) {
								d.hide();
								frappe.db.insert({
									doctype: 'Socket',
									identifier: values.identifier,
									location_room: values.location_room,
									note: frm.doc.note,
									endpoint_socket: frm.doc.name
								}).then(doc => {
									// Add newly created Endpoint Socket to endpoint_socket field
									frm.set_value('endpoint_socket', doc.name);
									frm.refresh_fields();
									frm.save();
								})
							}
						});
						d.show();
					}
				}
			});
		}
	}

	// Filter
	// Filter auf Feld in Doctype setzen (... nein?)
	// set_query() wie bei normalen Feldern auf dialog.set_query... anwenden
});
