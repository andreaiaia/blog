function createDebug() {
  const debug = () => {}
  debug.enabled = false
  debug.log = () => {}
  debug.extend = () => createDebug()
  return debug
}
createDebug.enable = () => {}
createDebug.disable = () => {}
createDebug.enabled = () => false
createDebug.formatters = {}
export default createDebug
