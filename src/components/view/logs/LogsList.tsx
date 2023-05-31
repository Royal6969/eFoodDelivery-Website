import React from 'react'
import { LogInterface, LogsListInterface } from '../../../interfaces';
import { BigLoader } from '../common';
import { getLogLevelColor } from '../../../helperMethods';


function LogsList({ data, isLoading }: LogsListInterface) {
  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <div className="table p-4">
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-1">Nivel</div>
              <div className="col-2">Fecha</div>
              <div className="col-8">Registro</div>
            </div>
            
            {data.map(
              (log: LogInterface) => {
                // calling our getOrderStatusColor helper method to change dynamically the status for the order status column
                const logLevelTagTypeColor = getLogLevelColor(log.level!);
                // Format the date using the toLocaleString method
                const formattedDate = new Date(log.md_date!).toLocaleString();

                return (
                  <div className="row border" key={log.id}>
                    <div className="col-1">{log.id}</div>
                    <div className="col-1">
                      <span className={`badge bg-${logLevelTagTypeColor}`}>{log.level}</span>
                    </div>
                    {/* <div className="col-3">{log.md_date}</div> */}
                    <div className="col-2">{formattedDate}</div>
                    <div className="col-8 text-break">{log.log}</div>
                  </div>
                )
              }
            )}

          </div>
        </div>
      )}
    </>
  )
}


export default LogsList