var template = require('../../templates/conversation.tpl');
var Marionette = require('backbone.marionette');
var MessageView = require('./messageView');

module.exports = Marionette.CompositeView.extend({
    id: 'sk-conversation',

    childView: MessageView,
    template: template,

    childViewContainer: '[data-ui-messages]',

    ui: {
        logo: '.sk-logo',
        intro: '.sk-intro',
        messages: '[data-ui-messages]'
    },

    scrollToBottom: function(forceBottom) {
        forceBottom ? this.$el.scrollTop(this.$el.get(0).scrollHeight) :
            this.$el.scrollTop(this.$el.get(0).scrollHeight - this.$el.outerHeight() - this.ui.logo.outerHeight());
    },

    onAddChild: function() {
        this.scrollToBottom();
        this.positionLogo();
    },

    onShow: function() {
        this.scrollToBottom();
    },

    serializeData: function() {
        return {
            introText: this.getOption('introText')
        };
    },

    keyboardToggled: function(isKeyboardShown) {
        if (isKeyboardShown) {
            this.ui.logo.hide();
            this.scrollToBottom(true);
        } else {
            this.ui.logo.show();
            this.scrollToBottom();
        }
    },

    positionLogo: function() {
        var conversationHeight = this.$el.outerHeight();
        var logoHeight = this.ui.logo.outerHeight();
        var introHeight = this.ui.intro.outerHeight();
        var messagesHeight = this.ui.messages.outerHeight();
        var heightRemaining = conversationHeight - (introHeight + messagesHeight + logoHeight);

        if (heightRemaining > logoHeight) {
            this.ui.logo.addClass('anchor-bottom');
        } else {
            this.ui.logo.removeClass('anchor-bottom');
        }
    }
});
