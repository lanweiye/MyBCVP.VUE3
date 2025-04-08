declare namespace User {
  export interface UserResponse {
    uLoginName: string
    uLoginPWD: string
    uRealName: string
    uStatus: number
    DepartmentId: string
    uRemark: string | null
    uCreateTime: string
    uUpdateTime: string
    uLastErrTime: string
    uErrorCount: number
    name: string
    sex: number
    age: number
    birth: string
    addr: string | null
    tdIsDelete: boolean
    RoleNames: string[]
    Dids: string[]
    DepartmentName: string | null
    uID: string
    RIDs: string[]
  }
}
