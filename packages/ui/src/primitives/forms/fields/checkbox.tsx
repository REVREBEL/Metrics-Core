import { Checkbox } from "@ui";
import { FormControl, FormItem } from "@auto-form";
import { AutoFormTooltip } from "@auto-form";
import type { AutoFormInputComponentProps } from "@auto-form";
import { AutoFormLabel } from "@auto-form";

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div>
      <FormItem>
        <div className="mb-3 flex items-center gap-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <AutoFormLabel
            label={fieldConfigItem?.label || label}
            isRequired={isRequired}
          />
        </div>
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </div>
  );
}
