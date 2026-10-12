import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NoteModel = runtime.Types.Result.DefaultSelection<Prisma.$NotePayload>;
export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null;
    _min: NoteMinAggregateOutputType | null;
    _max: NoteMaxAggregateOutputType | null;
};
export type NoteMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    content: string | null;
    pinned: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NoteMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    content: string | null;
    pinned: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NoteCountAggregateOutputType = {
    id: number;
    title: number;
    content: number;
    pinned: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NoteMinAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    pinned?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NoteMaxAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    pinned?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NoteCountAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    pinned?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput | Prisma.NoteOrderByWithRelationInput[];
    cursor?: Prisma.NoteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NoteCountAggregateInputType;
    _min?: NoteMinAggregateInputType;
    _max?: NoteMaxAggregateInputType;
};
export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
    [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNote[P]> : Prisma.GetScalarType<T[P], AggregateNote[P]>;
};
export type NoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithAggregationInput | Prisma.NoteOrderByWithAggregationInput[];
    by: Prisma.NoteScalarFieldEnum[] | Prisma.NoteScalarFieldEnum;
    having?: Prisma.NoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NoteCountAggregateInputType | true;
    _min?: NoteMinAggregateInputType;
    _max?: NoteMaxAggregateInputType;
};
export type NoteGroupByOutputType = {
    id: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: NoteCountAggregateOutputType | null;
    _min: NoteMinAggregateOutputType | null;
    _max: NoteMaxAggregateOutputType | null;
};
type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NoteGroupByOutputType[P]>;
}>>;
export type NoteWhereInput = {
    AND?: Prisma.NoteWhereInput | Prisma.NoteWhereInput[];
    OR?: Prisma.NoteWhereInput[];
    NOT?: Prisma.NoteWhereInput | Prisma.NoteWhereInput[];
    id?: Prisma.StringFilter<"Note"> | string;
    title?: Prisma.StringFilter<"Note"> | string;
    content?: Prisma.StringFilter<"Note"> | string;
    pinned?: Prisma.BoolFilter<"Note"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Note"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Note"> | Date | string;
};
export type NoteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    pinned?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NoteWhereInput | Prisma.NoteWhereInput[];
    OR?: Prisma.NoteWhereInput[];
    NOT?: Prisma.NoteWhereInput | Prisma.NoteWhereInput[];
    title?: Prisma.StringFilter<"Note"> | string;
    content?: Prisma.StringFilter<"Note"> | string;
    pinned?: Prisma.BoolFilter<"Note"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Note"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Note"> | Date | string;
}, "id">;
export type NoteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    pinned?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NoteCountOrderByAggregateInput;
    _max?: Prisma.NoteMaxOrderByAggregateInput;
    _min?: Prisma.NoteMinOrderByAggregateInput;
};
export type NoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.NoteScalarWhereWithAggregatesInput | Prisma.NoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.NoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NoteScalarWhereWithAggregatesInput | Prisma.NoteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Note"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Note"> | string;
    content?: Prisma.StringWithAggregatesFilter<"Note"> | string;
    pinned?: Prisma.BoolWithAggregatesFilter<"Note"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Note"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Note"> | Date | string;
};
export type NoteCreateInput = {
    id?: string;
    title: string;
    content?: string;
    pinned?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteUncheckedCreateInput = {
    id?: string;
    title: string;
    content?: string;
    pinned?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    pinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    pinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteCreateManyInput = {
    id?: string;
    title: string;
    content?: string;
    pinned?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    pinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    pinned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    pinned?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    pinned?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    pinned?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    pinned?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["note"]>;
export type NoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    pinned?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["note"]>;
export type NoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    pinned?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["note"]>;
export type NoteSelectScalar = {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    pinned?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "content" | "pinned" | "createdAt" | "updatedAt", ExtArgs["result"]["note"]>;
export type $NotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Note";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        content: string;
        pinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["note"]>;
    composites: {};
};
export type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotePayload, S>;
export type NoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NoteCountAggregateInputType | true;
};
export interface NoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Note'];
        meta: {
            name: 'Note';
        };
    };
    findUnique<T extends NoteFindUniqueArgs>(args: Prisma.SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NoteFindFirstArgs>(args?: Prisma.SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NoteFindManyArgs>(args?: Prisma.SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NoteCreateArgs>(args: Prisma.SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NoteCreateManyArgs>(args?: Prisma.SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NoteDeleteArgs>(args: Prisma.SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NoteUpdateArgs>(args: Prisma.SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NoteUpdateManyArgs>(args: Prisma.SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NoteUpsertArgs>(args: Prisma.SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NoteCountArgs>(args?: Prisma.Subset<T, NoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NoteCountAggregateOutputType> : number>;
    aggregate<T extends NoteAggregateArgs>(args: Prisma.Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>;
    groupBy<T extends NoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NoteGroupByArgs['orderBy'];
    } : {
        orderBy?: NoteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NoteFieldRefs;
}
export interface Prisma__NoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NoteFieldRefs {
    readonly id: Prisma.FieldRef<"Note", 'String'>;
    readonly title: Prisma.FieldRef<"Note", 'String'>;
    readonly content: Prisma.FieldRef<"Note", 'String'>;
    readonly pinned: Prisma.FieldRef<"Note", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Note", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Note", 'DateTime'>;
}
export type NoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where: Prisma.NoteWhereUniqueInput;
};
export type NoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where: Prisma.NoteWhereUniqueInput;
};
export type NoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput | Prisma.NoteOrderByWithRelationInput[];
    cursor?: Prisma.NoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NoteScalarFieldEnum | Prisma.NoteScalarFieldEnum[];
};
export type NoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput | Prisma.NoteOrderByWithRelationInput[];
    cursor?: Prisma.NoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NoteScalarFieldEnum | Prisma.NoteScalarFieldEnum[];
};
export type NoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput | Prisma.NoteOrderByWithRelationInput[];
    cursor?: Prisma.NoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NoteScalarFieldEnum | Prisma.NoteScalarFieldEnum[];
};
export type NoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NoteCreateInput, Prisma.NoteUncheckedCreateInput>;
};
export type NoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NoteCreateManyInput | Prisma.NoteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    data: Prisma.NoteCreateManyInput | Prisma.NoteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NoteUpdateInput, Prisma.NoteUncheckedUpdateInput>;
    where: Prisma.NoteWhereUniqueInput;
};
export type NoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NoteUpdateManyMutationInput, Prisma.NoteUncheckedUpdateManyInput>;
    where?: Prisma.NoteWhereInput;
    limit?: number;
};
export type NoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NoteUpdateManyMutationInput, Prisma.NoteUncheckedUpdateManyInput>;
    where?: Prisma.NoteWhereInput;
    limit?: number;
};
export type NoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where: Prisma.NoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.NoteCreateInput, Prisma.NoteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NoteUpdateInput, Prisma.NoteUncheckedUpdateInput>;
};
export type NoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
    where: Prisma.NoteWhereUniqueInput;
};
export type NoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NoteWhereInput;
    limit?: number;
};
export type NoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NoteSelect<ExtArgs> | null;
    omit?: Prisma.NoteOmit<ExtArgs> | null;
};
export {};
