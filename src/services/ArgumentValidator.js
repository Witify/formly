import { recursiveArrayToObject } from '../utils/helpers'

/**
 * Argument validation
 * 
 * @param Object args 
 */
export default function(args) {

    if (args === undefined) {
      args = {}
      args.schema = {}
    }
  
    if (args.schema === undefined) {
      args.schema = {}
    }
  
    if (typeof args.schema !== 'object') {
      throw new Error('Invalid argument: schema must be an object in Form constructor');
    }
  
    if (args.data === undefined) {
      args.data = {}
    }
    
    /**
     * Get rid of all arrays
     */
    recursiveArrayToObject(args.data)
  
    return args
}