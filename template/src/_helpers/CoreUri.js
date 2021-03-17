
export const coreUri = {
  lifecyclesAdminUri,
  profileAdminUri,
  profileHomeUri,
  mailTemplatesAdminUri,
  businessRulesAdminUri,
  dataLoadersAdminUri,
  batchHistoryAdminUri
}

function batchHistoryAdminUri(childForDetailsId){
  if(!childForDetailsId){
    return '/admin?v=about'
  }

  return '/admin?v=about&rootId=' + childForDetailsId
}

function dataLoadersAdminUri(childForDetailsId){
  if(!childForDetailsId){
    return '/admin?v=dataLoader'
  }

  return '/admin?v=dataLoader&rootId=' + childForDetailsId
}


function businessRulesAdminUri(childForDetailsId){
  if(!childForDetailsId){
    return '/admin?v=businessRules'
  }

  return '/admin?v=businessRules&rootId=' + childForDetailsId
}

function mailTemplatesAdminUri(childForDetailsId){
  if(!childForDetailsId){
    return '/admin?v=emailTemplates'
  }

  return '/admin?v=emailTemplates&rootId=' + childForDetailsId
}

function profileHomeUri(childForDetailsId){
  if(!childForDetailsId){
    return '/home/profile/?rootId=' + childForDetailsId
  }

  return '/home/profile/?rootId=' + childForDetailsId
}

function profileAdminUri(childForDetailsId){
  if(!childForDetailsId){
    return '/admin?v=members'
  }

  return '/admin?v=members&rootId=' + childForDetailsId
}


function lifecyclesAdminUri(childForDetailsId){
  if(!childForDetailsId){
    return '/admin?v=lifecycles'
  }

  return '/admin?v=lifecycles&rootId=' + childForDetailsId
}
