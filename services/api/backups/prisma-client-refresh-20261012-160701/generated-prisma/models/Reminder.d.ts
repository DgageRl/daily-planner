import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReminderModel = runtime.Types.Result.DefaultSelection<Prisma.$ReminderPayload>;
export type AggregateReminder = {
    _count: ReminderCountAggregateOutputType | null;
    _min: ReminderMinAggregateOutputType | null;
    _max: ReminderMaxAggregateOutputType | null;
};
export type ReminderMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    message: string | null;
    remindAt: Date | null;
    isSent: boolean | null;
    createdAt: Date | null;
};
export type ReminderMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    message: string | null;
    remindAt: Date | null;
    isSent: boolean | null;
    createdAt: Date | null;
};
export type ReminderCountAggregateOutputType = {
    id: number;
    title: number;
    message: number;
    remindAt: number;
    isSent: number;
    createdAt: number;
    _all: number;
};
export type ReminderMinAggregateInputType = {
    id?: true;
    title?: true;
    message?: true;
    remindAt?: true;
    isSent?: true;
    createdAt?: true;
};
export type ReminderMaxAggregateInputType = {
    id?: true;
    title?: true;
    message?: true;
    remindAt?: true;
    isSent?: true;
    createdAt?: true;
};
export type ReminderCountAggregateInputType = {
    id?: true;
    title?: true;
    message?: true;
    remindAt?: true;
    isSent?: true;
    createdAt?: true;
    _all?: true;
};
export type ReminderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderWhereInput;
    orderBy?: Prisma.ReminderOrderByWithRelationInput | Prisma.ReminderOrderByWithRelationInput[];
    cursor?: Prisma.ReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReminderCountAggregateInputType;
    _min?: ReminderMinAggregateInputType;
    _max?: ReminderMaxAggregateInputType;
};
export type GetReminderAggregateType<T extends ReminderAggregateArgs> = {
    [P in keyof T & keyof AggregateReminder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReminder[P]> : Prisma.GetScalarType<T[P], AggregateReminder[P]>;
};
export type ReminderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderWhereInput;
    orderBy?: Prisma.ReminderOrderByWithAggregationInput | Prisma.ReminderOrderByWithAggregationInput[];
    by: Prisma.ReminderScalarFieldEnum[] | Prisma.ReminderScalarFieldEnum;
    having?: Prisma.ReminderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReminderCountAggregateInputType | true;
    _min?: ReminderMinAggregateInputType;
    _max?: ReminderMaxAggregateInputType;
};
export type ReminderGroupByOutputType = {
    id: string;
    title: string;
    message: string;
    remindAt: Date;
    isSent: boolean;
    createdAt: Date;
    _count: ReminderCountAggregateOutputType | null;
    _min: ReminderMinAggregateOutputType | null;
    _max: ReminderMaxAggregateOutputType | null;
};
type GetReminderGroupByPayload<T extends ReminderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReminderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReminderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReminderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReminderGroupByOutputType[P]>;
}>>;
export type ReminderWhereInput = {
    AND?: Prisma.ReminderWhereInput | Prisma.ReminderWhereInput[];
    OR?: Prisma.ReminderWhereInput[];
    NOT?: Prisma.ReminderWhereInput | Prisma.ReminderWhereInput[];
    id?: Prisma.StringFilter<"Reminder"> | string;
    title?: Prisma.StringFilter<"Reminder"> | string;
    message?: Prisma.StringFilter<"Reminder"> | string;
    remindAt?: Prisma.DateTimeFilter<"Reminder"> | Date | string;
    isSent?: Prisma.BoolFilter<"Reminder"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Reminder"> | Date | string;
};
export type ReminderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    isSent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReminderWhereInput | Prisma.ReminderWhereInput[];
    OR?: Prisma.ReminderWhereInput[];
    NOT?: Prisma.ReminderWhereInput | Prisma.ReminderWhereInput[];
    title?: Prisma.StringFilter<"Reminder"> | string;
    message?: Prisma.StringFilter<"Reminder"> | string;
    remindAt?: Prisma.DateTimeFilter<"Reminder"> | Date | string;
    isSent?: Prisma.BoolFilter<"Reminder"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Reminder"> | Date | string;
}, "id">;
export type ReminderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    isSent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReminderCountOrderByAggregateInput;
    _max?: Prisma.ReminderMaxOrderByAggregateInput;
    _min?: Prisma.ReminderMinOrderByAggregateInput;
};
export type ReminderScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReminderScalarWhereWithAggregatesInput | Prisma.ReminderScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReminderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReminderScalarWhereWithAggregatesInput | Prisma.ReminderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Reminder"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Reminder"> | string;
    message?: Prisma.StringWithAggregatesFilter<"Reminder"> | string;
    remindAt?: Prisma.DateTimeWithAggregatesFilter<"Reminder"> | Date | string;
    isSent?: Prisma.BoolWithAggregatesFilter<"Reminder"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Reminder"> | Date | string;
};
export type ReminderCreateInput = {
    id?: string;
    title: string;
    message?: string;
    remindAt: Date | string;
    isSent?: boolean;
    createdAt?: Date | string;
};
export type ReminderUncheckedCreateInput = {
    id?: string;
    title: string;
    message?: string;
    remindAt: Date | string;
    isSent?: boolean;
    createdAt?: Date | string;
};
export type ReminderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isSent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isSent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderCreateManyInput = {
    id?: string;
    title: string;
    message?: string;
    remindAt: Date | string;
    isSent?: boolean;
    createdAt?: Date | string;
};
export type ReminderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isSent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isSent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReminderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    isSent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReminderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    isSent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReminderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    isSent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReminderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    message?: boolean;
    remindAt?: boolean;
    isSent?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["reminder"]>;
export type ReminderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    message?: boolean;
    remindAt?: boolean;
    isSent?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["reminder"]>;
export type ReminderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    message?: boolean;
    remindAt?: boolean;
    isSent?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["reminder"]>;
export type ReminderSelectScalar = {
    id?: boolean;
    title?: boolean;
    message?: boolean;
    remindAt?: boolean;
    isSent?: boolean;
    createdAt?: boolean;
};
export type ReminderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "message" | "remindAt" | "isSent" | "createdAt", ExtArgs["result"]["reminder"]>;
export type $ReminderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Reminder";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        message: string;
        remindAt: Date;
        isSent: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["reminder"]>;
    composites: {};
};
export type ReminderGetPayload<S extends boolean | null | undefined | ReminderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReminderPayload, S>;
export type ReminderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReminderCountAggregateInputType | true;
};
export interface ReminderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Reminder'];
        meta: {
            name: 'Reminder';
        };
    };
    findUnique<T extends ReminderFindUniqueArgs>(args: Prisma.SelectSubset<T, ReminderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReminderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReminderFindFirstArgs>(args?: Prisma.SelectSubset<T, ReminderFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReminderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReminderFindManyArgs>(args?: Prisma.SelectSubset<T, ReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReminderCreateArgs>(args: Prisma.SelectSubset<T, ReminderCreateArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReminderCreateManyArgs>(args?: Prisma.SelectSubset<T, ReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReminderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReminderDeleteArgs>(args: Prisma.SelectSubset<T, ReminderDeleteArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReminderUpdateArgs>(args: Prisma.SelectSubset<T, ReminderUpdateArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReminderDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReminderUpdateManyArgs>(args: Prisma.SelectSubset<T, ReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReminderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReminderUpsertArgs>(args: Prisma.SelectSubset<T, ReminderUpsertArgs<ExtArgs>>): Prisma.Prisma__ReminderClient<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReminderCountArgs>(args?: Prisma.Subset<T, ReminderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReminderCountAggregateOutputType> : number>;
    aggregate<T extends ReminderAggregateArgs>(args: Prisma.Subset<T, ReminderAggregateArgs>): Prisma.PrismaPromise<GetReminderAggregateType<T>>;
    groupBy<T extends ReminderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReminderGroupByArgs['orderBy'];
    } : {
        orderBy?: ReminderGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReminderFieldRefs;
}
export interface Prisma__ReminderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReminderFieldRefs {
    readonly id: Prisma.FieldRef<"Reminder", 'String'>;
    readonly title: Prisma.FieldRef<"Reminder", 'String'>;
    readonly message: Prisma.FieldRef<"Reminder", 'String'>;
    readonly remindAt: Prisma.FieldRef<"Reminder", 'DateTime'>;
    readonly isSent: Prisma.FieldRef<"Reminder", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Reminder", 'DateTime'>;
}
export type ReminderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where: Prisma.ReminderWhereUniqueInput;
};
export type ReminderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where: Prisma.ReminderWhereUniqueInput;
};
export type ReminderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where?: Prisma.ReminderWhereInput;
    orderBy?: Prisma.ReminderOrderByWithRelationInput | Prisma.ReminderOrderByWithRelationInput[];
    cursor?: Prisma.ReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderScalarFieldEnum | Prisma.ReminderScalarFieldEnum[];
};
export type ReminderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where?: Prisma.ReminderWhereInput;
    orderBy?: Prisma.ReminderOrderByWithRelationInput | Prisma.ReminderOrderByWithRelationInput[];
    cursor?: Prisma.ReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderScalarFieldEnum | Prisma.ReminderScalarFieldEnum[];
};
export type ReminderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where?: Prisma.ReminderWhereInput;
    orderBy?: Prisma.ReminderOrderByWithRelationInput | Prisma.ReminderOrderByWithRelationInput[];
    cursor?: Prisma.ReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderScalarFieldEnum | Prisma.ReminderScalarFieldEnum[];
};
export type ReminderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReminderCreateInput, Prisma.ReminderUncheckedCreateInput>;
};
export type ReminderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReminderCreateManyInput | Prisma.ReminderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReminderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    data: Prisma.ReminderCreateManyInput | Prisma.ReminderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReminderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReminderUpdateInput, Prisma.ReminderUncheckedUpdateInput>;
    where: Prisma.ReminderWhereUniqueInput;
};
export type ReminderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReminderUpdateManyMutationInput, Prisma.ReminderUncheckedUpdateManyInput>;
    where?: Prisma.ReminderWhereInput;
    limit?: number;
};
export type ReminderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReminderUpdateManyMutationInput, Prisma.ReminderUncheckedUpdateManyInput>;
    where?: Prisma.ReminderWhereInput;
    limit?: number;
};
export type ReminderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where: Prisma.ReminderWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReminderCreateInput, Prisma.ReminderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReminderUpdateInput, Prisma.ReminderUncheckedUpdateInput>;
};
export type ReminderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    where: Prisma.ReminderWhereUniqueInput;
};
export type ReminderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderWhereInput;
    limit?: number;
};
export type ReminderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
};
export {};
