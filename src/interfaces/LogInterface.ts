import { StaticDetails_LogLevel } from "../Utils/StaticDetails"


export default interface LogInterface {
  md_uuid?: string
  md_date?: string
  id?: number
  log?: string
  level?: StaticDetails_LogLevel
}