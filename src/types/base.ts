

export const LOG_TRANSACTION = { logging : process.env.NODE_ENV === 'development' ? (sql : any)=>console.log(sql) : undefined }