/*
{
        "name": "Mission Prerna Form",
        "transformers": [
            {
                "id": "02f010b8-29ce-41e5-be3c-798536a2818b"
            },
            {
                "id": "18cbe155-c6dc-4d17-b85e-00d0b62439ac",
                "meta": {
                    "form": "https://hosted.my.form.here.com",
                    "formID": "ss_form_mpc"
                }
            }
        ],
        "adapter": "44a9df72-3d7a-4ece-94c5-98cf26307324"
    }
*/

export type CreateTransformerDto = {
    id: string;
}

export interface CreateFormTransformerDto extends CreateTransformerDto {
    id: string;
    meta?: {
        form?: string;
        formID?: string;
    };
}

export interface CreateConversationLogicDto {
    name: string;
    transformers: CreateTransformerDto[];
    adapter: string;

}