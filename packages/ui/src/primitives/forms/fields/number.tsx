import { FormControl, FormItem, FormMessage } from "@auto-form";
import { Input } from "@inputs";
import { AutoFormLabel } from "@auto-form";
import { AutoFormTooltip } from "@auto-form";
import type { AutoFormInputComponentProps } from "@auto-form";

export default function AutoFormNumber({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  return (
    <FormItem>
      {showLabel && (
        <AutoFormLabel
          label={fieldConfigItem?.label || label}
          isRequired={isRequired}
        />
      )}
      <FormControl>
        <Input type="number" {...fieldPropsWithoutShowLabel} />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
