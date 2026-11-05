import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Allergen
 *
 */
export type AllergenModel = runtime.Types.Result.DefaultSelection<Prisma.$AllergenPayload>;
export type AggregateAllergen = {
    _count: AllergenCountAggregateOutputType | null;
    _min: AllergenMinAggregateOutputType | null;
    _max: AllergenMaxAggregateOutputType | null;
};
export type AllergenMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
};
export type AllergenMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
};
export type AllergenCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    userId: number;
    _all: number;
};
export type AllergenMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
};
export type AllergenMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
};
export type AllergenCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    _all?: true;
};
export type AllergenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Allergen to aggregate.
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Allergens to fetch.
     */
    orderBy?: Prisma.AllergenOrderByWithRelationInput | Prisma.AllergenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AllergenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Allergens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Allergens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Allergens
    **/
    _count?: true | AllergenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AllergenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AllergenMaxAggregateInputType;
};
export type GetAllergenAggregateType<T extends AllergenAggregateArgs> = {
    [P in keyof T & keyof AggregateAllergen]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAllergen[P]> : Prisma.GetScalarType<T[P], AggregateAllergen[P]>;
};
export type AllergenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AllergenWhereInput;
    orderBy?: Prisma.AllergenOrderByWithAggregationInput | Prisma.AllergenOrderByWithAggregationInput[];
    by: Prisma.AllergenScalarFieldEnum[] | Prisma.AllergenScalarFieldEnum;
    having?: Prisma.AllergenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AllergenCountAggregateInputType | true;
    _min?: AllergenMinAggregateInputType;
    _max?: AllergenMaxAggregateInputType;
};
export type AllergenGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    _count: AllergenCountAggregateOutputType | null;
    _min: AllergenMinAggregateOutputType | null;
    _max: AllergenMaxAggregateOutputType | null;
};
export type GetAllergenGroupByPayload<T extends AllergenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AllergenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AllergenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AllergenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AllergenGroupByOutputType[P]>;
}>>;
export type AllergenWhereInput = {
    AND?: Prisma.AllergenWhereInput | Prisma.AllergenWhereInput[];
    OR?: Prisma.AllergenWhereInput[];
    NOT?: Prisma.AllergenWhereInput | Prisma.AllergenWhereInput[];
    id?: Prisma.StringFilter<"Allergen"> | string;
    createdAt?: Prisma.DateTimeFilter<"Allergen"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Allergen"> | Date | string;
    userId?: Prisma.StringFilter<"Allergen"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    foods?: Prisma.FoodListRelationFilter;
};
export type AllergenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    foods?: Prisma.FoodOrderByRelationAggregateInput;
};
export type AllergenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.AllergenWhereInput | Prisma.AllergenWhereInput[];
    OR?: Prisma.AllergenWhereInput[];
    NOT?: Prisma.AllergenWhereInput | Prisma.AllergenWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Allergen"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Allergen"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    foods?: Prisma.FoodListRelationFilter;
}, "id" | "userId">;
export type AllergenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.AllergenCountOrderByAggregateInput;
    _max?: Prisma.AllergenMaxOrderByAggregateInput;
    _min?: Prisma.AllergenMinOrderByAggregateInput;
};
export type AllergenScalarWhereWithAggregatesInput = {
    AND?: Prisma.AllergenScalarWhereWithAggregatesInput | Prisma.AllergenScalarWhereWithAggregatesInput[];
    OR?: Prisma.AllergenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AllergenScalarWhereWithAggregatesInput | Prisma.AllergenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Allergen"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Allergen"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Allergen"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"Allergen"> | string;
};
export type AllergenCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAllergenInput;
    foods?: Prisma.FoodCreateNestedManyWithoutAllergensInput;
};
export type AllergenUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    foods?: Prisma.FoodUncheckedCreateNestedManyWithoutAllergensInput;
};
export type AllergenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAllergenNestedInput;
    foods?: Prisma.FoodUpdateManyWithoutAllergensNestedInput;
};
export type AllergenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    foods?: Prisma.FoodUncheckedUpdateManyWithoutAllergensNestedInput;
};
export type AllergenCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type AllergenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AllergenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AllergenNullableScalarRelationFilter = {
    is?: Prisma.AllergenWhereInput | null;
    isNot?: Prisma.AllergenWhereInput | null;
};
export type AllergenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type AllergenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type AllergenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type AllergenListRelationFilter = {
    every?: Prisma.AllergenWhereInput;
    some?: Prisma.AllergenWhereInput;
    none?: Prisma.AllergenWhereInput;
};
export type AllergenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AllergenCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutUserInput, Prisma.AllergenUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutUserInput;
    connect?: Prisma.AllergenWhereUniqueInput;
};
export type AllergenUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutUserInput, Prisma.AllergenUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutUserInput;
    connect?: Prisma.AllergenWhereUniqueInput;
};
export type AllergenUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutUserInput, Prisma.AllergenUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutUserInput;
    upsert?: Prisma.AllergenUpsertWithoutUserInput;
    disconnect?: Prisma.AllergenWhereInput | boolean;
    delete?: Prisma.AllergenWhereInput | boolean;
    connect?: Prisma.AllergenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AllergenUpdateToOneWithWhereWithoutUserInput, Prisma.AllergenUpdateWithoutUserInput>, Prisma.AllergenUncheckedUpdateWithoutUserInput>;
};
export type AllergenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutUserInput, Prisma.AllergenUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutUserInput;
    upsert?: Prisma.AllergenUpsertWithoutUserInput;
    disconnect?: Prisma.AllergenWhereInput | boolean;
    delete?: Prisma.AllergenWhereInput | boolean;
    connect?: Prisma.AllergenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AllergenUpdateToOneWithWhereWithoutUserInput, Prisma.AllergenUpdateWithoutUserInput>, Prisma.AllergenUncheckedUpdateWithoutUserInput>;
};
export type AllergenCreateNestedManyWithoutFoodsInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutFoodsInput, Prisma.AllergenUncheckedCreateWithoutFoodsInput> | Prisma.AllergenCreateWithoutFoodsInput[] | Prisma.AllergenUncheckedCreateWithoutFoodsInput[];
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutFoodsInput | Prisma.AllergenCreateOrConnectWithoutFoodsInput[];
    connect?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
};
export type AllergenUncheckedCreateNestedManyWithoutFoodsInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutFoodsInput, Prisma.AllergenUncheckedCreateWithoutFoodsInput> | Prisma.AllergenCreateWithoutFoodsInput[] | Prisma.AllergenUncheckedCreateWithoutFoodsInput[];
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutFoodsInput | Prisma.AllergenCreateOrConnectWithoutFoodsInput[];
    connect?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
};
export type AllergenUpdateManyWithoutFoodsNestedInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutFoodsInput, Prisma.AllergenUncheckedCreateWithoutFoodsInput> | Prisma.AllergenCreateWithoutFoodsInput[] | Prisma.AllergenUncheckedCreateWithoutFoodsInput[];
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutFoodsInput | Prisma.AllergenCreateOrConnectWithoutFoodsInput[];
    upsert?: Prisma.AllergenUpsertWithWhereUniqueWithoutFoodsInput | Prisma.AllergenUpsertWithWhereUniqueWithoutFoodsInput[];
    set?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    disconnect?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    delete?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    connect?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    update?: Prisma.AllergenUpdateWithWhereUniqueWithoutFoodsInput | Prisma.AllergenUpdateWithWhereUniqueWithoutFoodsInput[];
    updateMany?: Prisma.AllergenUpdateManyWithWhereWithoutFoodsInput | Prisma.AllergenUpdateManyWithWhereWithoutFoodsInput[];
    deleteMany?: Prisma.AllergenScalarWhereInput | Prisma.AllergenScalarWhereInput[];
};
export type AllergenUncheckedUpdateManyWithoutFoodsNestedInput = {
    create?: Prisma.XOR<Prisma.AllergenCreateWithoutFoodsInput, Prisma.AllergenUncheckedCreateWithoutFoodsInput> | Prisma.AllergenCreateWithoutFoodsInput[] | Prisma.AllergenUncheckedCreateWithoutFoodsInput[];
    connectOrCreate?: Prisma.AllergenCreateOrConnectWithoutFoodsInput | Prisma.AllergenCreateOrConnectWithoutFoodsInput[];
    upsert?: Prisma.AllergenUpsertWithWhereUniqueWithoutFoodsInput | Prisma.AllergenUpsertWithWhereUniqueWithoutFoodsInput[];
    set?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    disconnect?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    delete?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    connect?: Prisma.AllergenWhereUniqueInput | Prisma.AllergenWhereUniqueInput[];
    update?: Prisma.AllergenUpdateWithWhereUniqueWithoutFoodsInput | Prisma.AllergenUpdateWithWhereUniqueWithoutFoodsInput[];
    updateMany?: Prisma.AllergenUpdateManyWithWhereWithoutFoodsInput | Prisma.AllergenUpdateManyWithWhereWithoutFoodsInput[];
    deleteMany?: Prisma.AllergenScalarWhereInput | Prisma.AllergenScalarWhereInput[];
};
export type AllergenCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    foods?: Prisma.FoodCreateNestedManyWithoutAllergensInput;
};
export type AllergenUncheckedCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    foods?: Prisma.FoodUncheckedCreateNestedManyWithoutAllergensInput;
};
export type AllergenCreateOrConnectWithoutUserInput = {
    where: Prisma.AllergenWhereUniqueInput;
    create: Prisma.XOR<Prisma.AllergenCreateWithoutUserInput, Prisma.AllergenUncheckedCreateWithoutUserInput>;
};
export type AllergenUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.AllergenUpdateWithoutUserInput, Prisma.AllergenUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AllergenCreateWithoutUserInput, Prisma.AllergenUncheckedCreateWithoutUserInput>;
    where?: Prisma.AllergenWhereInput;
};
export type AllergenUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.AllergenWhereInput;
    data: Prisma.XOR<Prisma.AllergenUpdateWithoutUserInput, Prisma.AllergenUncheckedUpdateWithoutUserInput>;
};
export type AllergenUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    foods?: Prisma.FoodUpdateManyWithoutAllergensNestedInput;
};
export type AllergenUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    foods?: Prisma.FoodUncheckedUpdateManyWithoutAllergensNestedInput;
};
export type AllergenCreateWithoutFoodsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAllergenInput;
};
export type AllergenUncheckedCreateWithoutFoodsInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type AllergenCreateOrConnectWithoutFoodsInput = {
    where: Prisma.AllergenWhereUniqueInput;
    create: Prisma.XOR<Prisma.AllergenCreateWithoutFoodsInput, Prisma.AllergenUncheckedCreateWithoutFoodsInput>;
};
export type AllergenUpsertWithWhereUniqueWithoutFoodsInput = {
    where: Prisma.AllergenWhereUniqueInput;
    update: Prisma.XOR<Prisma.AllergenUpdateWithoutFoodsInput, Prisma.AllergenUncheckedUpdateWithoutFoodsInput>;
    create: Prisma.XOR<Prisma.AllergenCreateWithoutFoodsInput, Prisma.AllergenUncheckedCreateWithoutFoodsInput>;
};
export type AllergenUpdateWithWhereUniqueWithoutFoodsInput = {
    where: Prisma.AllergenWhereUniqueInput;
    data: Prisma.XOR<Prisma.AllergenUpdateWithoutFoodsInput, Prisma.AllergenUncheckedUpdateWithoutFoodsInput>;
};
export type AllergenUpdateManyWithWhereWithoutFoodsInput = {
    where: Prisma.AllergenScalarWhereInput;
    data: Prisma.XOR<Prisma.AllergenUpdateManyMutationInput, Prisma.AllergenUncheckedUpdateManyWithoutFoodsInput>;
};
export type AllergenScalarWhereInput = {
    AND?: Prisma.AllergenScalarWhereInput | Prisma.AllergenScalarWhereInput[];
    OR?: Prisma.AllergenScalarWhereInput[];
    NOT?: Prisma.AllergenScalarWhereInput | Prisma.AllergenScalarWhereInput[];
    id?: Prisma.StringFilter<"Allergen"> | string;
    createdAt?: Prisma.DateTimeFilter<"Allergen"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Allergen"> | Date | string;
    userId?: Prisma.StringFilter<"Allergen"> | string;
};
export type AllergenUpdateWithoutFoodsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAllergenNestedInput;
};
export type AllergenUncheckedUpdateWithoutFoodsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AllergenUncheckedUpdateManyWithoutFoodsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type AllergenCountOutputType
 */
export type AllergenCountOutputType = {
    foods: number;
};
export type AllergenCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    foods?: boolean | AllergenCountOutputTypeCountFoodsArgs;
};
/**
 * AllergenCountOutputType without action
 */
export type AllergenCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllergenCountOutputType
     */
    select?: Prisma.AllergenCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AllergenCountOutputType without action
 */
export type AllergenCountOutputTypeCountFoodsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodWhereInput;
};
export type AllergenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    foods?: boolean | Prisma.Allergen$foodsArgs<ExtArgs>;
    _count?: boolean | Prisma.AllergenCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["allergen"]>;
export type AllergenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["allergen"]>;
export type AllergenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["allergen"]>;
export type AllergenSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
};
export type AllergenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["allergen"]>;
export type AllergenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    foods?: boolean | Prisma.Allergen$foodsArgs<ExtArgs>;
    _count?: boolean | Prisma.AllergenCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AllergenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AllergenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AllergenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Allergen";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        foods: Prisma.$FoodPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }, ExtArgs["result"]["allergen"]>;
    composites: {};
};
export type AllergenGetPayload<S extends boolean | null | undefined | AllergenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AllergenPayload, S>;
export type AllergenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AllergenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AllergenCountAggregateInputType | true;
};
export interface AllergenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Allergen'];
        meta: {
            name: 'Allergen';
        };
    };
    /**
     * Find zero or one Allergen that matches the filter.
     * @param {AllergenFindUniqueArgs} args - Arguments to find a Allergen
     * @example
     * // Get one Allergen
     * const allergen = await prisma.allergen.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AllergenFindUniqueArgs>(args: Prisma.SelectSubset<T, AllergenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Allergen that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AllergenFindUniqueOrThrowArgs} args - Arguments to find a Allergen
     * @example
     * // Get one Allergen
     * const allergen = await prisma.allergen.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AllergenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AllergenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Allergen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenFindFirstArgs} args - Arguments to find a Allergen
     * @example
     * // Get one Allergen
     * const allergen = await prisma.allergen.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AllergenFindFirstArgs>(args?: Prisma.SelectSubset<T, AllergenFindFirstArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Allergen that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenFindFirstOrThrowArgs} args - Arguments to find a Allergen
     * @example
     * // Get one Allergen
     * const allergen = await prisma.allergen.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AllergenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AllergenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Allergens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Allergens
     * const allergens = await prisma.allergen.findMany()
     *
     * // Get first 10 Allergens
     * const allergens = await prisma.allergen.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const allergenWithIdOnly = await prisma.allergen.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AllergenFindManyArgs>(args?: Prisma.SelectSubset<T, AllergenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Allergen.
     * @param {AllergenCreateArgs} args - Arguments to create a Allergen.
     * @example
     * // Create one Allergen
     * const Allergen = await prisma.allergen.create({
     *   data: {
     *     // ... data to create a Allergen
     *   }
     * })
     *
     */
    create<T extends AllergenCreateArgs>(args: Prisma.SelectSubset<T, AllergenCreateArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Allergens.
     * @param {AllergenCreateManyArgs} args - Arguments to create many Allergens.
     * @example
     * // Create many Allergens
     * const allergen = await prisma.allergen.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AllergenCreateManyArgs>(args?: Prisma.SelectSubset<T, AllergenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Allergens and returns the data saved in the database.
     * @param {AllergenCreateManyAndReturnArgs} args - Arguments to create many Allergens.
     * @example
     * // Create many Allergens
     * const allergen = await prisma.allergen.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Allergens and only return the `id`
     * const allergenWithIdOnly = await prisma.allergen.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AllergenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AllergenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Allergen.
     * @param {AllergenDeleteArgs} args - Arguments to delete one Allergen.
     * @example
     * // Delete one Allergen
     * const Allergen = await prisma.allergen.delete({
     *   where: {
     *     // ... filter to delete one Allergen
     *   }
     * })
     *
     */
    delete<T extends AllergenDeleteArgs>(args: Prisma.SelectSubset<T, AllergenDeleteArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Allergen.
     * @param {AllergenUpdateArgs} args - Arguments to update one Allergen.
     * @example
     * // Update one Allergen
     * const allergen = await prisma.allergen.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AllergenUpdateArgs>(args: Prisma.SelectSubset<T, AllergenUpdateArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Allergens.
     * @param {AllergenDeleteManyArgs} args - Arguments to filter Allergens to delete.
     * @example
     * // Delete a few Allergens
     * const { count } = await prisma.allergen.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AllergenDeleteManyArgs>(args?: Prisma.SelectSubset<T, AllergenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Allergens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Allergens
     * const allergen = await prisma.allergen.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AllergenUpdateManyArgs>(args: Prisma.SelectSubset<T, AllergenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Allergens and returns the data updated in the database.
     * @param {AllergenUpdateManyAndReturnArgs} args - Arguments to update many Allergens.
     * @example
     * // Update many Allergens
     * const allergen = await prisma.allergen.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Allergens and only return the `id`
     * const allergenWithIdOnly = await prisma.allergen.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AllergenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AllergenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Allergen.
     * @param {AllergenUpsertArgs} args - Arguments to update or create a Allergen.
     * @example
     * // Update or create a Allergen
     * const allergen = await prisma.allergen.upsert({
     *   create: {
     *     // ... data to create a Allergen
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Allergen we want to update
     *   }
     * })
     */
    upsert<T extends AllergenUpsertArgs>(args: Prisma.SelectSubset<T, AllergenUpsertArgs<ExtArgs>>): Prisma.Prisma__AllergenClient<runtime.Types.Result.GetResult<Prisma.$AllergenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Allergens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenCountArgs} args - Arguments to filter Allergens to count.
     * @example
     * // Count the number of Allergens
     * const count = await prisma.allergen.count({
     *   where: {
     *     // ... the filter for the Allergens we want to count
     *   }
     * })
    **/
    count<T extends AllergenCountArgs>(args?: Prisma.Subset<T, AllergenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AllergenCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Allergen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AllergenAggregateArgs>(args: Prisma.Subset<T, AllergenAggregateArgs>): Prisma.PrismaPromise<GetAllergenAggregateType<T>>;
    /**
     * Group by Allergen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllergenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends AllergenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AllergenGroupByArgs['orderBy'];
    } : {
        orderBy?: AllergenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AllergenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllergenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Allergen model
     */
    readonly fields: AllergenFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Allergen.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AllergenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    foods<T extends Prisma.Allergen$foodsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Allergen$foodsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Allergen model
 */
export interface AllergenFieldRefs {
    readonly id: Prisma.FieldRef<"Allergen", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Allergen", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Allergen", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Allergen", 'String'>;
}
/**
 * Allergen findUnique
 */
export type AllergenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * Filter, which Allergen to fetch.
     */
    where: Prisma.AllergenWhereUniqueInput;
};
/**
 * Allergen findUniqueOrThrow
 */
export type AllergenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * Filter, which Allergen to fetch.
     */
    where: Prisma.AllergenWhereUniqueInput;
};
/**
 * Allergen findFirst
 */
export type AllergenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * Filter, which Allergen to fetch.
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Allergens to fetch.
     */
    orderBy?: Prisma.AllergenOrderByWithRelationInput | Prisma.AllergenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Allergens.
     */
    cursor?: Prisma.AllergenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Allergens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Allergens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Allergens.
     */
    distinct?: Prisma.AllergenScalarFieldEnum | Prisma.AllergenScalarFieldEnum[];
};
/**
 * Allergen findFirstOrThrow
 */
export type AllergenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * Filter, which Allergen to fetch.
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Allergens to fetch.
     */
    orderBy?: Prisma.AllergenOrderByWithRelationInput | Prisma.AllergenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Allergens.
     */
    cursor?: Prisma.AllergenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Allergens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Allergens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Allergens.
     */
    distinct?: Prisma.AllergenScalarFieldEnum | Prisma.AllergenScalarFieldEnum[];
};
/**
 * Allergen findMany
 */
export type AllergenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * Filter, which Allergens to fetch.
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Allergens to fetch.
     */
    orderBy?: Prisma.AllergenOrderByWithRelationInput | Prisma.AllergenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Allergens.
     */
    cursor?: Prisma.AllergenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Allergens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Allergens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Allergens.
     */
    distinct?: Prisma.AllergenScalarFieldEnum | Prisma.AllergenScalarFieldEnum[];
};
/**
 * Allergen create
 */
export type AllergenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * The data needed to create a Allergen.
     */
    data: Prisma.XOR<Prisma.AllergenCreateInput, Prisma.AllergenUncheckedCreateInput>;
};
/**
 * Allergen createMany
 */
export type AllergenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Allergens.
     */
    data: Prisma.AllergenCreateManyInput | Prisma.AllergenCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Allergen createManyAndReturn
 */
export type AllergenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * The data used to create many Allergens.
     */
    data: Prisma.AllergenCreateManyInput | Prisma.AllergenCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Allergen update
 */
export type AllergenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * The data needed to update a Allergen.
     */
    data: Prisma.XOR<Prisma.AllergenUpdateInput, Prisma.AllergenUncheckedUpdateInput>;
    /**
     * Choose, which Allergen to update.
     */
    where: Prisma.AllergenWhereUniqueInput;
};
/**
 * Allergen updateMany
 */
export type AllergenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Allergens.
     */
    data: Prisma.XOR<Prisma.AllergenUpdateManyMutationInput, Prisma.AllergenUncheckedUpdateManyInput>;
    /**
     * Filter which Allergens to update
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * Limit how many Allergens to update.
     */
    limit?: number;
};
/**
 * Allergen updateManyAndReturn
 */
export type AllergenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * The data used to update Allergens.
     */
    data: Prisma.XOR<Prisma.AllergenUpdateManyMutationInput, Prisma.AllergenUncheckedUpdateManyInput>;
    /**
     * Filter which Allergens to update
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * Limit how many Allergens to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Allergen upsert
 */
export type AllergenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * The filter to search for the Allergen to update in case it exists.
     */
    where: Prisma.AllergenWhereUniqueInput;
    /**
     * In case the Allergen found by the `where` argument doesn't exist, create a new Allergen with this data.
     */
    create: Prisma.XOR<Prisma.AllergenCreateInput, Prisma.AllergenUncheckedCreateInput>;
    /**
     * In case the Allergen was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AllergenUpdateInput, Prisma.AllergenUncheckedUpdateInput>;
};
/**
 * Allergen delete
 */
export type AllergenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
    /**
     * Filter which Allergen to delete.
     */
    where: Prisma.AllergenWhereUniqueInput;
};
/**
 * Allergen deleteMany
 */
export type AllergenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Allergens to delete
     */
    where?: Prisma.AllergenWhereInput;
    /**
     * Limit how many Allergens to delete.
     */
    limit?: number;
};
/**
 * Allergen.foods
 */
export type Allergen$foodsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: Prisma.FoodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Food
     */
    omit?: Prisma.FoodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodInclude<ExtArgs> | null;
    where?: Prisma.FoodWhereInput;
    orderBy?: Prisma.FoodOrderByWithRelationInput | Prisma.FoodOrderByWithRelationInput[];
    cursor?: Prisma.FoodWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodScalarFieldEnum | Prisma.FoodScalarFieldEnum[];
};
/**
 * Allergen without action
 */
export type AllergenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergen
     */
    select?: Prisma.AllergenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergen
     */
    omit?: Prisma.AllergenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergenInclude<ExtArgs> | null;
};
//# sourceMappingURL=Allergen.d.ts.map