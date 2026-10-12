import * as runtime from "@prisma/client/runtime/library";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "6.19.3",
    engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"
};
export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
export const DbNull = runtime.objectEnumValues.instances.DbNull;
export const JsonNull = runtime.objectEnumValues.instances.JsonNull;
export const AnyNull = runtime.objectEnumValues.instances.AnyNull;
export const ModelName = {
    Note: 'Note',
    Task: 'Task',
    Reminder: 'Reminder'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const NoteScalarFieldEnum = {
    id: 'id',
    title: 'title',
    content: 'content',
    pinned: 'pinned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TaskScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    completed: 'completed',
    priority: 'priority',
    dueAt: 'dueAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ReminderScalarFieldEnum = {
    id: 'id',
    title: 'title',
    message: 'message',
    remindAt: 'remindAt',
    isSent: 'isSent',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map