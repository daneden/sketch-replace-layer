export default function(context) {
  const selectedLayers = context.selection
  const actionsController = context.document.actionsController()

  const pasteAction = actionsController.actionForID("MSPasteOverSelectionAction")

  if (selectedLayers.length === 0) {
    context.document.showMessage('No layers are selected.')
    return
  }

  pasteAction.pasteOverSelection(null)

  selectedLayers.forEach(layer => layer.removeFromParent())

  context.document.showMessage("Replaced layer")
}
