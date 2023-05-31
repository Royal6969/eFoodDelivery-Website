import { StaticDetails_LogLevel } from "../Utils/StaticDetails"


const getLogLevelColor = (logLevel: StaticDetails_LogLevel) => {
  return logLevel === StaticDetails_LogLevel.LOG_LEVEL_INFO   ? 'primary'
       : logLevel === StaticDetails_LogLevel.LOG_LEVEL_WARN   ? 'warning'
       : logLevel === StaticDetails_LogLevel.LOG_LEVEL_ERROR  ? 'danger'
       : logLevel === StaticDetails_LogLevel.LOG_LEVEL_FATAL && 'danger'
}


export default getLogLevelColor