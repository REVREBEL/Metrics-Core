"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopover,
  ComboboxSeparator,
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

// ⚡ Bolt: Hoisted static operators dictionary outside of render cycle
// Prevents recreating object references and nested array allocations on every render pass.
const DEFAULT_OPERATORS: Record<string, string[]> = {
  text: ["contains", "equals", "not equals"],
  number: ["equals", "not equals", "greater than", "less than"],
  date: ["equals", "not equals", "after", "before"],
  select: ["equals", "not equals"],
  boolean: ["equals"],
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
  const mergedI18n = React.useMemo(
    () => ({ ...i18n, ...customI18n }),
    [customI18n],
  );
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

  // ⚡ Bolt: Pre-calculate a flat map of fields by value in O(M) time.
  // Replaces O(N * M) repeated .flatMap().find() traversals per render pass with O(1) map lookups
  // and eliminates zero-allocation intermediate arrays for getFieldLabel and openFilter.
  const fieldMap = React.useMemo(() => {
    const map = new Map<string, FilterField>();
    for (const item of fields) {
      if (isFieldGroup(item)) {
        for (const f of item.fields) {
          if (f.type !== "separator") {
            map.set(f.value, f);
          }
        }
      } else if (item.type !== "separator") {
        map.set(item.value, item);
      }
    }
    return map;
  }, [fields]);

  // ⚡ Bolt: Memoize selected fields set for O(1) membership checks in child items instead of O(N) array scans
  const selectedFieldsSet = React.useMemo(
    () => new Set(value.map((v) => v.field)),
    [value],
  );

  const onFieldSelect = React.useCallback((field: FilterField) => {
    setSelectedField(field);
    setSelectedOperator(null);
    setFilterValue("");
  }, []);

  const onOperatorSelect = React.useCallback((operator: string) => {
    setSelectedOperator(operator);
  }, []);

  const onValueChange = React.useCallback((val: string) => {
    setFilterValue(val);
  }, []);

  const onApplyFilter = React.useCallback(() => {
    if (selectedField && selectedOperator && "value" in selectedField) {
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
      setOpen(false);
      setActiveFilterIndex(null);
      setSelectedField(null);
      setSelectedOperator(null);
      setFilterValue("");
    }
  }, [
    selectedField,
    selectedOperator,
    filterValue,
    activeFilterIndex,
    value,
    onChange,
  ]);

  const onRemoveFilter = React.useCallback(
    (index: number) => {
      const newFilters = [...value];
      newFilters.splice(index, 1);
      onChange(newFilters);
    },
    [value, onChange],
  );

  const openFilter = React.useCallback(
    (index?: number) => {
      if (typeof index === "number") {
        const filter = value[index];
        const field = filter ? (fieldMap.get(filter.field) ?? null) : null;
        setActiveFilterIndex(index);
        setSelectedField(field);
        setSelectedOperator(filter?.operator ?? null);
        setFilterValue(filter?.value ?? "");
      } else {
        setActiveFilterIndex(null);
        setSelectedField(null);
        setSelectedOperator(null);
        setFilterValue("");
      }
      setOpen(true);
    },
    [value, fieldMap],
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {value.map((filter, index) => {
        const fieldObj = fieldMap.get(filter.field);
        const fieldLabel =
          fieldObj && "label" in fieldObj ? fieldObj.label : filter.field;
        return (
          <div
            key={`${filter.field}-${filter.operator}-${filter.value}`}
            className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm"
          >
            <span className="font-medium">{fieldLabel}</span>
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
        );
      })}
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
                    <ComboboxEmpty>{mergedI18n.noFieldsFound}</ComboboxEmpty>
                    {fields.map((item, groupIdx) => {
                      if (isFieldGroup(item)) {
                        const groupFields = item.fields;
                        return (
                          <ComboboxGroup
                            key={`group-${item.group}`}
                            heading={item.group || "Fields"}
                          >
                            {groupFields.map((field, fieldIndex) => {
                              if (field.type === "separator") {
                                return (
                                  <ComboboxSeparator
                                    // biome-ignore lint/suspicious/noArrayIndexKey: Separator items lack unique identifiers
                                    key={`separator-${item.group}-${fieldIndex}`}
                                  />
                                );
                              }
                              return (
                                <FilterFieldItem
                                  key={field.value}
                                  field={field}
                                  isSelected={selectedFieldsSet.has(
                                    field.value,
                                  )}
                                  onFieldSelect={onFieldSelect}
                                />
                              );
                            })}
                          </ComboboxGroup>
                        );
                      }
                      if (item.type === "separator") {
                        return (
                          <ComboboxSeparator
                            // biome-ignore lint/suspicious/noArrayIndexKey: Separator items lack unique identifiers
                            key={`separator-main-${groupIdx}`}
                          />
                        );
                      }
                      return (
                        <FilterFieldItem
                          key={item.value}
                          field={item}
                          isSelected={selectedFieldsSet.has(item.value)}
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
                      {selectedField.type !== "separator" &&
                        DEFAULT_OPERATORS[selectedField.type]?.map((op) => (
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

// ⚡ Bolt: Memoized sub-component using O(1) boolean isSelected state to avoid re-evaluating array contains on re-renders
const FilterFieldItem = React.memo(function FilterFieldItem({
  field,
  isSelected,
  onFieldSelect,
}: {
  field: FilterField & {
    type: "text" | "date" | "number" | "select" | "boolean";
  };
  isSelected: boolean;
  onFieldSelect: (field: FilterField) => void;
}) {
  return (
    <ComboboxItem onSelect={() => onFieldSelect(field)} disabled={isSelected}>
      <CheckIcon
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {field.label}
    </ComboboxItem>
  );
});

export const FiltersContent = Filters;
