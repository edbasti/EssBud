Periods = new Meteor.Collection('periods');
Assets = new Meteor.Collection('assets');
Expenses = new Meteor.Collection('expenses');
AssetData = {};
ExpenseData = {};

  if (Meteor.isClient)
  {
    
    Template.addAssetForm.helpers({
      periods: function() {
        return Periods.find({}, {sort: {createdAt: -1}});
      }
    });
    Template.addExpenseForm.helpers({
      periods: function() {
        return Periods.find({}, {sort: {createdAt: -1}});
      }
    });
    Template.addAssetForm.events({
      'submit form': function(event){
        event.preventDefault();
        var periodIdVar = parseInt(event.target.periodCode.value);  
        var assetCodeVar = event.target.assetCode.value;
        var assetAmountVar = event.target.assetAmount.value;
        
        Assets.insert({
          period_id : periodIdVar,
          asset_code: assetCodeVar,
          asset_amount: assetAmountVar,
          createdAt: new Date()
        });
        $('[name="assetAmount"]').val('');
        $('[name="assetCode"]').val('');
      }
    });
    Template.addExpenseForm.events({
      'submit form': function(event){
        event.preventDefault();
        var periodIdVar = parseInt(event.target.periodCode.value);
        var expenseCodeVar = event.target.expenseCode.value;
        var expenseAmountVar = event.target.expenseAmount.value;
        
        Expenses.insert({
          period_id : periodIdVar,
          expense_code : expenseCodeVar,
          expense_amount : expenseAmountVar,
          createdAt: new Date()
        });
        $('[name="expenseAmount"]').val('');
        $('[name="expenseCode"]').val('');
      }
    });
    Template.findPeriodForm.helpers({
      periods: function() {
        return Periods.find();
      }
    });
    
    Template.findPeriodForm.events({
    'change #periodList': function(evt) {
        $("#assetTbl tr, #expenseTbl tr").remove();
        
        var totalAssets = 0;
        var totalExpenses = 0;
        var intSavings = 0;
        var theid = $(evt.target).val();
        Session.set('theid', theid);
      }
    });
    
    Template.assetForm.helpers({
      assetArr: function() {
        theId = parseInt(Session.get('theid'));
        var assets = Assets.find({
            period_id : theId
          }, {sort: {createdAt: -1}}).fetch();
        return assets;
      }
    });
    
    Template.assetForm.events({
      'click .deleteAsset': function() {
        var documentId = this._id;
        Assets.remove({ _id: documentId });
      },
      'keyup [name=assetItem]': function(event){
        var documentId = this._id;
        var assetItem = $(event.target).val();
        Assets.update({ _id: documentId }, {$set: { name: assetItem }});
        console.log("Task changed to: " + documentId + ', ' + assetItem);
      }
    });

    Template.expenseForm.helpers({
      expenseArr: function() {
        theId = parseInt(Session.get('theid'));
        var expenses = Expenses.find({
            period_id : theId
          }).fetch();
        return expenses;

      }
    });

    Template.expenseForm.events({
      'click .deleteExpense': function() {
        var documentId = this._id;
        Expenses.remove({ _id: documentId });
      },
      'keyup [name=expenseItem]': function(event){
        var documentId = this._id;
        var expenseItem = $(event.target).val();
        Expenses.update({ _id: documentId }, {$set: { name: expenseItem }});
        console.log("Task changed to: " + documentId + ', ' + expenseItem);
      }      
    });

    Template.Navigation.events({
      'click #Overview': function() {
        $(".Overview").show();
        $(".findPeriod, .addExpense, .addAsset").hide();
      },
      'click #Home': function() {
        $(".findPeriod").show();
        $(".Overview, .addExpense, .addAsset").hide();
      },
      'click #Asset': function() {
          $(".addAsset").show();
          $(".Overview, .addExpense, .findPeriod").hide();
      },
      'click #Expense': function() {
          $(".addExpense").show();
          $(".Overview, .findPeriod, .addAsset").hide();
      }
    });
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if ( !Periods.find().count() )
    {
      Periods.insert({period_id: 1, period_code:"January 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 2, period_code:"January 16 - 31", createdAt: new Date()});
      Periods.insert({period_id: 3, period_code:"February 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 4, period_code:"February 16 - 28", createdAt: new Date()});
      Periods.insert({period_id: 5, period_code:"March 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 6, period_code:"March 16 - 31", createdAt: new Date()});
      Periods.insert({period_id: 7, period_code:"April 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 8, period_code:"April 16 - 30", createdAt: new Date()});
      Periods.insert({period_id: 9, period_code:"May 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 10, period_code:"May 16 - 31", createdAt: new Date()});
      Periods.insert({period_id: 11, period_code:"June 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 12, period_code:"June 16 - 30", createdAt: new Date()});
      Periods.insert({period_id: 13, period_code:"July 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 14, period_code:"July 16 - 31", createdAt: new Date()});
      Periods.insert({period_id: 15, period_code:"August 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 16, period_code:"August 16 - 31", createdAt: new Date()});
      Periods.insert({period_id: 17, period_code:"September 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 18, period_code:"September 16 - 30", createdAt: new Date()});
      Periods.insert({period_id: 19, period_code:"October 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 20, period_code:"October 16 - 31", createdAt: new Date()});
      Periods.insert({period_id: 21, period_code:"November 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 22, period_code:"November 16 - 30", createdAt: new Date()});
      Periods.insert({period_id: 23, period_code:"December 1 - 15", createdAt: new Date()});
      Periods.insert({period_id: 24, period_code:"December 16 - 31", createdAt: new Date()});
    }
  });
}


      