import { TemplateItemField, TemplateResponseItem } from "@/types";
import { isENodeResponseItemType } from "@/utils/is-enode-response-item-type";
import { ENodeType } from "@/types/enums";
import { templateLabels } from "@/consts";

export class Template {
  type?: ENodeType;
  label?: string;
  description?: string;
  fields?: TemplateItemField[];

  constructor(id: string, data: TemplateResponseItem) {
    if (isENodeResponseItemType(id)) {
      this.type = id;
      this.label = templateLabels[id];
      this.fields = data.fields;
      this.description = data.description;
    }
  }
}
