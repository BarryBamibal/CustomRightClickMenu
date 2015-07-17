﻿Polymer({
	is: 'type-switcher',

	/**
	 * The type of this item
	 * 
	 * @attribute type
	 * @type Number
	 * @default -1
	 */
	type: -1,

	/**
	 * Whether the item is a link
	 * 
	 * @attribute isLink
	 * @type Boolean
	 * @default false
	 */
	isLink: false,

	/**
	 * Whether the item is a script
	 * 
	 * @attribute isScript
	 * @type Boolean
	 * @default false
	 */
	isScript: false,

	/**
	 * Whether the item is a divider
	 * 
	 * @attribute isDivider
	 * @type Boolean
	 * @default false
	 */
	isDivider: false,

	/**
	 * Whether the item is a menu
	 * 
	 * @attribute isMenu
	 * @type Boolean
	 * @default false
	 */
	isMenu: false,

	/**
	 * All types other than this one
	 * 
	 * @attribute remainingTypes
	 * @type Array
	 * @default []
	 */
	remainingTypes: [],

	/**
	 * Whether the choices container is toggled open
	 * 
	 * @attribute toggledOpen
	 * @type Boolean
	 * @default false
	 */
	toggledOpen: false,

	/**
	 * Whether the items are already colored
	 * 
	 * @attribute colored
	 * @type Boolean
	 * @default false
	 */
	colored: false,

	ready: function() {
		this.isLink = (this.type === 'link');
		this.isMenu = (this.type === 'menu');
		this.isScript = (this.type === 'script');
		this.isDivider = (this.type === 'divider');
		this.$.typeTxt.innerHTML = this.type;

		if (this.isLink) {
			this.remainingTypes = ['script', 'divider', 'menu'];
		} else if (this.isScript) {
			this.remainingTypes = ['link', 'divider', 'menu'];
		} else if (this.isMenu) {
			this.remainingTypes = ['link', 'script', 'divider'];
		} else if (this.isDivider) {
			this.remainingTypes = ['link', 'script', 'menu'];
		}
	},

	colorTypeChoices: function() {
		$(this).find('.typeSwitchChoice').each(function() {
			$(this).attr('type', $(this).children()[0].innerHTML);
		});
	},

	closeTypeSwitchContainer: function (quick, callback) {
		var _this = this;
		$(this.parentNode.parentNode).stop().animate({
			height: 50
		}, {
			easing: 'easeInCubic',
			duration: (quick ? 80 : 300),
			complete: function () {
				_this.$.typeSwitchChoicesContainer.style.display = 'none';
				_this.$.typeSwitchArrow.style.transform = 'rotate(180deg)';
				console.log(callback);
				callback && callback();
			}
		});
	},

	openTypeSwitchContainer: function() {
		if (!this.colored) {
			this.colorTypeChoices();
			this.colored = true;
		}
		this.$.typeSwitchChoicesContainer.style.display = 'block';
		this.$.typeSwitchArrow.style.transform = 'rotate(90deg)';
		$(this.parentNode.parentNode).stop().animate({
			height: 200
		}, {
			easing: 'easeOutCubic',
			duration: 300
		});
	},

	toggleTypeSwitch: function() {
		if (this.toggledOpen) {
			this.closeTypeSwitchContainer();
		} else {
			this.openTypeSwitchContainer();
		}
		this.toggledOpen = !this.toggledOpen;
	},

	changeType: function(e) {
		var _this = this;
		var type;
		if (e.path[0].tagName === 'SPAN') {
			type = e.path[0].innerHTML;
		} else {
			type = e.path[0].children[0].innerHTML;
		}
		var editCrmEl = this.parentNode.parentNode.parentNode;
		var item = editCrmEl.item;
		var prevType = item.type;

		var path = item.path;
		var itemInCrm = options.settings.crm;
		var i;
		for (i = 0; i < path.length - 1; i++) {
			itemInCrm = itemInCrm[path[i]].children;
		}
		itemInCrm = itemInCrm[path[i]];
		var itemsToChange = [item, itemInCrm];

		if (prevType === 'menu') {
			item.menuVal = item.children;
			delete item.children;
		} else {
			item[prevType + 'Val'] = item.value;
		}
		item.type = type;
		if (type === 'menu') {
			item.children = [];
		}
		if (item[prevType + 'Val']) {
			item.value = item[prevType + 'Val'];
		} else {
			switch (prevType) {
				case 'link':
					item.value = [
						{
							value: 'http://www.example.com',
							newTab: true
						}
					];
					break;
				case 'script':
					//TODO Update to new script values when done
					item.value = {
						value: ''
					};
					break;
				case 'divider':
					item.value = '';
					break;
				case 'menu':
					item.value = '';
					break;
			}
		}

		//Update color
		editCrmEl.type = item.type;
		editCrmEl.calculateType();
		this.ready();
		var typeChoices = $(this).find('.typeSwitchChoice').toArray();
		for (i = 0; i < this.remainingTypes.length; i++) {
			typeChoices[i].setAttribute('type', this.remainingTypes[i]);
		}

		if (prevType === 'menu') {
			//Turn children into "shadow items"
			var column = this.parentNode.parentNode.parentNode.parentNode;
			var columnCont = column.parentNode;
			var crmLength = columnCont.parentNode.parentNode.crm.length;
			columnCont = $(columnCont).next()[0];

			for (i = column.index + 1; i < crmLength; i++) {
				$(columnCont).find('#itemCont').css('opacity', 0.5).each(function () {
					this.parentNode.shadow = true;
				});
				columnCont = $(columnCont).next()[0];
			}

			options.settings.shadowStart = column.index + 1;

			function reverseMenuTypeChoice() {
				for (i = 0; i < 2; i++) {
					itemsToChange[i].children = itemsToChange[i].menuVal;
					delete itemsToChange[i].menuVal;
					itemsToChange[i].type = prevType;
					itemsToChange[i].value = '';
				}
				editCrmEl.type = prevType;
				editCrmEl.calculateType();
				_this.ready();
				for (i = 0; i < _this.remainingTypes.length; i++) {
					typeChoices[i].setAttribute('type', _this.remainingTypes[i]);
				}

				//Un-shadow items
				column = this.parentNode.parentNode.parentNode.parentNode;
				columnCont = column.parentNode;
				columnCont = $(columnCont).next()[0];

				for (i = column.index + 1; i < crmLength; i++) {
					$(columnCont).find('#itemCont').css('opacity', 1).each(function () {
						this.parentNode.shadow = false;
					});
					columnCont = $(columnCont).next()[0];
				}

				options.settings.shadowStart = null;
			}

			//Show a paper-toast
			var paperToast = $('#paperToast');
			paperToast.on('click', reverseMenuTypeChoice);
			paperToast[0].show();
			setTimeout(function() {
				paperToast.off('click', reverseMenuTypeChoice);
			}, 10000);
		}

		this.closeTypeSwitchContainer(true);
		options.upload();
	}
});