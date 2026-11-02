"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { CommandEmpty, CommandGroup, CommandSeparator } from "cmdk";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopover,
  ComboboxTrigger,
} from "./combobox";

export type FilterField =
  | {
      label: string;
      value: string;
      type: "text" | "date" | "number" | "select" | "boolean";
      options?: { label: string; value: string }[];
    }
  | { type: "separator" };

export interface FilterFieldGroup {
  group: string;
  fields: FilterField[];
}

export type Filter = {
  field: string;
  operator: string;
  value: string;
};

const i18n = {
  selectField: "Select a field",
  selectOperator: "Select an operator",
  enterValue: "Enter a value",
  applyFilter: "Apply",
  addFilter: "Add filter",
  removeFilter: "Remove filter",
  noFieldsFound: "No fields found",
};

function isFieldGroup(
  item: FilterField | FilterFieldGroup,
): item is FilterFieldGroup {
  return (item as FilterFieldGroup).fields !== undefined;
}

export function Filters({
  fields,
  value,
  onChange,
  i18n: customI18n,
}: {
  fields: (FilterField | FilterFieldGroup)[];
  value: Filter[];
  onChange: (value: Filter[]) => void;
  i18n?: Partial<typeof i18n>;
}) {
  const mergedI18n = { ...i18n, ...customI18n };
  const [open, setOpen] = React.useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = React.useState<
    number | null
  >(null);
  const [selectedField, setSelectedField] = React.useState<FilterField | null>(
    null,
  );
  const [selectedOperator, setSelectedOperator] = React.useState<string | null>(
    null,
  );
  const [filterValue, setFilterValue] = React.useState<string>("");

  const operators: Record<string, string[]> = {
    text: ["contains", "equals", "not equals"],
    number: ["equals", "not equals", "greater than", "less than"],
    date: ["equals", "not equals", "after", "before"],
    select: ["equals", "not equals"],
    boolean: ["equals"],
  };

  // ⚡ Bolt: Pre-calculate a lookup Map for filter fields using useMemo.
  // Replaces repeated O(N) .flatMap(...) array allocations and array searches
  // in openFilter and getFieldLabel.
  const fieldMap = React.useMemo(() => {
    const map = new Map<string, FilterField>();
    for (let i = 0; i < fields.length; i++) {
      const item = fields[i];
      if (isFieldGroup(item)) {
        for (let j = 0; j < item.fields.length; j++) {
          const field = item.fields[j];
          if (field.type !== "separator") {
            map.set(field.value, field);
          }
        }
      } else if (item.type !== "separator") {
        map.set(item.value, item);
      }
    }
    return map;
  }, [fields]);

  // ⚡ Bolt: Convert selected field array to a Set to optimize disabled checks in child items from O(M) to O(1).
  const selectedFieldsSet = React.useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < value.length; i++) {
      set.add(value[i].field);
    }
    return set;
  }, [value]);

  const onFieldSelect = (field: FilterField) => {
    setSelectedField(field);
    setSelectedOperator(null);
    setFilterValue("");
  };

  const onOperatorSelect = (operator: string) => {
    setSelectedOperator(operator);
  };

  const onValueChange = (val: string) => {
    setFilterValue(val);
  };

  const onApplyFilter = () => {
    if (selectedField && selectedOperator) {
      const newFilter: Filter = {
        field: selectedField.value,
        operator: selectedOperator,
        value: filterValue,
      };

      let newFilters: Filter[];
      if (activeFilterIndex !== null) {
        newFilters = [...value];
        newFilters[activeFilterIndex] = newFilter;
      } else {
        newFilters = [...value, newFilter];
      }
      onChange(newFilters);
      resetState();
    }
  };

  const onRemoveFilter = (index: number) => {
    const newFilters = [...value];
    newFilters.splice(index, 1);
    onChange(newFilters);
  };

  const resetState = () => {
    setOpen(false);
    setActiveFilterIndex(null);
    setSelectedField(null);
    setSelectedOperator(null);
    setFilterValue("");
  };

  const openFilter = (index?: number) => {
    if (typeof index === "number") {
      const filter = value[index];
      const field = fieldMap.get(filter.field) ?? null;
      setActiveFilterIndex(index);
      setSelectedField(field);
      setSelectedOperator(filter.operator);
      setFilterValue(filter.value);
    } else {
      setActiveFilterIndex(null);
      setSelectedField(null);
      setSelectedOperator(null);
      setFilterValue("");
    }
    setOpen(true);
  };

  const getFieldLabel = (fieldValue: string) => {
    const field = fieldMap.get(fieldValue);
    return field?.label || fieldValue;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {value.map((filter, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: Filter list indices can be duplicated if user adds multiple filters on the same field
          key={`${filter.field}-${index}`}
          className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm"
        >
          <span className="font-medium">{getFieldLabel(filter.field)}</span>
          <span className="text-gray-500">{filter.operator}</span>
          <span className="font-semibold">{filter.value}</span>
          <button
            type="button"
            onClick={() => openFilter(index)}
            className="text-gray-500 hover:text-gray-800"
          >
            &#9998;
          </button>
          <button
            type="button"
            onClick={() => onRemoveFilter(index)}
            className="text-red-500 hover:text-red-800"
          >
            &times;
          </button>
        </div>
      ))}
      <Combobox open={open} onOpenChange={setOpen}>
        <ComboboxTrigger asChild>
          <button
            type="button"
            onClick={() => openFilter()}
            className="text-sm text-blue-500 hover:text-blue-800"
          >
            {mergedI18n.addFilter}
          </button>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxPopover>
            <ComboboxList>
              <Combobox>
                <ComboboxInput placeholder={mergedI18n.selectField} />
                <ComboboxContent>
                  <ComboboxList>
                    <CommandEmpty>{mergedI18n.noFieldsFound}</CommandEmpty>
                    {fields.map((item, index) => {
                      if (isFieldGroup(item)) {
                        const groupFields = item.fields;
                        return (
                          <CommandGroup
                            key={
                              item.group
                                ? `group-${item.group}`
                                : `group-no-title-${index}`
                            }
                            heading={item.group || "Fields"}
                          >
                            {groupFields.map((field, fieldIndex) => {
                              if (field.type === "separator") {
                                return (
                                  <CommandSeparator
                                    // biome-ignore lint/suspicious/noArrayIndexKey: Structural separators inside group
                                    key={`separator-${item.group}-${fieldIndex}`}
                                  />
                                );
                              }
                              return (
                                <FilterFieldItem
                                  key={field.value}
                                  field={field}
                                  selectedFieldsSet={selectedFieldsSet}
                                  onFieldSelect={onFieldSelect}
                                />
                              );
                            })}
                          </CommandGroup>
                        );
                      }
                      if (item.type === "separator") {
                        return (
                          <CommandSeparator
                            // biome-ignore lint/suspicious/noArrayIndexKey: Structural separators
                            key={`separator-main-${index}`}
                          />
                        );
                      }
                      return (
                        <FilterFieldItem
                          key={item.value}
                          field={item}
                          selectedFieldsSet={selectedFieldsSet}
                          onFieldSelect={onFieldSelect}
                        />
                      );
                    })}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>

              {selectedField && (
                <Combobox>
                  <ComboboxInput placeholder={mergedI18n.selectOperator} />
                  <ComboboxContent>
                    <ComboboxList>
                      {operators[selectedField.type].map((op) => (
                        <ComboboxItem
                          key={op}
                          onSelect={() => onOperatorSelect(op)}
                        >
                          {op}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}

              {selectedOperator && selectedField && (
                <div>
                  {selectedField.type === "select" ? (
                    <Combobox>
                      <ComboboxInput placeholder={mergedI18n.enterValue} />
                      <ComboboxContent>
                        <ComboboxList>
                          {selectedField.options?.map((option) => (
                            <ComboboxItem
                              key={option.value}
                              onSelect={() => onValueChange(option.value)}
                            >
                              {option.label}
                            </ComboboxItem>
                          ))}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  ) : selectedField.type === "boolean" ? (
                    <Combobox>
                      <ComboboxInput placeholder={mergedI18n.enterValue} />
                      <ComboboxContent>
                        <ComboboxList>
                          <ComboboxItem onSelect={() => onValueChange("true")}>
                            True
                          </ComboboxItem>
                          <ComboboxItem onSelect={() => onValueChange("false")}>
                            False
                          </ComboboxItem>
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  ) : (
                    <input
                      type={selectedField.type}
                      value={filterValue}
                      onChange={(e) => onValueChange(e.target.value)}
                      placeholder={mergedI18n.enterValue}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  )}
                </div>
              )}
            </ComboboxList>
            <div className="p-2">
              <button
                type="button"
                onClick={onApplyFilter}
                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                {mergedI18n.applyFilter}
              </button>
            </div>
          </ComboboxPopover>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

function FilterFieldItem({
  field,
  selectedFieldsSet,
  onFieldSelect,
}: {
  field: FilterField & {
    type: "text" | "date" | "number" | "select" | "boolean";
  };
  selectedFieldsSet: Set<string>;
  onFieldSelect: (field: FilterField) => void;
}) {
  const isSelected = selectedFieldsSet.has(field.value);
  return (
    <ComboboxItem onSelect={() => onFieldSelect(field)} disabled={isSelected}>
      <CheckIcon
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {field.label}
    </ComboboxItem>
  );
}
