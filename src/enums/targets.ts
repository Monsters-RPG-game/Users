export enum EUserTargets {
  Register = 'register',
  Login = 'login',
  GetName = 'getName',
  DebugGetAll = 'debugGetAll',
  LoginTry = 'loginTry',
}

export enum EItemsTargets {
  Get = 'get',
  Use = 'use',
  Drop = 'drop',
}

export enum EPartyTargets {
  Create = 'Create',
  Get = 'get',
}

export enum ESkillsTargets {
  GetSkills = 'getSkills',
  AddSkills = 'addSkills',
}

export enum ESingleSkillTargets {
  GetSingleSkill = 'getSkill',
  AddSingleSkill = 'addSingleSkill',
  AddToProfile = 'addToProfile',
}

export enum ESharedTargets {
  RemoveUser = 'removeUser',
}

export enum EProfileTargets {
  Create = 'createProfile',
  Get = 'getProfile',
  AddExp = 'addExp',
}

export enum ELogTargets {
  AddLog = 'addLog',
  GetLog = 'getLog',
}

export enum ECharacterStateTargets {
  ChangeState = 'changeState',
}

export enum EBugReportTargets {
  AddBugReport = 'addBugReport',
  GetBugReport = 'getBugReport',
}

export enum EStatsTargets {
  GetStats = 'getStats',
}

export enum ENpcTargets {
  GetNpc = 'getNpc',
  AddNpc = 'addNpc',
  RemoveNpc = 'removeNpc',
  UpdateNpc = 'updateNpc',
}
