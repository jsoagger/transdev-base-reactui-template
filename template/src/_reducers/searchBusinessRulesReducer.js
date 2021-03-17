import * as types from '_actions/actionTypes.js';
import produce from "immer"

const inialState = {
	
}
/**
 * Reducers for business rules searching
 */
export const searchBusinessRulesReducer = (state = inialState, action) => {
	  switch(action.type) {
	    case types.BUSINESS_RULES_SEARCHCRITERIAS_UPDATE:
	    	const nextState = produce(state, search => {
	    		search.businessType = action.payload.businessType
	    		search.businessClass = action.payload.businessClass
	    		search.vetoable = action.payload.vetoable
	    		search.eventKey = action.payload.eventKey
	    		search.phase = action.payload.phase
	    		search.rules = action.payload.rules
	    		search.includeParentRules = action.payload.includeParentRules
			})
	    	return nextState
	    default:
	    	return state
	  }
}