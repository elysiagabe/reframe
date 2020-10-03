export interface GetLabelList_labels {
    __typename: "Label";
    id: string;
    name: string;
    def: string;
    example: string;
}

export interface GetLabelList {
    labels: [GetLabelList_labels];
}