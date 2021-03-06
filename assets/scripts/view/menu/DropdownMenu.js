/* globals $, _ */

var Plumage = require('PlumageRoot');
var ModelView = require('view/ModelView');

var template = require('view/menu/templates/DropdownMenu.html');
require('bootstrap');

module.exports = Plumage.view.menu.DropdownMenu = ModelView.extend({
  template: template,

  className: 'dropdown',

  buttonStyle: false,

  menuItems: [],

  dropdownId: null,

  showCaret: true,

  opens: 'right',

  events: {
    'click li a': 'onItemClick'
  },

  initialize: function(){
    this.dropdownId = _.uniqueId('dropdown');
    ModelView.prototype.initialize.apply(this, arguments);
  },

  onRender: function() {
    ModelView.prototype.onRender.apply(this, arguments);
    this.$('[data-toggle=dropdown]').dropdown();
  },

  getTemplateData: function() {
    return {
      label: this.label,
      iconCls: this.iconCls,
      menuItems: this.getMenuItems(),
      showCaret: this.showCaret,
      buttonStyle: this.buttonStyle,
      dropdownCls: this.opens === 'left' ? 'pull-right' : '',
      dropdownId: this.dropdownId
    };
  },

  setLabel: function(label) {
    this.label = label;
    this.render();
  },

  getMenuItems: function() {
    return this.menuItems;
  },

  /** Methods **/

  open: function() {
    this.$el.addClass('open');
  },

  close: function() {
    this.$el.removeClass('open');
  },

  /** Event Handlers **/

  onItemClick: function(e) {
    this.trigger('itemClick', this, $(e.target).data('value'));
  }
});
