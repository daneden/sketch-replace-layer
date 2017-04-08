var replaceSelectedLayerWithPasteboard = function(context) {
  var doc = context.document
  var actionsController = doc.actionsController()

  var deleteAction = actionsController.actionForID("MSDeleteAction")
  var pasteAction = actionsController.actionForID("MSPasteOverSelectionAction")

  var currentSelection = context.selection
  var skipDeletion = false

  if(!currentSelection.length) {
      currentSelection = [ currentSelection ]
      skipDeletion = true
  }

  if(pasteAction.validate()) {
      pasteAction.doPerformAction(null)
      doc.currentPage().deselectAllLayers()

      if(skipDeletion) {
          doc.showMessage("Nothing selected; pasting layer")
      } else {
          for(var i = 0; i < currentSelection.length; i++) {
              currentSelection[i].setIsSelected(true)
              deleteAction.doPerformAction(null)
          }
          doc.showMessage("Replaced layer")
      }
  }
}
